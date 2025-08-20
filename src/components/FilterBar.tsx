import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  certificates: { platform: string; field: string; tags: string[] }[];
}

export function FilterBar({ onSearch, onFilterChange, certificates }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique filter options from certificates
  const platforms = [...new Set(certificates.map(cert => cert.platform))];
  const fields = [...new Set(certificates.map(cert => cert.field))];
  const allTags = [...new Set(certificates.flatMap(cert => cert.tags))];

  const filterCategories = [
    { name: "Platform", options: platforms },
    { name: "Field", options: fields },
    { name: "Technology", options: allTags }
  ];

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  useEffect(() => {
    onFilterChange(activeFilters);
  }, [activeFilters, onFilterChange]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search certificates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilters.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {activeFilters.map(filter => (
            <Badge
              key={filter}
              variant="default"
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs h-6"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Filter Options */}
      {showFilters && (
        <div className="card-minimal rounded-lg p-6 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-6">
            {filterCategories.map(category => (
              <div key={category.name}>
                <h3 className="font-medium text-primary mb-3">{category.name}</h3>
                <div className="space-y-2">
                  {category.options.map(option => (
                    <Button
                      key={option}
                      variant={activeFilters.includes(option) ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleFilter(option)}
                      className="w-full justify-start text-left"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}