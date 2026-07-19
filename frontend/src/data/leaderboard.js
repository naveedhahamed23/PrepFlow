const names = [
  "Ishaan Verma", "Diya Patel", "Aarav Sharma", "Ananya Reddy", "Vihaan Gupta",
  "Saanvi Nair", "Kabir Khan", "Myra Iyer", "Reyansh Rao", "Zara Malhotra",
  "Aditya Menon", "Kiara Das", "Arjun Pillai", "Navya Joshi", "Vivaan Chatterjee",
];

export const leaderboardData = names
  .map((name, i) => {
    const seed = i * 17.31;
    const rand = Math.abs(Math.sin(seed));
    return {
      id: `lb_${i + 1}`,
      name,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(name)}`,
      xp: Math.floor(4000 + rand * 9000),
      streak: Math.floor(3 + rand * 60),
      solved: Math.floor(60 + rand * 320),
      college: ["NIT Trichy", "IIT Bombay", "BITS Pilani", "VIT Vellore", "IIIT Hyderabad"][i % 5],
    };
  })
  .sort((a, b) => b.xp - a.xp)
  .map((entry, i) => ({ ...entry, rank: i + 1 }));
