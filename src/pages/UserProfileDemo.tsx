import { useParams } from "react-router-dom";
import { UserProfile } from "./UserProfile";

const sampleSkills = [
  {
    id: "1",
    title: "React Development",
    category: "Frontend",
    description: "Modern web apps with hooks",
    level: 95,
    endorsements: 48,
  },
  {
    id: "2",
    title: "TypeScript",
    category: "Programming",
    description: "Type-safe development",
    level: 88,
    endorsements: 35,
  },
  {
    id: "3",
    title: "UI/UX Design",
    category: "Design",
    description: "User-centered design",
    level: 82,
    endorsements: 42,
  },
  {
    id: "4",
    title: "Node.js",
    category: "Backend",
    description: "Server-side JavaScript",
    level: 78,
    endorsements: 28,
  },
  {
    id: "5",
    title: "Database Design",
    category: "Backend",
    description: "SQL & NoSQL databases",
    level: 75,
    endorsements: 31,
  },
  {
    id: "6",
    title: "System Architecture",
    category: "Infrastructure",
    description: "Scalable system design",
    level: 70,
    endorsements: 22,
  },
  {
    id: "7",
    title: "GraphQL",
    category: "API",
    description: "Modern API development",
    level: 68,
    endorsements: 19,
  },
  {
    id: "8",
    title: "Docker",
    category: "DevOps",
    description: "Container orchestration",
    level: 65,
    endorsements: 24,
  },
];

const sampleAchievements = [
  {
    id: "1",
    title: "First Mentor",
    description: "Mentored your first student",
    icon: "🎓",
    date: "Jan 2024",
    rarity: "common" as const,
  },
  {
    id: "2",
    title: "Skill Master",
    description: "Mastered 5 skills",
    icon: "⭐",
    date: "Feb 2024",
    rarity: "rare" as const,
  },
  {
    id: "3",
    title: "Community Hero",
    description: "100+ helpful responses",
    icon: "🦸",
    date: "Mar 2024",
    rarity: "epic" as const,
  },
  {
    id: "4",
    title: "Top Contributor",
    description: "Top 1% contributor",
    icon: "🏆",
    date: "Apr 2024",
    rarity: "legendary" as const,
  },
  {
    id: "5",
    title: "Course Creator",
    description: "Created first course",
    icon: "📚",
    date: "May 2024",
    rarity: "rare" as const,
  },
  {
    id: "6",
    title: "Networking Pro",
    description: "Connected with 50+ mentors",
    icon: "🤝",
    date: "Jun 2024",
    rarity: "epic" as const,
  },
];

const sampleActivity = [
  {
    id: "1",
    type: "skill_shared" as const,
    title: "Shared a new skill: Advanced React Patterns",
    date: "2 hours ago",
  },
  {
    id: "2",
    type: "mentored" as const,
    title: "Completed mentorship session with 3 students",
    date: "5 hours ago",
  },
  {
    id: "3",
    type: "earned_badge" as const,
    title: "Earned 'Top Contributor' badge",
    date: "1 day ago",
  },
  {
    id: "4",
    type: "completed_course" as const,
    title: "Completed 'System Design Fundamentals' course",
    date: "2 days ago",
  },
  {
    id: "5",
    type: "skill_shared" as const,
    title: "Published article: Building Scalable APIs",
    date: "3 days ago",
  },
  {
    id: "6",
    type: "mentored" as const,
    title: "Hosted workshop on TypeScript best practices",
    date: "5 days ago",
  },
];

const UserProfileDemo = () => {
  const { skillId } = useParams();

  // find the skill by ID
  const selectedSkill = sampleSkills.find((skill) => skill.id === skillId);

  return (
    <UserProfile
      name="Sarah Anderson"
      role="Senior Full-Stack Developer & Mentor"
      location="San Francisco, CA"
      image="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400&h=400"
      bio={`Passionate about empowering the next generation of developers. Highlight skill: ${
        selectedSkill?.title ?? "General Development"
      } (${selectedSkill?.category ?? "N/A"}).`}
      joinedDate="March 2023"
      skills={sampleSkills}
      socialLinks={{
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      }}
      stats={{
        followers: 1234,
        following: 456,
        skillsShared: 24,
        hoursLearned: 342,
      }}
      achievements={sampleAchievements}
      recentActivity={sampleActivity}
    />
  );
};

export default UserProfileDemo;
