import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { FilterDropdown, FilterState } from "@/components/FilterDropdown";
import { Navbar } from '@/components/Navbar';

// Mock data for projects
export const mockProjects = [
  {
    id: "1",
    title: "EduConnect Platform",
    description: "A comprehensive learning management system that connects students, teachers, and educational content in one unified platform.",
    category: "Frontend",
    technology: "React",
    domain: "EdTech",
    techStack: ["React", "Node.js", "MongoDB"],
    githubLink: "https://github.com/user/educonnect",
  },
  {
    id: "2",
    title: "AgriTech IoT Hub",
    description: "IoT-based solution for smart farming with real-time monitoring of soil moisture, temperature, and crop health analytics.",
    category: "IoT",
    technology: "Python",
    domain: "Agriculture",
    techStack: ["Python", "Raspberry Pi", "Sensors"],
    githubLink: "https://github.com/user/agritech-iot",
  },
  {
    id: "3",
    title: "HealthTrack AI",
    description: "AI-powered health monitoring application that provides personalized wellness insights and medical recommendations.",
    category: "AI",
    technology: "Python",
    domain: "Healthcare",
    techStack: ["Python", "TensorFlow", "Flask"],
    githubLink: "https://github.com/user/healthtrack-ai",
  },
  {
    id: "4",
    title: "FinanceFlow API",
    description: "Robust backend API for financial transactions, analytics, and reporting with enterprise-grade security.",
    category: "Backend",
    technology: "Node.js",
    domain: "Finance",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubLink: "https://github.com/user/financeflow-api",
  },
  {
    id: "5",
    title: "ShopEase Commerce",
    description: "Modern e-commerce platform with advanced features like AI recommendations and seamless payment integration.",
    category: "Frontend",
    technology: "React",
    domain: "E-commerce",
    techStack: ["React", "Redux", "Stripe API"],
    githubLink: "https://github.com/user/shopease-commerce",
  },
  {
    id: "6",
    title: "CloudSync Manager",
    description: "DevOps automation tool for managing cloud infrastructure, deployments, and monitoring across multiple platforms.",
    category: "DevOps",
    technology: "Python",
    domain: "Cloud",
    techStack: ["Python", "Docker", "AWS SDK"],
    githubLink: "https://github.com/user/cloudsync-manager",
  },
  {
    id: "7",
    title: "TaskMaster Pro",
    description: "A Kanban-style task manager with real-time collaboration and drag-and-drop functionality.",
    category: "Frontend",
    technology: "React",
    domain: "Productivity",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    githubLink: "https://github.com/user/taskmaster-pro",
  },
  {
    id: "8",
    title: "EventHub",
    description: "Event management platform for organizers and participants, featuring ticketing and schedule tracking.",
    category: "Backend",
    technology: "Node.js",
    domain: "Social",
    techStack: ["Node.js", "Express", "PostgreSQL"],
    githubLink: "https://github.com/user/eventhub",
  },
];


const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    technologies: [],
    domains: [],
  });

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(project.category);

    const matchesTechnology =
      filters.technologies.length === 0 || filters.technologies.includes(project.technology);

    const matchesDomain =
      filters.domains.length === 0 || filters.domains.includes(project.domain);

    return matchesSearch && matchesCategory && matchesTechnology && matchesDomain;
  });

  return (
      <div className="min-h-screen bg-background">
          <Navbar />
   <div className="min-h-screen bg-[#121212]">
  {/* Hero Section */}
  <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
    {/* Subtle glowing blobs */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-[#0d6efd]">SkillNet</span>
          <span className="text-white">: Empowering Global Talent</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
Contribute to open source, sharpen your skills, and collaborate with a global community of innovators.        </p>

            {/* Search Bar + Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-[#1a1a1a]/95 border border-gray-700 text-white placeholder:text-gray-500 text-lg"
                />
              </div>

              <FilterDropdown onFilterChange={setFilters} />
            </div>
          </div>
        </div>


      </section>

      {/* Projects Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"} Found
          </h2>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} layout="horizontal" />

            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400">No projects match your search criteria</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
          </div>
        )}
      </section>
    </div> 
    </div>
  );
};

export default ProjectsPage;
