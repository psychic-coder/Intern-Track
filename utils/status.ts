import { Status } from '@/types/application';
import { statuses } from '@/constants/statuses';

export function getStatusLabel(status: Status): string {
  return statuses.find((s) => s.value === status)?.label || status;
}

export function getStatusColorClass(status: Status): string {
  switch (status) {
    case 'Applied':
      return 'bg-blue-500';
    case 'OA Received':
      return 'bg-purple-500';
    case 'Interview Scheduled':
      return 'bg-amber-500';
    case 'Rejected':
      return 'bg-red-500';
    case 'Offer':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function getStatusBadgeClass(status: Status): string {
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
}
