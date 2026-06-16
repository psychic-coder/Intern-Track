'use client';

import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, XCircle, Clock, Star } from 'lucide-react';
import { Application } from '@/types/application';

interface StatsCardsProps {
  applications: Application[];
}

export function StatsCards({ applications }: StatsCardsProps) {
  const total = applications.length;
  const applied = applications.filter((a) => a.status === 'Applied').length;
  const oaReceived = applications.filter((a) => a.status === 'OA Received').length;
  const interviewScheduled = applications.filter((a) => a.status === 'Interview Scheduled').length;
  const rejected = applications.filter((a) => a.status === 'Rejected').length;
  const offers = applications.filter((a) => a.status === 'Offer').length;
  
  const pending = applied + oaReceived + interviewScheduled;
  const offerRate = total > 0 ? (offers / total) * 100 : 0;
  const interviewRate = total > 0 ? ((interviewScheduled + offers) / total) * 100 : 0;
  const rejectionRate = total > 0 ? (rejected / total) * 100 : 0;

  const cards = [
    {
      label: 'Total Applications',
      value: total,
      icon: Briefcase,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      delay: 0,
    },
    {
      label: 'Applied',
      value: applied,
      icon: Clock,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      delay: 0.1,
    },
    {
      label: 'OA Received',
      value: oaReceived,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      delay: 0.2,
    },
    {
      label: 'Interviews',
      value: interviewScheduled,
      icon: CheckCircle,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      delay: 0.3,
    },
    {
      label: 'Rejected',
      value: rejected,
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      delay: 0.4,
    },
    {
      label: 'Offers',
      value: offers,
      icon: Star,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      delay: 0.5,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: card.delay }}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="rounded-xl border bg-card p-6 shadow-sm sm:col-span-2 lg:col-span-1"
      >
        <h3 className="text-sm font-medium text-muted-foreground">Pending Applications</h3>
        <p className="mt-2 text-2xl font-bold">{pending}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Applied + OA + Interviews
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="rounded-xl border bg-card p-6 shadow-sm"
      >
        <h3 className="text-sm font-medium text-muted-foreground">Offer Rate</h3>
        <p className="mt-2 text-2xl font-bold">{offerRate.toFixed(1)}%</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {offers} offers from {total} applications
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="rounded-xl border bg-card p-6 shadow-sm"
      >
        <h3 className="text-sm font-medium text-muted-foreground">Interview Rate</h3>
        <p className="mt-2 text-2xl font-bold">{interviewRate.toFixed(1)}%</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Interviews + Offers
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="rounded-xl border bg-card p-6 shadow-sm"
      >
        <h3 className="text-sm font-medium text-muted-foreground">Rejection Rate</h3>
        <p className="mt-2 text-2xl font-bold">{rejectionRate.toFixed(1)}%</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {rejected} rejections from {total} applications
        </p>
      </motion.div>
    </div>
  );
}
