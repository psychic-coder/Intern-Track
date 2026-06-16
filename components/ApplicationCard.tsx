'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Edit2, Trash2, MapPin, Calendar } from 'lucide-react';
import { Application } from '@/types/application';
import { getStatusBadgeClass } from '@/utils/status';
import { getRelativeDateText } from '@/utils/date';

interface ApplicationCardProps {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  const handleOpenLink = () => {
    if (application.applicationLink) {
      window.open(application.applicationLink, 'blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{application.company}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(application.status)}`}>
              {application.status}
            </span>
          </div>
          
          <p className="mt-1 text-sm text-muted-foreground">{application.role}</p>
          
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {application.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{application.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{getRelativeDateText(application.appliedDate)}</span>
            </div>
            <span className="rounded bg-muted px-2 py-0.5 text-xs">
              {application.source}
            </span>
          </div>

          {application.notes && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {application.notes}
            </p>
          )}

          {application.salary && (
            <p className="mt-2 text-sm font-medium">
              💰 {application.salary}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(application)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Edit application"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
            aria-label="Delete application"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleOpenLink}
            disabled={!application.applicationLink}
            className={`rounded-lg p-2 transition-colors ${
              application.applicationLink
                ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                : 'cursor-not-allowed text-muted-foreground/50'
            }`}
            aria-label="Open application link"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
