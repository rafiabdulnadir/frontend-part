import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";

interface Skill {
  id?: string;
  title: string;
  category: string;
  description: string;
  level: number;
  endorsements?: number;
}

interface Achievement {
  id?: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

const skillCategories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Database Management",
  "Blockchain",
  "Game Development",
  "Embedded Systems",
];

const EditProfile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "");
  const [email, setEmail] = useState(user?.email || "");
  const [location, setLocation] = useState(user?.location?.address || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [joinedDate, setJoinedDate] = useState(user?.joinedDate || "");
  const [skills, setSkills] = useState<Skill[]>(user?.skills || []);
  const [achievements, setAchievements] = useState<Achievement[]>(user?.achievements || []);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(user?.socialLinks || {});
  const [stats, setStats] = useState(user?.stats || { followers: 0, following: 0, skillsShared: 0, hoursLearned: 0 });
  const [dpFile, setDpFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Add Skill
  const [newSkill, setNewSkill] = useState<Skill>({
    title: "",
    category: "",
    description: "",
    level: 0,
  });

  const handleAddSkill = () => {
    if (!newSkill.title || !newSkill.category) return;
    setSkills([...skills, newSkill]);
    setNewSkill({ title: "", category: "", description: "", level: 0 });
  };

  const handleRemoveSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  // File uploads
  const handleDpChange = (e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && setDpFile(e.target.files[0]);
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && setCoverFile(e.target.files[0]);

  const handleSave = () => {
    updateUser({
      ...user,
      name,
      role,
      email,
      location: { address: location },
      bio,
      joinedDate,
      skills,
      achievements,
      socialLinks,
      stats,
      dpFile,
      coverFile,
    });
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-6">
          <h1 className="text-3xl font-bold text-center">Edit Profile</h1>

          {/* DP & Cover */}
          <Card className="p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative">
                <img
                  src={dpFile ? URL.createObjectURL(dpFile) : user?.dpUrl || "/default-dp.png"}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-4 border-card"
                />
                <label className="absolute bottom-0 right-0 cursor-pointer bg-primary rounded-full p-2">
                  <Edit className="h-4 w-4 text-white" />
                  <input type="file" className="hidden" onChange={handleDpChange} />
                </label>
              </div>
              <div className="flex-1">
                <div className="relative h-32 bg-gray-700 rounded-xl overflow-hidden">
                  {coverFile && <img src={URL.createObjectURL(coverFile)} alt="Cover" className="h-full w-full object-cover" />}
                  <label className="absolute top-2 right-2 cursor-pointer bg-primary rounded-full p-2">
                    <Edit className="h-4 w-4 text-white" />
                    <input type="file" className="hidden" onChange={handleCoverChange} />
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Basic Info */}
          <Card className="p-6 space-y-4">
            <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
            <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <Input placeholder="Joined Date" value={joinedDate} onChange={e => setJoinedDate(e.target.value)} />
            <Textarea placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)} />
          </Card>

          {/* Social Links */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Social Links</h2>
            {["twitter", "linkedin", "instagram", "facebook"].map((key) => (
              <Input
                key={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={(socialLinks as any)[key] || ""}
                onChange={e => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
              />
            ))}
          </Card>

          {/* Skills */}
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
              <Select value={newSkill.category} onValueChange={value => setNewSkill({ ...newSkill, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map((cat, i) => (
                    <SelectItem key={i} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Title" value={newSkill.title} onChange={e => setNewSkill({ ...newSkill, title: e.target.value })} />
              <Input placeholder="Description" value={newSkill.description} onChange={e => setNewSkill({ ...newSkill, description: e.target.value })} />
              <Input placeholder="Level (%)" type="number" value={newSkill.level} onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })} />
              <Button onClick={handleAddSkill}>Add</Button>
            </div>
            <div className="mt-4 space-y-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center border border-border rounded-lg p-2">
                  <span>{skill.category}</span>
                  <span>{skill.title}</span>
                  <span>{skill.description}</span>
                  <span>{skill.level}%</span>
                  <Button size="icon" variant="ghost" onClick={() => handleRemoveSkill(idx)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Save */}
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
