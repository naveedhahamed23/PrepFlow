// ============================================================
// interviewData.js — All static data for Mock Interview feature
// Question banks, presets, mock history, and evaluation templates
// ============================================================

// ── Quick Presets ────────────────────────────────────────────
export const quickPresets = [
  {
    id: "faang",
    label: "FAANG",
    config: {
      type: "technical",
      topic: "dsa",
      difficulty: "hard",
      duration: 45,
      mode: "voice",
      language: "en",
    },
  },
  {
    id: "sde-intern",
    label: "SDE Intern",
    config: {
      type: "technical",
      topic: "dsa",
      difficulty: "medium",
      duration: 30,
      mode: "voice",
      language: "en",
    },
  },
  {
    id: "fullstack",
    label: "Full Stack",
    config: {
      type: "technical",
      topic: "fullstack",
      difficulty: "medium",
      duration: 30,
      mode: "voice",
      language: "en",
    },
  },
  {
    id: "data-science",
    label: "Data Science",
    config: {
      type: "technical",
      topic: "ml",
      difficulty: "medium",
      duration: 30,
      mode: "voice",
      language: "en",
    },
  },
  {
    id: "product",
    label: "Product",
    config: {
      type: "behavioral",
      topic: "product",
      difficulty: "medium",
      duration: 30,
      mode: "voice",
      language: "en",
    },
  },
];

// ── Config Options ────────────────────────────────────────────
export const interviewTypes = [
  { value: "technical", label: "Technical Interview", description: "Focus on technical knowledge and problem solving" },
  { value: "behavioral", label: "Behavioral Interview", description: "Situational and experience-based questions" },
  { value: "system-design", label: "System Design", description: "Architecture, scalability, and design principles" },
  { value: "hr", label: "HR Round", description: "Company fit, culture, and career goals" },
];

export const topicsByType = {
  technical: [
    { value: "dsa", label: "Data Structures & Algorithms", description: "Arrays, Linked Lists, Trees, Graphs, DP and more" },
    { value: "fullstack", label: "Full Stack Development", description: "React, Node.js, REST APIs, databases" },
    { value: "java", label: "Java / Spring Boot", description: "OOP, collections, Spring framework" },
    { value: "ml", label: "Machine Learning / AI", description: "Models, training, evaluation, frameworks" },
    { value: "dbms", label: "Database Systems", description: "SQL, NoSQL, transactions, indexing" },
    { value: "os", label: "Operating Systems", description: "Processes, threads, memory, scheduling" },
    { value: "cn", label: "Computer Networks", description: "TCP/IP, HTTP, routing, protocols" },
  ],
  behavioral: [
    { value: "general", label: "General Behavioral", description: "STAR method, leadership, teamwork" },
    { value: "product", label: "Product & PM", description: "Product thinking, roadmaps, metrics" },
    { value: "leadership", label: "Leadership", description: "Managing teams, conflict, decision making" },
  ],
  "system-design": [
    { value: "scalability", label: "Scalability & Architecture", description: "Distributed systems, microservices" },
    { value: "api", label: "API Design", description: "REST, GraphQL, rate limiting" },
    { value: "database", label: "Database Design", description: "Schema, sharding, replication" },
  ],
  hr: [
    { value: "general", label: "General HR", description: "Introduction, strengths, weaknesses, goals" },
  ],
};

export const difficulties = [
  { value: "easy", label: "Easy", description: "Entry-level, straightforward questions" },
  { value: "medium", label: "Medium", description: "Balanced questions for skill development" },
  { value: "hard", label: "Hard", description: "Advanced, FAANG-level questions" },
];

export const durations = [
  { value: 15, label: "15 minutes", description: "~3–4 questions" },
  { value: 30, label: "30 minutes", description: "Around 5–8 questions" },
  { value: 45, label: "45 minutes", description: "~8–12 questions" },
  { value: 60, label: "60 minutes", description: "Full-length interview" },
];

export const interviewModes = [
  { value: "voice", label: "Voice (AI will speak)", description: "Have a natural voice conversation" },
  { value: "text", label: "Text Interview", description: "Type your responses instead" },
];

export const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
];

// ── Question Banks ─────────────────────────────────────────────
// Each question: { id, text, followUps[], keywords[], minWords }
const dsaEasy = [
  {
    id: "dsa-e-1",
    text: "Can you explain the difference between an array and a linked list?",
    followUps: [
      "Which one would you choose for frequent insertions in the middle? Why?",
      "What is the time complexity for accessing an element in each?",
    ],
    keywords: ["contiguous", "pointer", "dynamic", "random access"],
  },
  {
    id: "dsa-e-2",
    text: "What is a stack and where is it commonly used?",
    followUps: [
      "Can you implement a stack using a queue?",
      "What is the time complexity for push and pop operations?",
    ],
    keywords: ["lifo", "last in", "recursion", "call stack"],
  },
  {
    id: "dsa-e-3",
    text: "Explain the concept of recursion with an example.",
    followUps: [
      "What is a base case and why is it important?",
      "What happens when there is no base case?",
    ],
    keywords: ["base case", "call itself", "fibonacci", "factorial"],
  },
];

