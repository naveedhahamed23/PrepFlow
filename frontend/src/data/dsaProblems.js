const topics = [
  "Arrays", "Strings", "Linked List", "Trees", "Graphs", "Dynamic Programming",
  "Binary Search", "Stack & Queue", "Heap", "Backtracking", "Greedy", "Bit Manipulation",
];

const companies = ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Flipkart", "Uber", "Goldman Sachs"];
const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["Solved", "Attempted", "Not Started", "Revision"];

const titles = [
  "Two Sum", "Longest Substring Without Repeating Characters", "Median of Two Sorted Arrays",
  "Merge Intervals", "Reverse Linked List", "LRU Cache", "Word Break", "Course Schedule",
  "Number of Islands", "Trapping Rain Water", "Sliding Window Maximum", "Kth Largest Element",
  "Binary Tree Level Order Traversal", "Serialize and Deserialize Binary Tree", "Edit Distance",
  "Longest Increasing Subsequence", "Coin Change", "Combination Sum", "N-Queens", "Word Ladder",
  "Clone Graph", "Minimum Window Substring", "Product of Array Except Self", "Maximum Subarray",
  "House Robber", "Jump Game", "Rotate Image", "Spiral Matrix", "Search in Rotated Sorted Array",
  "Valid Parentheses", "Implement Trie", "Top K Frequent Elements", "Merge K Sorted Lists",
  "Copy List with Random Pointer", "Longest Palindromic Substring", "Subsets", "Permutations",
  "Unique Paths", "Climbing Stairs", "Best Time to Buy and Sell Stock",
];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const dsaProblems = titles.map((title, i) => {
  const r1 = seededRandom(i * 3.1);
  const r2 = seededRandom(i * 7.7);
  const r3 = seededRandom(i * 13.3);
  return {
    id: `dsa_${String(i + 1).padStart(3, "0")}`,
    title,
    topic: topics[Math.floor(r1 * topics.length)],
    difficulty: difficulties[Math.floor(r2 * difficulties.length)],
    status: statuses[Math.floor(r3 * statuses.length)],
    companies: [companies[Math.floor(r1 * companies.length)], companies[Math.floor(r3 * companies.length)]].filter(
      (v, idx, arr) => arr.indexOf(v) === idx
    ),
    revisionDate: new Date(Date.now() + Math.floor((r2 - 0.5) * 20) * 86400000).toISOString().slice(0, 10),
    notes: i % 4 === 0 ? "Revisit two-pointer approach, missed edge case with empty input." : "",
    url: `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/`,
    solvedOn: r1 > 0.4 ? new Date(Date.now() - Math.floor(r1 * 60) * 86400000).toISOString().slice(0, 10) : null,
    timeTaken: Math.floor(10 + r2 * 50),
  };
});

export const dsaTopicStats = topics.map((t, i) => ({
  topic: t,
  solved: 10 + Math.floor(seededRandom(i) * 40),
  total: 50 + Math.floor(seededRandom(i * 2) * 20),
}));

export const dsaWeeklyActivity = [
  { day: "Mon", solved: 4 },
  { day: "Tue", solved: 6 },
  { day: "Wed", solved: 3 },
  { day: "Thu", solved: 8 },
  { day: "Fri", solved: 5 },
  { day: "Sat", solved: 9 },
  { day: "Sun", solved: 2 },
];
