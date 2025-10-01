
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/SkillCard";
import { Navbar } from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { Footer } from "@/pages/Footer";

import { useNavigate } from "react-router-dom"; 
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TechnicalGroups } from "@/components/TechnicalGroups";

// Mock skills data



const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
 
const exploreRef = useRef<HTMLDivElement>(null);
const [activeSection, setActiveSection] = useState("home");

const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
const [locationQuery, setLocationQuery] = useState("");
const [ageGroup, setAgeGroup] = useState("");
const [gender, setGender] = useState("");
const [budget, setBudget] = useState("");
const [skillLevel, setSkillLevel] = useState("");
const [keywordFilter, setKeywordFilter] = useState("");

useEffect(() => {
  const handleScroll = () => {
    const heroTop = heroRef.current?.getBoundingClientRect().top || 0;
    const exploreTop = exploreRef.current?.getBoundingClientRect().top || 0;

    if (exploreTop <= 100) {
      setActiveSection("explore");
    } else if (heroTop <= 100) {
      setActiveSection("home");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // initial check

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

 const navigate = useNavigate();

const mockSkills = [
  {
    id: "1",
    title: "Web Development",
    provider: "Sarah Johnson",
    category: "Technology",
    rating: 4.8,
    reviews: 127,
    location: "New York, NY",
    price: "$50/hr",
    description: "Full-stack web development with React, Node.js, and modern frameworks",
    ageGroup: "18-25",
    level: "advanced",
    gender: "female",
  },
  {
    id: "2",
    title: "Graphic Design",
    provider: "Mike Chen",
    category: "Design",
    rating: 4.9,
    reviews: 89,
    location: "San Francisco, CA",
    price: "$45/hr",
    description: "Creative design solutions for branding, UI/UX, and marketing materials",
    ageGroup: "26-35",
    level: "intermediate",
    gender: "male",
  },
  {
    id: "3",
    title: "Digital Marketing",
    provider: "Emma Wilson",
    category: "Marketing",
    rating: 4.7,
    reviews: 156,
    location: "Austin, TX",
    price: "$60/hr",
    description: "SEO, social media marketing, and content strategy for businesses",
    ageGroup: "36-50",
    level: "advanced",
    gender: "female",
  },
  {
    id: "4",
    title: "Photography",
    provider: "David Brown",
    category: "Creative",
    rating: 5.0,
    reviews: 203,
    location: "Los Angeles, CA",
    price: "$80/hr",
    description: "Professional photography for events, portraits, and commercial projects",
    ageGroup: "50+",
    level: "beginner",
    gender: "male",
  },
  {
    id: "5",
    title: "Language Tutoring",
    provider: "Maria Garcia",
    category: "Education",
    rating: 4.9,
    reviews: 94,
    location: "Miami, FL",
    price: "$35/hr",
    description: "Spanish and English tutoring for all levels with personalized approach",
    ageGroup: "18-25",
    level: "beginner",
    gender: "female",
  },
  {
    id: "6",
    title: "Music Lessons",
    provider: "James Taylor",
    category: "Arts",
    rating: 4.6,
    reviews: 71,
    location: "Nashville, TN",
    price: "$40/hr",
    description: "Guitar and piano lessons for beginners to advanced students",
    ageGroup: "26-35",
    level: "intermediate",
    gender: "male",
  },
];
 const [filteredSkills, setFilteredSkills] = useState(mockSkills);
const categories = ["All", "Technology", "Design", "Marketing", "Creative", "Education", "Arts"];

// Success stories data Explore page
const successStories = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Web Developer Intern",
    story: "I learned web development here and landed my first internship within 3 months.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Data Scientist",
    story: "Thanks to SkillNet, I connected with mentors who guided me into a career in data science.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Meera Patel",
    role: "UI/UX Designer",
    story: "Shared my design skills, collaborated on projects, and built my portfolio!",
    image: "https://via.placeholder.com/150",
  },
];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");



  const applyFilters = () => {
  let filtered = mockSkills;

  // Category filter
  if (selectedCategory !== "All") {
    filtered = filtered.filter(skill => skill.category === selectedCategory);
  }

  // Keyword filter
  if (keywordFilter) {
    filtered = filtered.filter(skill =>
      skill.title.toLowerCase().includes(keywordFilter.toLowerCase()) ||
      skill.description.toLowerCase().includes(keywordFilter.toLowerCase())
    );
  }

  // Location filter
  if (locationQuery) {
    filtered = filtered.filter(skill =>
      skill.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
  }

  // Budget filter
  if (budget) {
    filtered = filtered.filter(skill => {
      const price = parseInt(skill.price.replace(/\D/g, ""), 10); // extract number
      const [min, max] = budget.split("-").map(Number);
      if (max) return price >= min && price <= max;
      return price >= min; // for 75+
    });
  }

  // Skill level filter (if your data has a `level` field)
  if (skillLevel) {
    filtered = filtered.filter(skill => skill.level === skillLevel);
  }

  // Age & Gender filters (if your data has those fields)
  if (ageGroup) {
    filtered = filtered.filter(skill => skill.ageGroup === ageGroup);
  }
  if (gender) {
    filtered = filtered.filter(skill => skill.gender === gender);
  }

  setFilteredSkills(filtered);
};


  function scrollToExplore(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-background">
<Navbar
  activeSection={activeSection}
  heroRef={heroRef}
  exploreRef={exploreRef}
/>


      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-5xl font-bold md:text-6xl"
          >
            Discover <span className="text-gradient">Skills</span> Near You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-xl text-muted-foreground"
          >
            Connect with talented professionals and share your expertise
          </motion.p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-2xl mb-4">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for skills, services, or people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-4 text-lg"
            />
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            👉 <Link to="/login" className="text-primary hover:underline font-medium">Try demo login</Link> to explore all features
          </p>

       <Button onClick={() => navigate("/about")}>
      Know More About Us 🌟
    </Button>
        </div>
      </section>

      {/* Filters */}
   <section className="border-b border-border py-6">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Category Buttons */}
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>

    {/* Basic Filters */}
    <div className="flex flex-wrap gap-2 items-center">
     

      <Button variant="outline" size="sm" onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}>
        <Filter className="mr-2 h-4 w-4" />
        More Filters
      </Button>
    </div>
  </div>

  {/* Pop-out Panel */}
  {moreFiltersOpen && (
    <div className="mt-4 container mx-auto px-4 p-4 bg-[#1a1a1a] rounded-lg shadow-lg flex flex-wrap gap-4">
      <select
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
        className="h-10 rounded border border-border px-2 bg-background text-white"
      >
        <option value="">Any Skill Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
 <Input
        type="text"
        placeholder="Enter location"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        className="h-10 w-48"
      />

      <select
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value)}
        className="h-10 rounded border border-border px-2 bg-background text-white"
      >
        <option value="">All Ages</option>
        <option value="18-25">18-25</option>
        <option value="26-35">26-35</option>
        <option value="36-50">36-50</option>
        <option value="50+">50+</option>
      </select>

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="h-10 rounded border border-border px-2 bg-background text-white"
      >
        <option value="">Any Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <select
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="h-10 rounded border border-border px-2 bg-background text-white"
      >
        <option value="">Any Budget</option>
        <option value="0-25">$0 - $25/hr</option>
        <option value="26-50">$26 - $50/hr</option>
        <option value="51-75">$51 - $75/hr</option>
        <option value="75+">$75+/hr</option>
      </select>
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keywordFilter}
        onChange={(e) => setKeywordFilter(e.target.value)}
        className="h-10 w-48"
      />

      <Input
        type="text"
        placeholder="Enter location"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        className="h-10 w-48"
      />

      <Button variant="default" onClick={() => applyFilters()}>
        Apply
      </Button>
    </div>
  )}
