'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Application, Status } from '@/types/application';
import { ApplicationCard } from './ApplicationCard';
import { statuses } from '@/constants/statuses';
import { getStatusBadgeClass } from '@/utils/status';

interface KanbanBoardProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

/**
 * Kanban board that groups applications by status.
 * Drag-and-drop updates the application status via onEdit.
 */
export function KanbanBoard({ applications, onEdit, onDelete }: KanbanBoardProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Status | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, status: Status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, newStatus: Status) => {
      e.preventDefault();
      if (!draggingId) return;
      const app = applications.find((a) => a.id === draggingId);
      if (app && app.status !== newStatus) {
        onEdit({ ...app, status: newStatus, lastUpdated: new Date().toISOString() });
      }
      setDraggingId(null);
      setDragOverColumn(null);
    },
    [draggingId, applications, onEdit]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverColumn(null);
  }, []);

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: `${statuses.length * 280}px` }}>
        {statuses.map((col) => {
          const colApps = applications.filter((a) => a.status === col.value);
          const isOver = dragOverColumn === col.value;
          return (
            <div
              key={col.value}
              className={`flex w-64 flex-shrink-0 flex-col rounded-xl border transition-colors ${
                isOver ? 'border-primary bg-primary/5' : 'bg-card'
              }`}
              onDragOver={(e) => handleDragOver(e, col.value)}
              onDrop={(e) => handleDrop(e, col.value)}
              onDragLeave={() => setDragOverColumn(null)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between rounded-t-xl border-b p-3">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <span className="text-sm font-medium">{col.label}</span>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {colApps.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-1 flex-col gap-2 p-2" style={{ minHeight: '200px' }}>
                <AnimatePresence mode="popLayout">
                  {colApps.map((app) => (
                    <motion.div
                      key={app.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, app.id)}
                      onDragEnd={handleDragEnd}
                      className={`cursor-grab select-none rounded-lg border bg-background p-3 shadow-sm active:cursor-grabbing ${
                        draggingId === app.id ? 'opacity-40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-sm font-semibold leading-tight">{app.company}</p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(app.status)}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{app.role}</p>
                      {app.location && (
                        <p className="mt-1 text-xs text-muted-foreground">📍 {app.location}</p>
                      )}
                      <div className="mt-3 flex justify-end gap-1">
                        <button
                          onClick={() => onEdit(app)}
                          className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(app.id)}
                          className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colApps.length === 0 && (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
                    <p className="text-xs text-muted-foreground">Drop here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
