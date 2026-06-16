'use client';

import { Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Application } from '@/types/application';
import { downloadCSV, parseCSV } from '@/utils/csv';
import { sanitizeApplication } from '@/utils/storage';

interface ExportButtonProps {
  applications: Application[];
  onImport: (apps: Application[]) => void;
}

export function ExportButton({ applications, onImport }: ExportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (applications.length === 0) {
      toast.error('No applications to export.');
      return;
    }
    downloadCSV(applications);
    toast.success(`Exported ${applications.length} applications.`);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseCSV(text);
        if (parsed.length === 0) {
          toast.error('No valid rows found in the CSV.');
          return;
        }
        const sanitized = parsed.map((p) => sanitizeApplication(p));
        onImport(sanitized);
        toast.success(`Imported ${sanitized.length} applications successfully!`);
      } catch {
        toast.error('Failed to parse CSV. Please check the file format.');
      } finally {
        // Reset input so same file can be imported again
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
        aria-label="Export CSV"
      >
        <Download className="h-4 w-4" />
        <span className="hidden sm:inline">Export CSV</span>
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
        aria-label="Import CSV"
      >
        <Upload className="h-4 w-4" />
        <span className="hidden sm:inline">Import CSV</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleImport}
        className="hidden"
        aria-label="Import CSV file"
      />
    </div>
  );
}
