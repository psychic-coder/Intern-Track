'use client';

import { motion } from 'framer-motion';
import { Briefcase, SearchX } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-applications' | 'no-results';
  onAddClick?: () => void;
}

export function EmptyState({ type, onAddClick }: EmptyStateProps) {
  if (type === 'no-results') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card py-20 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No matching applications found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search or filter criteria.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card py-24 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
        <Briefcase className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">No applications yet</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Start tracking your internships. Add your first application to get started.
      </p>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add Your First Application
        </button>
      )}
    </motion.div>
  );
}
