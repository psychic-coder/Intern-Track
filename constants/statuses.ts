import { Status } from '@/types/application';

export const statuses: { value: Status; label: string; color: string }[] = [
  { value: 'Applied', label: 'Applied', color: 'bg-blue-500' },
  { value: 'OA Received', label: 'OA Received', color: 'bg-purple-500' },
  { value: 'Interview Scheduled', label: 'Interview Scheduled', color: 'bg-amber-500' },
  { value: 'Rejected', label: 'Rejected', color: 'bg-red-500' },
  { value: 'Offer', label: 'Offer', color: 'bg-green-500' },
];

export const getStatusColor = (status: Status): string => {
  const statusObj = statuses.find((s) => s.value === status);
  return statusObj?.color || 'bg-gray-500';
};

export const getStatusBgColor = (status: Status): string => {
  switch (status) {
    case 'Applied':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'OA Received':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'Interview Scheduled':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
    case 'Rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'Offer':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};
