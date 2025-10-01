// src/components/TechnicalGroups.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterDropdown, FilterState } from "./FilterDropdown";

export interface TechGroup {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
}

const allGroups: TechGroup[] = [
  { id: "1", title: "React Developers", description: "React tips, projects, and discussions", category: "Frontend", link: "https://linkedin.com/groups/1" },
  { id: "2", title: "Node.js Enthusiasts", description: "Node.js backend development group", category: "Backend", link: "https://linkedin.com/groups/2" },
  { id: "3", title: "AI & ML Innovators", description: "Discussions on AI and ML technologies", category: "AI", link: "https://linkedin.com/groups/3" },
  { id: "4", title: "IoT Builders", description: "Internet of Things projects and discussions", category: "IoT", link: "https://linkedin.com/groups/4" },
  { id: "5", title: "Python Programmers", description: "Python programming discussions", category: "Backend", link: "https://linkedin.com/groups/5" },
  { id: "6", title: "Cloud & DevOps", description: "DevOps practices and cloud infrastructure", category: "DevOps", link: "https://linkedin.com/groups/6" },
  { id: "7", title: "JavaScript Masters", description: "JS libraries, frameworks, and advanced techniques", category: "Frontend", link: "https://linkedin.com/groups/7" },
  { id: "8", title: "Data Science Hub", description: "Data analysis, machine learning, and visualization", category: "AI", link: "https://linkedin.com/groups/8" },
  { id: "9", title: "Cybersecurity Experts", description: "Security best practices, ethical hacking & discussion", category: "Security", link: "https://linkedin.com/groups/9" },
];

export const TechnicalGroups: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    technologies: [],
    domains: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredGroups = allGroups.filter((group) => {
    const matchesSearch =
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(group.category);

    return matchesSearch && matchesCategory;
  });

  const initialDisplayCount = 6;
  const displayedGroups = showAll ? filteredGroups : filteredGroups.slice(0, initialDisplayCount);

  const toggleView = () => setShowAll(!showAll);

  return (
    <section className="py-12 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6">💬 Technical Groups & Discussions</h2>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-12 px-4 rounded-lg bg-[#1f1f2a] text-white placeholder:text-gray-400 focus:outline-none border border-blue-700"
          />
          <FilterDropdown onFilterChange={setFilters} />
        </div>

        {/* Groups Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedGroups.map((group) => (
            <a
              key={group.id}
              href={group.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-b from-blue-900 to-[#1a1a1a] rounded-xl p-6 hover:from-blue-700 hover:to-[#222222] transition flex flex-col h-full"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{group.title}</h3>
              <p className="text-gray-300 text-sm flex-grow">{group.description}</p>
              <span className="mt-3 text-blue-400 text-sm font-medium">Visit Group →</span>
            </a>
          ))}
        </div>

        {/* View More / View Less Button */}
        {filteredGroups.length > initialDisplayCount && (
          <div className="mt-6 text-center">
            <Button onClick={toggleView}>
              {showAll ? "View Less" : "View More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