</section>

      {/* Skills Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            {filteredSkills.length} Skills Available
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill, index) => (
           <Link key={skill.id} to={`/user-profile-demo/${skill.id}`}>
          <SkillCard {...skill} />
        </Link>
            ))}
          </div>
          {filteredSkills.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground">
                No skills found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Explore Section / Success Stories */}
      <div ref={exploreRef}>
  <section className="min-h-screen bg-[#121212] text-white">
    <section className="text-center py-12 px-6 bg-[#0d6efd]">
      <h1 className="text-4xl font-bold mb-3">🌟 Explore Success Stories</h1>
      <p className="text-lg text-gray-100 max-w-2xl mx-auto">
        Discover how learners and professionals have grown with SkillNet. Be inspired, share knowledge, and start your own journey!
      </p>
    </section>

          <section className="p-8">
            <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-8 text-center max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Featured Story</h2>
              <p className="text-gray-300 italic mb-6">
                "SkillNet helped me gain confidence and practical skills. I was able to switch careers into tech within a year!"
              </p>
              <p className="font-semibold">— Priya Verma, Software Engineer</p>
            </div>
          </section>

          <section className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Community Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
                >
                  {story.image && (
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#0d6efd]"
                    />
                  )}
                  <h3 className="text-xl font-semibold">{story.name}</h3>
                  {story.role && <p className="text-sm text-gray-400">{story.role}</p>}
                  <p className="text-gray-300 mt-3">{story.story}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center py-12 px-6">
            <h2 className="text-2xl font-bold mb-4">✨ Want to Share Your Story?</h2>
            <p className="text-gray-300 mb-6">
              Join the SkillNet community and inspire others with your journey.
            </p>
            <Button className="bg-[#0d6efd] text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
              Share Your Success
            </Button>
          </section>
        </section>
      </div>
      <FeaturedProjects />
      <TechnicalGroups />
      <Footer />
    </div>
  );
};

export default Home;
