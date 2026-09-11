// ============================================================
// aiInterviewService.js — Mock AI Conversation Engine
// ============================================================
import { questionBanks, questionsForDuration } from "../data/interviewData";

/**
 * In production, this service should make HTTP calls to:
 * POST /api/interviews/{id}/message
 * 
 * For now, it acts as a local rule-based conversation engine
 * that simulates an AI interviewer.
 */
const aiInterviewService = {
  
  // Initialize a new interview session state
  initializeSession: (config) => {
    // Determine the right question bank based on config
    let bank = [];
    try {
      const typeBank = questionBanks[config.type] || questionBanks["technical"];
      const topicBank = typeBank[config.topic] || Object.values(typeBank)[0];
      bank = topicBank[config.difficulty] || topicBank["medium"];
    } catch (e) {
      // Fallback
      bank = questionBanks["technical"]["dsa"]["medium"];
    }
    
    const numQuestions = questionsForDuration(config.duration);
    
    // Select N random questions
    const selectedQuestions = [...bank].sort(() => 0.5 - Math.random()).slice(0, numQuestions);
    
    return {
      id: `int_${Date.now()}`,
      config,
      status: "active",
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      currentFollowUpIndex: -1, // -1 means main question, >= 0 means follow up
      conversation: [],
      startTime: Date.now()
    };
  },

  // Get the initial greeting based on the configuration
  getGreeting: (config) => {
    const timeText = `${config.duration} minute`;
    const topicText = config.topic === "dsa" ? "Data Structures and Algorithms" 
      : config.topic === "fullstack" ? "Full Stack Development"
      : config.topic === "general" ? "Behavioral"
      : config.topic === "scalability" ? "System Design"
      : config.topic;
      
    return `Hi, I'm your AI interviewer. Today we'll be conducting a ${timeText} ${config.type} interview focused on ${topicText}. I'll ask you a few questions and we'll have a natural conversation. Are you ready to begin?`;
  },

  // Process the user's response and return the AI's next statement
  processResponse: async (sessionState, userText) => {
    // Simulate network/processing delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    const qIndex = sessionState.currentQuestionIndex;
    const q = sessionState.questions[qIndex];
    
    // If we've run out of questions, end the interview
    if (qIndex >= sessionState.questions.length) {
      return {
        text: "That brings us to the end of our interview today. Thank you for your time. Your results will be processed shortly.",
        isEnd: true
      };
    }

    const words = userText.trim().split(/\s+/).length;
    const lowerText = userText.toLowerCase();
    
    // 1. Check if it's the very first response (to the greeting)
    if (qIndex === 0 && sessionState.conversation.length <= 2) {
      return { text: `Great, let's start. ${q.text}`, isEnd: false, stateUpdate: { currentFollowUpIndex: -1 } };
    }

    // 2. Was it a really short response? Prod for more.
    if (words < 10) {
      const prods = [
        "Could you elaborate on that a bit more?",
        "Can you provide a little more detail?",
        "Interesting. Could you explain your thought process?"
      ];
      return { 
        text: prods[Math.floor(Math.random() * prods.length)], 
        isEnd: false 
      };
    }

    // 3. Are there follow-up questions we haven't asked yet?
    const nextFollowUp = sessionState.currentFollowUpIndex + 1;
    if (q.followUps && nextFollowUp < q.followUps.length) {
      
      // Look for keywords in user response to acknowledge them
      let ack = "Okay. ";
      let foundKeyword = false;
      if (q.keywords) {
        for (const kw of q.keywords) {
          if (lowerText.includes(kw)) {
            foundKeyword = true;
            break;
          }
        }
      }
      
      if (foundKeyword) {
        const acks = ["That's a good point. ", "Exactly. ", "I agree. ", "That makes sense. "];
        ack = acks[Math.floor(Math.random() * acks.length)];
      }

      return {
        text: `${ack}${q.followUps[nextFollowUp]}`,
        isEnd: false,
        stateUpdate: { currentFollowUpIndex: nextFollowUp }
      };
    }

    // 4. Move to the next question
    const nextQIndex = qIndex + 1;
    if (nextQIndex < sessionState.questions.length) {
      const transitions = [
        "Good. Let's move on to the next topic. ",
        "Understood. Next question: ",
        "Thanks for that explanation. Now, ",
        "Okay, let's switch gears. "
      ];
      const trans = transitions[Math.floor(Math.random() * transitions.length)];
      const nextQ = sessionState.questions[nextQIndex];
      
      return {
        text: `${trans}${nextQ.text}`,
        isEnd: false,
        stateUpdate: { currentQuestionIndex: nextQIndex, currentFollowUpIndex: -1 }
      };
    } else {
      // 5. Finished all questions
      return {
        text: "That was the last question. Thank you for your detailed answers. That brings us to the end of the interview.",
        isEnd: true,
        stateUpdate: { currentQuestionIndex: nextQIndex }
      };
    }
  }
};

export default aiInterviewService;
