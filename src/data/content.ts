export type Achievement = {
  id: number;
  title: string;
  description: string;
  studentName: string;
  date: string;
};

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Inter-University Debate — Runners-up",
    description:
      "Represented the batch in the national maritime affairs debate competition.",
    studentName: "Rakib Khan",
    date: "March 2026",
  },
  {
    id: 2,
    title: "Maritime Law Moot Court — 2nd Place",
    description:
      "A team from the batch reached the finals of the regional moot court competition.",
    studentName: "Batch Team",
    date: "January 2026",
  },
  {
    id: 3,
    title: "Best Research Poster",
    description:
      "Awarded for a research poster on port governance policy at the university symposium.",
    studentName: "Nabila Islam",
    date: "December 2025",
  },
];

export type Journal = {
  id: number;
  title: string;
  authorName: string;
  date: string;
  excerpt: string;
};

export const journals: Journal[] = [
  {
    id: 1,
    title: "Reflections on Maritime Governance Policy",
    authorName: "Rakib Khan",
    date: "April 2026",
    excerpt:
      "A short reflection on how maritime governance frameworks shape regional trade and security policy.",
  },
  {
    id: 2,
    title: "First Semester Notes: Maritime Law Fundamentals",
    authorName: "Nabila Islam",
    date: "February 2026",
    excerpt:
      "Personal notes and takeaways from the introductory maritime law coursework this semester.",
  },
];
