'use client';

import { X } from 'lucide-react';
import { Status, Source } from '@/types/application';
import { statuses } from '@/constants/statuses';

const sources: Source[] = [
  'LinkedIn',
  'Internshala',
  'Company Website',
  'Referral',
  'Cold Email',
  'Other',
];

interface FilterBarProps {
  selectedStatuses: string[];
  selectedSources: string[];
  sortBy: string;
  onStatusChange: (statuses: string[]) => void;
  onSourceChange: (sources: string[]) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  selectedStatuses,
  selectedSources,
  sortBy,
  onStatusChange,
  onSourceChange,
  onSortChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters =
    selectedStatuses.length > 0 || selectedSources.length > 0 || sortBy !== 'latest';

  const toggleStatus = (status: string) => {
    onStatusChange(
      selectedStatuses.includes(status)
        ? selectedStatuses.filter((s) => s !== status)
        : [...selectedStatuses, status]
    );
  };

  const toggleSource = (source: string) => {
    onSourceChange(
      selectedSources.includes(source)
        ? selectedSources.filter((s) => s !== source)
        : [...selectedSources, source]
    );
  };

  return (
    <div className="space-y-3">
      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Status:</span>
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => toggleStatus(status.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedStatuses.includes(status.value)
                ? 'bg-primary text-primary-foreground'
                : 'border bg-background text-muted-foreground hover:bg-muted'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Source filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Source:</span>
        {sources.map((source) => (
          <button
            key={source}
            onClick={() => toggleSource(source)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedSources.includes(source)
                ? 'bg-primary text-primary-foreground'
                : 'border bg-background text-muted-foreground hover:bg-muted'
            }`}
          >
            {source}
          </button>
        ))}
      </div>

      {/* Sort + Clear */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="latest">Latest Applied</option>
          <option value="oldest">Oldest Applied</option>
          <option value="company-asc">Company A–Z</option>
          <option value="company-desc">Company Z–A</option>
          <option value="updated">Recently Updated</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
