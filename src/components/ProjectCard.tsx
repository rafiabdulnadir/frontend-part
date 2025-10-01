// src/components/ProjectCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    githubLink: string;
  };
  layout?: "vertical" | "horizontal"; // horizontal = ProjectsPage
  size?: "normal" | "large"; // large = FeaturedProjects
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  layout = "vertical",
  size = "normal",
}) => {
  const navigate = useNavigate();
  const isHorizontal = layout === "horizontal";
  const isLarge = size === "large";

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className={`cursor-pointer bg-[#1a1a1a] hover:bg-[#222222] transition p-6 rounded-xl shadow-md flex ${
        isHorizontal
          ? "flex-row gap-6 items-start w-full"
          : "flex-col flex-shrink-0"
      }`}
      style={
        isHorizontal
          ? { minHeight: "150px" }
          : isLarge
          ? { minWidth: "380px", minHeight: "300px" }
          : { width: "280px", minHeight: "220px" }
      }
    >
      {/* Main Content */}
      <div className={`${isHorizontal ? "flex-1 flex flex-col" : "flex-1"}`}>
        <h3
          className={`text-white font-bold mb-3 ${
            isHorizontal ? "text-2xl" : isLarge ? "text-3xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-gray-300 mb-4 ${
            isHorizontal
              ? "text-base flex-1"
              : isLarge
              ? "text-lg flex-1"
              : "text-sm"
          }`}
        >
          {project.description}
        </p>
        <div className={`flex flex-wrap gap-3 ${isHorizontal ? "mt-auto" : ""}`}>
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* GitHub Link */}
      {isHorizontal && (
        <div className="flex items-start">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 font-semibold text-sm"
            onClick={(e) => e.stopPropagation()} // prevent card navigation
          >
            View Repo
          </a>
        </div>
      )}
    </div>
  );
};