const dsaMedium = [
  {
    id: "dsa-m-1",
    text: "How would you detect a cycle in a linked list?",
    followUps: [
      "What is the space complexity of using a hash set approach?",
      "Can you think of an approach that uses O(1) extra space?",
      "How does Floyd's cycle detection algorithm work exactly?",
    ],
    keywords: ["slow", "fast", "pointer", "hash", "floyd", "tortoise"],
  },
  {
    id: "dsa-m-2",
    text: "Explain the difference between BFS and DFS. When would you use each?",
    followUps: [
      "What data structure is typically used for BFS?",
      "How does memory usage differ between BFS and DFS?",
      "Can you give a real-world problem where BFS is the right choice?",
    ],
    keywords: ["breadth", "depth", "queue", "stack", "level", "shortest"],
  },
  {
    id: "dsa-m-3",
    text: "What is dynamic programming and how do you identify if a problem can be solved with it?",
    followUps: [
      "What are the two properties a problem must have for DP to apply?",
      "What is the difference between top-down and bottom-up DP?",
      "Can you walk me through how you'd solve the coin change problem?",
    ],
    keywords: ["optimal substructure", "overlapping", "memoization", "tabulation"],
  },
  {
    id: "dsa-m-4",
    text: "How does a binary search tree work? What are its properties?",
    followUps: [
      "What is the worst-case time complexity for search in a BST?",
      "How do you balance a BST?",
    ],
    keywords: ["left", "right", "smaller", "greater", "inorder", "sorted"],
  },
  {
    id: "dsa-m-5",
    text: "Given an array, how would you find two numbers that add up to a target sum?",
    followUps: [
      "Can you improve it from O(n²) to O(n)?",
      "What data structure makes this efficient and why?",
    ],
    keywords: ["hash", "map", "complement", "brute force", "two pointer"],
  },
];

const dsaHard = [
  {
    id: "dsa-h-1",
    text: "Explain Dijkstra's algorithm and its time complexity.",
    followUps: [
      "Why can't Dijkstra's handle negative weights?",
      "What algorithm would you use for graphs with negative weights?",
      "How does a priority queue improve Dijkstra's performance?",
    ],
    keywords: ["priority queue", "greedy", "shortest path", "negative"],
  },
  {
    id: "dsa-h-2",
    text: "What is the difference between a min-heap and a max-heap? How would you implement one?",
    followUps: [
      "What is the time complexity of heapify?",
      "How would you find the kth largest element efficiently using a heap?",
    ],
    keywords: ["heapify", "parent", "child", "kth", "priority"],
  },
  {
    id: "dsa-h-3",
    text: "Can you describe how quicksort works and analyze its time complexity?",
    followUps: [
      "What is the worst case for quicksort and when does it occur?",
      "How does randomized quicksort help avoid worst-case behavior?",
    ],
    keywords: ["pivot", "partition", "average", "worst", "random"],
  },
];

const behavioralGeneral = [
  {
    id: "beh-1",
    text: "Tell me about yourself and your background in software development.",
    followUps: [
      "What motivated you to get into software engineering?",
      "What project are you most proud of?",
    ],
    keywords: ["experience", "project", "learn", "passion", "goal"],
  },
  {
    id: "beh-2",
    text: "Describe a challenging technical problem you faced and how you solved it.",
    followUps: [
      "What was the outcome?",
      "What would you do differently in hindsight?",
    ],
    keywords: ["problem", "solution", "debug", "challenge", "team"],
  },
  {
    id: "beh-3",
    text: "How do you handle tight deadlines and competing priorities?",
    followUps: [
      "Can you give a specific example?",
      "How do you communicate timeline risks to your team?",
    ],
    keywords: ["prioritize", "deadline", "communicate", "manage", "tradeoff"],
  },
  {
    id: "beh-4",
    text: "Tell me about a time you disagreed with a teammate or manager. How did you handle it?",
    followUps: [
      "What was the resolution?",
      "What did you learn from that experience?",
    ],
    keywords: ["disagree", "resolve", "listen", "respect", "feedback"],
  },
  {
    id: "beh-5",
    text: "Where do you see yourself in 5 years?",
    followUps: [
      "How does this role fit into that plan?",
    ],
    keywords: ["growth", "senior", "lead", "learn", "goal"],
  },
];

const systemDesignMedium = [
  {
    id: "sd-m-1",
    text: "How would you design a URL shortening service like bit.ly?",
    followUps: [
      "How would you handle millions of requests per second?",
      "What database would you choose and why?",
      "How do you ensure uniqueness of the short codes?",
    ],
    keywords: ["hash", "database", "cache", "scale", "redirect"],
  },
  {
    id: "sd-m-2",
    text: "Design a notification system that sends push, email, and SMS notifications.",
    followUps: [
      "How would you handle delivery failures?",
      "How do you prevent duplicate notifications?",
    ],
    keywords: ["queue", "retry", "idempotent", "pub-sub", "service"],
  },
  {
    id: "sd-m-3",
    text: "How would you design a rate limiter for an API?",
    followUps: [
      "What algorithms can you use for rate limiting?",
      "How would you handle distributed rate limiting?",
    ],
    keywords: ["token bucket", "sliding window", "redis", "distributed"],
  },
];

