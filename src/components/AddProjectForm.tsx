// src/components/AddProjectForm.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface UserProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
}

interface AddProjectFormProps {
  onAddProject: (project: UserProject) => void;
  onClose: () => void;
}

export const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState(""); // comma separated
  const [githubLink, setGithubLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !githubLink) {
      alert("Please fill all required fields!");
      return;
    }

    const newProject: UserProject = {
      id: Date.now().toString(), // simple unique ID
      title,
      description,
      techStack: techStack.split(",").map((t) => t.trim()).filter((t) => t !== ""),
      githubLink,
    };

    onAddProject(newProject);

    // Reset form
    setTitle("");
    setDescription("");
    setTechStack("");
    setGithubLink("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-[#222] text-white border border-gray-700"
            required
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-[#222] text-white border border-gray-700"
            required
          />
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="p-2 rounded bg-[#222] text-white border border-gray-700"
          />
          <input
            type="url"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="p-2 rounded bg-[#222] text-white border border-gray-700"
            required
          />

          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              Add Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
