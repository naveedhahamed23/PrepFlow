import { useState, useEffect, useRef } from "react";
import { X, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

import AIInterviewer from "./AIInterviewer";
import ConversationTranscript from "./ConversationTranscript";
import VoiceControls from "./VoiceControls";
import InterviewTimer from "./InterviewTimer";
import EndInterviewModal from "./EndInterviewModal";
import InterviewResults from "./InterviewResults";

import aiInterviewService from "../../services/aiInterviewService";
import voiceService from "../../services/voiceService";
import interviewEvaluationService from "../../services/interviewEvaluationService";

export default function InterviewRoom({ config, onExit }) {
  // Session State
  const [sessionState, setSessionState] = useState(null);
  
  // AI State: "idle" | "speaking" | "listening" | "thinking" | "processing"
  const [aiState, setAiState] = useState("idle");
  const [currentAiMessage, setCurrentAiMessage] = useState("");
  
  // Transcript / Speech State
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voiceError, setVoiceError] = useState(null);
  
  // UI State
  const [showEndModal, setShowEndModal] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  
  // Init Session
  useEffect(() => {
    const initSession = async () => {
      const state = aiInterviewService.initializeSession(config);
      setSessionState(state);
      
      // Give UI a moment to render before greeting
      setTimeout(() => {
        const greeting = aiInterviewService.getGreeting(config);
        triggerAIResponse(greeting, state);
      }, 1000);
    };
    initSession();
    
    // Cleanup on unmount
    return () => {
      voiceService.cancelAll();
    };
  }, [config]);

  // Main flow to trigger AI speech and handle state transitions
  const triggerAIResponse = (text, currentSession, isEnd = false) => {
    setCurrentAiMessage(text);
    setAiState("speaking");
    
    // Add AI message to conversation history
    setSessionState(prev => ({
      ...prev,
      conversation: [...prev.conversation, { role: "ai", text, timestamp: Date.now() }]
    }));

    voiceService.speak(
      text,
      () => setAiState("speaking"),
      async () => {
        if (isEnd) {
          setAiState("idle");
          // Evaluate interview
          setSessionState(prev => ({ ...prev, status: "completed" }));
          const results = await interviewEvaluationService.evaluateInterview(currentSession);
          setEvaluation(results);
        } else {
          // Switch to listening automatically after speaking
          startListening();
        }
      },
      (err) => {
        console.error("Speech synthesis failed", err);
        setVoiceError("Audio playback failed. Please check volume.");
        setAiState("idle");
      }
    );
  };

  const startListening = () => {
    setInterimTranscript("");
    setVoiceError(null);
    setAiState("listening");
    
    voiceService.startListening(
      (interim) => setInterimTranscript(interim),
      (finalText) => handleUserResponse(finalText),
      (err) => {
        if (err.error === 'not-allowed') {
          setVoiceError("Microphone permission denied.");
          setAiState("idle");
        }
      },
      () => {
        // Only reset if we haven't already transitioned to thinking
        setAiState(prev => prev === "listening" ? "idle" : prev);
      }
    );
  };

  const handleUserResponse = async (text) => {
    if (!text || text.trim() === "") return;
    
    // Stop listening
    voiceService.stopListening();
    setAiState("thinking");
    setInterimTranscript("");

    // Add user message to conversation history
    const updatedSession = {
      ...sessionState,
      conversation: [...sessionState.conversation, { role: "user", text, timestamp: Date.now() }]
    };
    setSessionState(updatedSession);

    // Get AI response
    try {
      const response = await aiInterviewService.processResponse(updatedSession, text);
      
      // Update session state behind the scenes (e.g. current question index)
      if (response.stateUpdate) {
        setSessionState(prev => ({ ...prev, ...response.stateUpdate }));
      }
      
      triggerAIResponse(response.text, updatedSession, response.isEnd);
      
    } catch (err) {
      console.error(err);
      setVoiceError("Failed to reach AI. Please try again.");
      setAiState("idle");
    }
  };

  const handleRepeatQuestion = () => {
    if (aiState === "listening" || aiState === "thinking" || aiState === "processing") return;
    // Find last AI message
    const msgs = sessionState.conversation;
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === "ai") {
        voiceService.stopListening();
        triggerAIResponse(msgs[i].text, sessionState);
        break;
      }
    }
  };

  const handleTimerExpire = async () => {
    voiceService.cancelAll();
    const endingMessage = "Time is up! That concludes our interview. I'll prepare your feedback now.";
    triggerAIResponse(endingMessage, sessionState, true);
  };

  const handleManualEnd = () => {
    setShowEndModal(true);
  };

  const confirmEnd = async () => {
    setShowEndModal(false);
    voiceService.cancelAll();
    setAiState("thinking");
    
    const results = await interviewEvaluationService.evaluateInterview(sessionState);
    setSessionState(prev => ({ ...prev, status: "completed" }));
    setEvaluation(results);
  };

  if (!sessionState) return <div className="fixed inset-0 bg-bg z-[100]" />;

  // Render Results if completed
  if (sessionState.status === "completed") {
    return (
      <div className="fixed inset-0 bg-bg z-[100] overflow-y-auto px-4 md:px-8 custom-scrollbar">
        <InterviewResults 
          session={sessionState} 
          evaluation={evaluation} 
          onFinish={onExit}
        />
      </div>
    );
  }

  // Calculate remaining questions
  const remaining = sessionState.questions.length - sessionState.currentQuestionIndex;
  
  // Render active interview room
  return (
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col overflow-hidden animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-bg-border/50 bg-bg/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-glow">
            <Mic size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-text font-bold leading-tight">Mock Interview</h2>
            <p className="text-xs text-text-muted capitalize">
              {config.type} • {config.topic} • {config.difficulty}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block text-sm font-medium text-text-muted">
            Question {sessionState.currentQuestionIndex + 1} of {sessionState.questions.length}
          </div>
          
          <div className="w-px h-6 bg-bg-border hidden md:block" />
          
          <InterviewTimer durationMinutes={config.duration} onExpire={handleTimerExpire} />
          
          <Button variant="danger" size="sm" onClick={handleManualEnd} className="ml-2">
            End
          </Button>
        </div>
      </div>

      {/* Main Avatar Area */}
      <div className="flex-1 flex flex-col justify-center bg-gradient-to-b from-bg to-bg/50 relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        
        <AIInterviewer state={aiState} message={currentAiMessage} />
      </div>

      {/* Transcript Log Area */}
      <ConversationTranscript conversation={sessionState.conversation} />

      {/* Bottom Voice Controls */}
      <VoiceControls 
        aiState={aiState}
        interimTranscript={interimTranscript}
        error={voiceError}
        onStartListening={startListening}
        onStopListening={() => voiceService.stopListening()}
        onRepeatQuestion={handleRepeatQuestion}
      />

      <EndInterviewModal
        open={showEndModal}
        onClose={() => setShowEndModal(false)}
        onConfirm={confirmEnd}
        remainingQuestions={remaining}
      />
    </div>
  );
}
