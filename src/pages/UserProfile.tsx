import { useState } from "react";
import {
  Award,
  Star,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  BookOpen,
  MessageCircle,
  UserPlus,
  CheckCircle,
  Trophy,
  Target,
  Zap,
  Clock,
  Heart,
  Share2,
  MoreVertical,
} from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  level: number;
  endorsements?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface Activity {
  id: string;
  type: "skill_shared" | "mentored" | "completed_course" | "earned_badge";
  title: string;
  date: string;
}

interface UserProfileProps {
  name: string;
  role: string;
  location: string;
  image: string;
  bio?: string;
  joinedDate?: string;
  skills?: Skill[];
  socialLinks?: { twitter?: string; linkedin?: string; instagram?: string; facebook?: string };
  stats?: {
    followers: number;
    following: number;
    skillsShared: number;
    hoursLearned: number;
  };
  achievements?: Achievement[];
  recentActivity?: Activity[];
}

const SkillProgressBar = ({ skill }: { skill: Skill }) => {
  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-emerald-500 to-green-600";
    if (level >= 75) return "from-blue-500 to-cyan-600";
    if (level >= 50) return "from-amber-500 to-orange-600";
    return "from-slate-500 to-gray-600";
  };

  const getSkillLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{skill.title}</h4>
          <p className="text-xs text-gray-400">{skill.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} text-white`}>
            {getSkillLabel(skill.level)}
          </span>
        </div>
      </div>

      <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${skill.level}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">{skill.description}</span>
        <div className="flex items-center gap-1 text-blue-400">
          <Users className="w-3 h-3" />
          <span>{skill.endorsements || 0}</span>
        </div>
      </div>
    </div>
  );
};

const AchievementBadge = ({ achievement }: { achievement: Achievement }) => {
  const rarityColors = {
    common: "from-slate-600 to-slate-700 border-slate-500",
    rare: "from-blue-600 to-blue-700 border-blue-400",
    epic: "from-purple-600 to-purple-700 border-purple-400",
    legendary: "from-amber-500 to-orange-600 border-amber-400"
  };

  const rarityGlow = {
    common: "",
    rare: "shadow-blue-500/50",
    epic: "shadow-purple-500/50",
    legendary: "shadow-amber-500/50"
  };

  return (
    <div className={`bg-gradient-to-br ${rarityColors[achievement.rarity]} border-2 rounded-xl p-4 text-center hover:scale-105 transition-all shadow-lg ${rarityGlow[achievement.rarity]} cursor-pointer group`}>
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{achievement.icon}</div>
      <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
      <p className="text-xs text-gray-300 mb-2">{achievement.description}</p>
      <p className="text-xs text-gray-400">{achievement.date}</p>
    </div>
  );
};

export const UserProfile = ({
  name,
  role,
  location,
  image,
  bio,
  joinedDate,
  skills = [],
  socialLinks,
  stats = {
    followers: 0,
    following: 0,
    skillsShared: 0,
    hoursLearned: 0
  },
  achievements = [],
  recentActivity = []
}: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState<"skills" | "achievements" | "activity">("skills");
  const [isFollowing, setIsFollowing] = useState(false);

  const radarData = skills.slice(0, 6).map(skill => ({
    skill: skill.title.length > 15 ? skill.title.substring(0, 12) + "..." : skill.title,
    value: skill.level,
  }));

  const topSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Hero Section with Cover */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">

        {/* Profile Header Card */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">

            {/* Profile Image */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
              <img
                src={image}
                alt={name}
                className="relative w-32 h-32 rounded-full border-4 border-slate-800 object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-800"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-xl text-gray-400 mb-2">{role}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                    {joinedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {joinedDate}</span>
                      </div>
                    )}
                  </div>
                  {bio && <p className="text-gray-300 leading-relaxed max-w-2xl">{bio}</p>}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                      isFollowing
                        ? "bg-slate-700 text-white hover:bg-slate-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <UserPlus className="w-5 h-5" />
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 rounded-xl font-semibold hover:bg-slate-600 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    Message
                  </button>
                  <button className="p-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "Followers", value: stats.followers, icon: Users, color: "text-blue-400" },
                  { label: "Following", value: stats.following, icon: Heart, color: "text-pink-400" },
                  { label: "Skills Shared", value: stats.skillsShared, icon: BookOpen, color: "text-emerald-400" },
                  { label: "Hours Learned", value: stats.hoursLearned, icon: Clock, color: "text-amber-400" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-xl p-4 text-center border border-slate-700 hover:border-slate-600 transition-all">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Tabs */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="flex border-b border-slate-700">
                {[
                  { key: "skills", label: "Skills & Expertise", icon: Target },
                  { key: "achievements", label: "Achievements", icon: Trophy },
                  { key: "activity", label: "Recent Activity", icon: TrendingUp },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                      activeTab === tab.key
                        ? "bg-slate-700 text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">Skills & Expertise</h3>
                      <span className="text-sm text-gray-400">{skills.length} skills mastered</span>
                    </div>

                    {skills.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill) => (
                          <SkillProgressBar key={skill.id} skill={skill} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No skills added yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">Achievements</h3>
                      <span className="text-sm text-gray-400">{achievements.length} unlocked</span>
                    </div>

                    {achievements.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {achievements.map((achievement) => (
                          <AchievementBadge key={achievement.id} achievement={achievement} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No achievements yet</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === "activity" && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>

                    {recentActivity.length > 0 ? (
                      <div className="space-y-3">
                        {recentActivity.map((activity) => {
                          const iconMap = {
                            skill_shared: BookOpen,
                            mentored: Users,
                            completed_course: CheckCircle,
                            earned_badge: Award,
                          };
                          const Icon = iconMap[activity.type];

                          return (
                            <div key={activity.id} className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all">
                              <div className="bg-blue-600 p-2 rounded-lg">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold mb-1">{activity.title}</p>
                                <p className="text-xs text-gray-400">{activity.date}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No recent activity</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* Skill Radar Chart */}
            {skills.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Skill Overview
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis dataKey="skill" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#475569" />
                      <Radar name="Skill Level" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Top Skills */}
            {topSkills.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  Top Skills
                </h3>
                <div className="space-y-3">
                  {topSkills.map((skill, idx) => (
                    <div key={skill.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? "bg-amber-500 text-white" :
                        idx === 1 ? "bg-slate-400 text-white" :
                        "bg-orange-600 text-white"
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{skill.title}</p>
                        <p className="text-xs text-gray-400">{skill.level}% mastery</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {socialLinks && Object.keys(socialLinks).length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold mb-4">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-center font-semibold transition-all">
                      Twitter
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px] bg-blue-700 hover:bg-blue-800 p-3 rounded-lg text-center font-semibold transition-all">
                      LinkedIn
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px] bg-pink-500 hover:bg-pink-600 p-3 rounded-lg text-center font-semibold transition-all">
                      Instagram
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[120px] bg-blue-800 hover:bg-blue-900 p-3 rounded-lg text-center font-semibold transition-all">
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
