// src/components/FeaturedProjects.tsx
import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { useNavigate } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { AddProjectForm, UserProject } from "./AddProjectForm"; // we'll create this

const sampleProjects: UserProject[] = [
  {
    id: "1",
    title: "Open Chat App",
    description: "Real-time chat app using React & Socket.io",
    techStack: ["React", "Node.js", "Socket.io"],
    githubLink: "https://github.com/user/open-chat-app"
  },
  {
    id: "2",
    title: "Weather Dashboard",
    description: "Modern weather dashboard using OpenWeather API",
    techStack: ["React", "Tailwind", "API"],
    githubLink: "https://github.com/user/weather-dashboard"
  },
  {
    id: "3",
    title: "Portfolio Builder",
    description: "Generate portfolio websites quickly using templates",
    techStack: ["React", "TypeScript", "CSS"],
    githubLink: "https://github.com/user/portfolio-builder"
  },
  {
    id: "4",
    title: "E-Library System",
    description: "Digital library with book search, categories, and user shelves",
    techStack: ["ASP.NET Core", "React", "SQL Server"],
    githubLink: "https://github.com/user/e-library-system"
  },
  {
    id: "5",
    title: "Task Manager Pro",
    description: "Kanban-style task manager with drag-and-drop support",
    techStack: ["React", "Redux", "Firebase"],
    githubLink: "https://github.com/user/task-manager-pro"
  },
  {
    id: "6",
    title: "AI Resume Analyzer",
    description: "Upload your resume and get AI-based job match insights",
    techStack: ["Python", "Flask", "OpenAI API"],
    githubLink: "https://github.com/user/ai-resume-analyzer"
  },
  {
    id: "7",
    title: "Fitness Tracker",
    description: "Track workouts, calories, and progress visually",
    techStack: ["React Native", "Express", "MongoDB"],
    githubLink: "https://github.com/user/fitness-tracker"
  },
  {
    id: "8",
    title: "EventHub",
    description: "Event management platform for organizers & participants",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    githubLink: "https://github.com/user/eventhub"
  }
];

export const FeaturedProjects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<UserProject[]>(sampleProjects);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProject = (project: UserProject) => {
    setProjects([project, ...projects]); // Add new project to the top
    setShowAddForm(false); // close the modal
  };

  return (
    <section className="py-12 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">💻 Featured Open Source Projects</h2>
          <Button onClick={() => setShowAddForm(true)}>+ Add New Project</Button>
        </div>

        {/* Add Project Form Modal */}
        {showAddForm && (
          <AddProjectForm onAddProject={handleAddProject} onClose={() => setShowAddForm(false)} />
        )}

        <div className="flex gap-6 overflow-x-auto py-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} size="large" />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button onClick={() => navigate("/projectspage")}>View All Projects 🌟</Button>
        </div>
      </div>
    </section>
  );
};
