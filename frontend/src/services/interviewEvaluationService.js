// ============================================================
// interviewEvaluationService.js — Mock AI Evaluation Engine
// ============================================================
import { mockEvaluationTemplate } from "../data/interviewData";

/**
 * In production, this service will make a POST to:
 * POST /api/interviews/{id}/evaluate
 * sending the entire session state and conversation transcript.
 * The real AI will grade the interview.
 * 
 * For now, this returns mock data after a short simulated delay.
 */
const interviewEvaluationService = {
  
  evaluateInterview: async (sessionState) => {
    // Simulate processing time for AI evaluation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // In a real implementation, we would analyze sessionState.conversation
    // Here we just return the mock template, varying the overall score slightly
    // based on conversation length.
    
    const baseEvaluation = JSON.parse(JSON.stringify(mockEvaluationTemplate));
    
    // Slight randomization to make it feel "real"
    const lengthModifier = Math.min(sessionState.conversation.length, 10);
    const score = Math.min(100, 65 + lengthModifier * 2 + Math.floor(Math.random() * 10));
    
    baseEvaluation.overallScore = score;
    
    return baseEvaluation;
  }
};

export default interviewEvaluationService;
