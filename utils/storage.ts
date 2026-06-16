import { Application } from '@/types/application';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function validateApplication(app: Partial<Application>): boolean {
  return !!(app.company && app.role && app.appliedDate && app.status);
}

export function sanitizeApplication(app: Partial<Application>): Application {
  return {
    id: app.id || generateId(),
    company: app.company || '',
    role: app.role || '',
    applicationLink: app.applicationLink || '',
    location: app.location || '',
    appliedDate: app.appliedDate || '',
    status: app.status || 'Applied',
    notes: app.notes || '',
    salary: app.salary || '',
    source: app.source || 'Other',
    lastUpdated: app.lastUpdated || new Date().toISOString(),
  };
}
