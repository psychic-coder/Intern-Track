'use client';

import { ExternalLink, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="container mx-auto px-4 py-10">
        {/* About This Project */}
        <div className="mb-8 rounded-xl border bg-background p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            About This Project
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This application was built to solve a real problem I personally faced while applying to
            numerous internships and struggling to track applications across different platforms.
            InternTrack brings everything together in one clean, fast, and intuitive dashboard.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="text-sm font-medium">Rohit Ganguly</p>
            <a
              href="mailto:rohitganguly@example.com"
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" />
              rohitganguly@example.com
            </a>
          </div>

          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
          >
            Built for Digital Heroes
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} InternTrack · All data stored locally in your browser.
        </p>
      </div>
    </footer>
  );
}
