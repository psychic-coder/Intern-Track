'use client';

import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Application } from '@/types/application';
import { ApplicationCard } from './ApplicationCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { EmptyState } from './EmptyState';
import { ExportButton } from './ExportButton';
import { useDebounce } from '@/hooks/useDebounce';
import { KanbanBoard } from './KanbanBoard';

interface ApplicationListProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
  onImport: (apps: Application[]) => void;
  viewMode: 'list' | 'kanban';
  onAddClick?: () => void;
}

export function ApplicationList({
  applications,
  onEdit,
  onDelete,
  onImport,
  viewMode,
  onAddClick,
}: ApplicationListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'company-asc' | 'company-desc' | 'updated'>('latest');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filtered = useMemo(() => {
    let result = [...applications];

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.role.toLowerCase().includes(q) ||
          app.location.toLowerCase().includes(q) ||
          app.source.toLowerCase().includes(q) ||
          app.notes.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      result = result.filter((app) => selectedStatuses.includes(app.status));
    }

    // Source filter
    if (selectedSources.length > 0) {
      result = result.filter((app) => selectedSources.includes(app.source));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'oldest':
          return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
        case 'company-asc':
          return a.company.localeCompare(b.company);
        case 'company-desc':
          return b.company.localeCompare(a.company);
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [applications, debouncedSearch, selectedStatuses, selectedSources, sortBy]);

  const handleClearFilters = useCallback(() => {
    setSelectedStatuses([]);
    setSelectedSources([]);
    setSortBy('latest');
    setSearchQuery('');
  }, []);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ExportButton applications={applications} onImport={onImport} />
      </div>

      <FilterBar
        selectedStatuses={selectedStatuses}
        selectedSources={selectedSources}
        sortBy={sortBy}
        onStatusChange={setSelectedStatuses}
        onSourceChange={setSelectedSources}
        onSortChange={(s) => setSortBy(s as typeof sortBy)}
        onClearFilters={handleClearFilters}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {applications.length} application
          {applications.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Content */}
      {applications.length === 0 ? (
        <EmptyState type="no-applications" onAddClick={onAddClick} />
      ) : filtered.length === 0 ? (
        <EmptyState type="no-results" />
      ) : viewMode === 'kanban' ? (
        <KanbanBoard applications={filtered} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
