'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { toast } from 'react-hot-toast';
import { Header } from '@/components/Header';
import { StatsCards } from '@/components/StatsCards';
// import { ApplicationList } from '@/components/ApplicationList';
import { ApplicationForm } from '@/components/ApplicationForm';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Application } from '@/types/application';
import { getDemoData } from '@/constants/demoData';
import { ApplicationList } from '@/components/ApplicationList';
import { Analytics } from '@/components/Analytics';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    'interntrack-applications',
    []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Seed demo data on initial load if no data exists
  useEffect(() => {
    const stored = window.localStorage.getItem('interntrack-applications');
    if (!stored) {
      setApplications(getDemoData());
    }
  }, [setApplications]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select';

      if (e.key === 'a' && !e.ctrlKey && !e.metaKey && !isFormOpen && !isTyping) {
        e.preventDefault();
        setIsFormOpen(true);
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !isTyping) {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[data-testid="search-input"]'
        );
        searchInput?.focus();
      }
      if (e.key === 'Escape' && isFormOpen) {
        setIsFormOpen(false);
        setEditingApp(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen]);

  /** Fire confetti when an application reaches "Offer" status */
  const triggerOfferCelebration = useCallback(() => {
    setShowConfetti(true);
    toast.success('🎉 Congratulations on your offer!', { duration: 5000 });
    setTimeout(() => setShowConfetti(false), 6000);
  }, []);

  const addApplication = useCallback(
    (app: Application) => {
      setApplications((prev) => [app, ...prev]);
      setIsFormOpen(false);
      if (app.status === 'Offer') triggerOfferCelebration();
    },
    [setApplications, triggerOfferCelebration]
  );

  const updateApplication = useCallback(
    (updatedApp: Application) => {
      const prev = applications.find((a) => a.id === updatedApp.id);
      setApplications((all) =>
        all.map((a) =>
          a.id === updatedApp.id
            ? { ...updatedApp, lastUpdated: new Date().toISOString() }
            : a
        )
      );
      setIsFormOpen(false);
      setEditingApp(null);
      // Celebrate if status changed to Offer
      if (prev?.status !== 'Offer' && updatedApp.status === 'Offer') {
        triggerOfferCelebration();
      }
    },
    [applications, setApplications, triggerOfferCelebration]
  );

  const deleteApplication = useCallback(
    (id: string) => {
      setApplications((prev) => prev.filter((a) => a.id !== id));
      toast.success('Application deleted.');
    },
    [setApplications]
  );

  const handleEdit = useCallback((app: Application) => {
    setEditingApp(app);
    setIsFormOpen(true);
  }, []);

  const handleImport = useCallback(
    (imported: Application[]) => {
      // Deduplicate by id
      setApplications((prev) => {
        const existingIds = new Set(prev.map((a) => a.id));
        const unique = imported.filter((a) => !existingIds.has(a.id));
        return [...unique, ...prev];
      });
    },
    [setApplications]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Offer confetti 🎉 */}
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={400}
          gravity={0.25}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}

      <Header
        onAddClick={() => setIsFormOpen(true)}
        onAnalyticsClick={() => setIsAnalyticsOpen((v) => !v)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StatsCards applications={applications} />
        </motion.div>

        <AnimatePresence>
          {isAnalyticsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden"
            >
              <Analytics
                applications={applications}
                onClose={() => setIsAnalyticsOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <ApplicationList
            applications={applications}
            onEdit={handleEdit}
            onDelete={deleteApplication}
            onImport={handleImport}
            viewMode={viewMode}
            onAddClick={() => setIsFormOpen(true)}
          />
        </div>
      </main>

      <Footer />

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ApplicationForm
              isOpen={isFormOpen}
              onClose={() => {
                setIsFormOpen(false);
                setEditingApp(null);
              }}
              onSubmit={editingApp ? updateApplication : addApplication}
              application={editingApp}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
