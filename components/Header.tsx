'use client';

import { motion } from 'framer-motion';
import { Plus, BarChart3, Grid, List } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onAddClick: () => void;
  onAnalyticsClick: () => void;
  viewMode: 'list' | 'kanban';
  onViewModeChange: (mode: 'list' | 'kanban') => void;
}

export function Header({
  onAddClick,
  onAnalyticsClick,
  viewMode,
  onViewModeChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-xl font-bold">I</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">InternTrack</h1>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Track every internship application
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {/* View mode toggle */}
            <div className="flex items-center gap-1 rounded-lg border p-1">
              <button
                onClick={() => onViewModeChange('list')}
                className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
                <span className="hidden text-sm sm:inline">List</span>
              </button>
              <button
                onClick={() => onViewModeChange('kanban')}
                className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                aria-label="Kanban view"
              >
                <Grid className="h-4 w-4" />
                <span className="hidden text-sm sm:inline">Kanban</span>
              </button>
            </div>

            <button
              onClick={onAnalyticsClick}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              aria-label="View analytics"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </button>

            <ThemeToggle />

            <button
              onClick={onAddClick}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Add application"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
