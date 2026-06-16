'use client';

import { X } from 'lucide-react';
import { Application } from '@/types/application';
import { statuses } from '@/constants/statuses';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsProps {
  applications: Application[];
  onClose: () => void;
}

const COLORS = ['#6366f1', '#8b5cf6', '#f59e0b', '#ef4444', '#22c55e'];

export function Analytics({ applications, onClose }: AnalyticsProps) {
  // Applications by Status
  const byStatus = statuses.map((s) => ({
    name: s.label,
    count: applications.filter((a) => a.status === s.value).length,
  }));

  // Applications by Source
  const sourceMap: Record<string, number> = {};
  applications.forEach((a) => {
    sourceMap[a.source] = (sourceMap[a.source] || 0) + 1;
  });
  const bySource = Object.entries(sourceMap).map(([name, count]) => ({ name, count }));

  // Applications Over Time (last 30 days, grouped by date)
  const now = new Date();
  const last30: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    last30[key] = 0;
  }
  applications.forEach((a) => {
    const d = new Date(a.appliedDate);
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 29) {
      const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (key in last30) last30[key] = (last30[key] || 0) + 1;
    }
  });
  const overTime = Object.entries(last30).map(([date, count]) => ({ date, count }));

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="Close analytics"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Bar Chart – Applications by Status */}
        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">Applications by Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={byStatus} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {byStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart – Applications by Source */}
        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">Applications by Source</h3>
          {bySource.length === 0 ? (
            <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={bySource}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {bySource.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Line Chart – Applications Over Time */}
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Applications Over the Last 30 Days
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={overTime} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                interval={4}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