export const questionBanks = {
  technical: {
    dsa: { easy: dsaEasy, medium: dsaMedium, hard: dsaHard },
    fullstack: { easy: behavioralGeneral.slice(0,2), medium: dsaMedium.slice(0,3), hard: dsaHard.slice(0,2) },
    java: { easy: dsaEasy, medium: dsaMedium, hard: dsaHard },
    ml: { easy: behavioralGeneral.slice(0,2), medium: dsaMedium.slice(0,3), hard: dsaHard },
    dbms: { easy: dsaEasy, medium: dsaMedium.slice(0,3), hard: dsaHard.slice(0,2) },
    os: { easy: dsaEasy, medium: dsaMedium, hard: dsaHard },
    cn: { easy: dsaEasy, medium: dsaMedium, hard: dsaHard },
  },
  behavioral: {
    general: { easy: behavioralGeneral, medium: behavioralGeneral, hard: behavioralGeneral },
    product: { easy: behavioralGeneral, medium: behavioralGeneral, hard: behavioralGeneral },
    leadership: { easy: behavioralGeneral, medium: behavioralGeneral, hard: behavioralGeneral },
  },
  "system-design": {
    scalability: { easy: systemDesignMedium, medium: systemDesignMedium, hard: systemDesignMedium },
    api: { easy: systemDesignMedium, medium: systemDesignMedium, hard: systemDesignMedium },
    database: { easy: systemDesignMedium, medium: systemDesignMedium, hard: systemDesignMedium },
  },
  hr: {
    general: { easy: behavioralGeneral, medium: behavioralGeneral, hard: behavioralGeneral },
  },
};

// ── Questions per duration ─────────────────────────────────────
export const questionsForDuration = (durationMinutes) => {
  if (durationMinutes <= 15) return 3;
  if (durationMinutes <= 30) return 5;
  if (durationMinutes <= 45) return 7;
  return 10;
};

// ── Mock Interview History ─────────────────────────────────────
export const mockInterviewHistory = [
  {
    id: "h1",
    date: "2026-09-08",
    type: "Technical",
    topic: "DSA",
    duration: "28 min",
    durationSeconds: 1680,
    score: 78,
    feedback: "Good understanding of core concepts",
    config: { type: "technical", topic: "dsa", difficulty: "medium", duration: 30, mode: "voice" },
  },
  {
    id: "h2",
    date: "2026-09-05",
    type: "Behavioral",
    topic: "General",
    duration: "20 min",
    durationSeconds: 1200,
    score: 72,
    feedback: "Strong communication, elaborate more on outcomes",
    config: { type: "behavioral", topic: "general", difficulty: "medium", duration: 30, mode: "voice" },
  },
  {
    id: "h3",
    date: "2026-09-02",
    type: "System Design",
    topic: "Scalability",
    duration: "32 min",
    durationSeconds: 1920,
    score: 65,
    feedback: "Work on trade-off analysis",
    config: { type: "system-design", topic: "scalability", difficulty: "hard", duration: 45, mode: "voice" },
  },
  {
    id: "h4",
    date: "2026-08-28",
    type: "Technical",
    topic: "DBMS",
    duration: "25 min",
    durationSeconds: 1500,
    score: 81,
    feedback: "Excellent SQL knowledge",
    config: { type: "technical", topic: "dbms", difficulty: "medium", duration: 30, mode: "voice" },
  },
];

export const mockPerformanceTrend = [
  { month: "Jun", score: 58 },
  { month: "Jul", score: 65 },
  { month: "Aug", score: 71 },
  { month: "Sep", score: 75 },
];

// ── Mock Evaluation Template ───────────────────────────────────
export const mockEvaluationTemplate = {
  overallScore: 76,
  dimensions: {
    "Technical Knowledge": { score: 80, feedback: "Strong understanding of core concepts with good reasoning." },
    "Problem Solving": { score: 72, feedback: "Good approach, but could optimize solutions further." },
    "Communication": { score: 78, feedback: "Clear explanations; work on structuring responses using frameworks." },
    "Confidence": { score: 75, feedback: "Good composure; take a moment to think before answering." },
    "Answer Quality": { score: 74, feedback: "Solid answers; use more specific examples and metrics." },
  },
  strengths: [
    "Clear and concise explanations",
    "Good understanding of fundamentals",
    "Professional communication style",
  ],
  improvements: [
    "Provide more concrete examples with measurable impact",
    "Structure answers using STAR method for behavioral questions",
    "Practice explaining time/space complexity proactively",
  ],
  aiFeedback: "You showed a solid grasp of the core concepts. Your explanations were clear, which is a strong signal for real interviews. Focus on proactively discussing trade-offs and complexity — interviewers at top companies appreciate when candidates think out loud rather than jumping to solutions.",
};
