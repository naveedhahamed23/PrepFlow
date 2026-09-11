// ============================================================
// voiceService.js — Web Speech API prototype wrapper
// ============================================================
// IMPORTANT PROTOTYPE WARNING:
// This uses the browser's built-in SpeechRecognition and
// SpeechSynthesis APIs to simulate voice interaction without
// requiring an expensive backend.
//
// In production, this file is the EXACT BOUNDARY where you
// swap these browser APIs out for:
// 1. A WebSocket / WebRTC connection to Spring Boot
// 2. Real-time audio streaming
// ============================================================

const voiceService = {
  recognition: null,
  isListening: false,
  isSpeaking: false,

  init: () => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported in this browser. Voice input will not work.");
      return false;
    }

    if (!window.speechSynthesis) {
      console.warn("SpeechSynthesis API not supported. Voice output will not work.");
      return false;
    }

    if (!voiceService.recognition) {
      voiceService.recognition = new SpeechRecognition();
      voiceService.recognition.continuous = true;
      voiceService.recognition.interimResults = true;
      voiceService.recognition.lang = "en-US";
    }

    return true;
  },

  startListening: (onInterim, onFinal, onError, onEnd) => {
    if (!voiceService.init()) {
      if (onError) onError(new Error("Speech recognition not supported"));
      return;
    }

    if (voiceService.isListening) return;

    try {
      voiceService.recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript && onFinal) onFinal(finalTranscript);
        if (interimTranscript && onInterim) onInterim(interimTranscript);
      };

      voiceService.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        voiceService.isListening = false;
        if (onError) onError(event);
      };

      voiceService.recognition.onend = () => {
        voiceService.isListening = false;
        if (onEnd) onEnd();
      };

      voiceService.recognition.start();
      voiceService.isListening = true;
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      voiceService.isListening = false;
      if (onError) onError(error);
    }
  },

  stopListening: () => {
    if (voiceService.recognition && voiceService.isListening) {
      voiceService.recognition.stop();
      voiceService.isListening = false;
    }
  },

  speak: (text, onStart, onEnd, onError) => {
    if (!window.speechSynthesis) {
      if (onError) onError(new Error("Speech synthesis not supported"));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a good English voice (preferably a natural sounding one)
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    // Try to prefer Google or Microsoft natural voices if available
    const preferredVoice = englishVoices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || englishVoices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      voiceService.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      voiceService.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      voiceService.isSpeaking = false;
      if (onError) onError(event);
      // Ensure onEnd is called even on error so UI doesn't get stuck
      if (onEnd) onEnd();
    };

    // Chrome bug workaround: speech synthesis might stall if not triggered properly
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  },

  stopSpeaking: () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      voiceService.isSpeaking = false;
    }
  },
  
  cancelAll: () => {
    voiceService.stopListening();
    voiceService.stopSpeaking();
  }
};

export default voiceService;
