import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";

// Filter state type
export interface FilterState {
  categories: string[];
  technologies: string[];
  domains: string[];
}

// Update props to use onFilterChange
interface FilterDropdownProps {
  onFilterChange: (filters: FilterState) => void;
}

// Options
const categories = ["Frontend", "Backend", "IoT", "AI", "Mobile", "DevOps"];
const technologies = ["React", "Node.js", "Python", "ASP.NET", "Django", "Flutter"];
const domains = ["EdTech", "Finance", "Agriculture", "Healthcare", "E-commerce", "Social"];

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    technologies: [],
    domains: [],
  });

  // Toggle items in a list
  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter(i => i !== item) : [...list, item];

  const handleCheckboxChange = (type: keyof FilterState, value: string) => {
    const updatedFilters = { ...filters, [type]: toggleItem(filters[type], value) };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Call parent callback immediately
  };

  const clearFilters = () => {
    const empty = { categories: [], technologies: [], domains: [] };
    setFilters(empty);
    onFilterChange(empty); // Notify parent
  };

  const activeFilterCount =
    filters.categories.length + filters.technologies.length + filters.domains.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="border-border hover:border-primary hover:bg-primary/10 transition-all relative"
        >
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 bg-popover border-border max-h-[500px] overflow-y-auto p-4 flex flex-col gap-4">
        {/* Categories */}
        <div>
          <DropdownMenuLabel className="text-foreground font-semibold">Categories</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          {categories.map(category => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={filters.categories.includes(category)}
              onCheckedChange={() => handleCheckboxChange("categories", category)}
              className="text-foreground hover:bg-accent"
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </div>

        {/* Technologies */}
        <div>
          <DropdownMenuLabel className="text-foreground font-semibold">Technologies</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          {technologies.map(tech => (
            <DropdownMenuCheckboxItem
              key={tech}
              checked={filters.technologies.includes(tech)}
              onCheckedChange={() => handleCheckboxChange("technologies", tech)}
              className="text-foreground hover:bg-accent"
            >
              {tech}
            </DropdownMenuCheckboxItem>
          ))}
        </div>

        {/* Domains */}
        <div>
          <DropdownMenuLabel className="text-foreground font-semibold">Domains</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          {domains.map(domain => (
            <DropdownMenuCheckboxItem
              key={domain}
              checked={filters.domains.includes(domain)}
              onCheckedChange={() => handleCheckboxChange("domains", domain)}
              className="text-foreground hover:bg-accent"
            >
              {domain}
            </DropdownMenuCheckboxItem>
          ))}
        </div>

        {/* Clear button */}
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
