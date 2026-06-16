import { Application } from '@/types/application';

export function exportToCSV(applications: Application[]): string {
  const headers = ['Company', 'Role', 'Status', 'Source', 'Date', 'Location', 'Salary', 'Notes', 'Application Link'];
  
  const rows = applications.map((app) => [
    app.company,
    app.role,
    app.status,
    app.source,
    app.appliedDate,
    app.location,
    app.salary || '',
    app.notes,
    app.applicationLink,
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) => {
          const escaped = cell?.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    ),
  ].join('\n');
  
  return csvContent;
}

export function downloadCSV(applications: Application[]): void {
  const csvContent = exportToCSV(applications);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'interntrack.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

export function parseCSV(csvText: string): Partial<Application>[] {
  const lines = csvText.split('\n').filter((line) => line.trim());
  const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim());
  
  const applications: Partial<Application>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/(".*"?|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const app: Partial<Application> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.replace(/"/g, '').trim();
      
      switch (header.toLowerCase()) {
        case 'company':
          app.company = value;
          break;
        case 'role':
          app.role = value;
          break;
        case 'status':
          app.status = value as Application['status'];
          break;
        case 'source':
          app.source = value as Application['source'];
          break;
        case 'date':
          app.appliedDate = value;
          break;
        case 'location':
          app.location = value;
          break;
        case 'salary':
          app.salary = value;
          break;
        case 'notes':
          app.notes = value;
          break;
        case 'application link':
          app.applicationLink = value;
          break;
      }
    });
    
    if (app.company && app.role) {
      applications.push(app);
    }
  }
  
  return applications;
}
