export function getDaysSince(dateString: string): number {
  const appliedDate = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - appliedDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function getRelativeDateText(dateString: string): string {
  const days = getDaysSince(dateString);
  
  if (days === 0) {
    return 'Applied today';
  }
  if (days === 1) {
    return 'Applied yesterday';
  }
  if (days < 7) {
    return `Applied ${days} days ago`;
  }
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `Applied ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (days < 60) {
    const months = Math.floor(days / 30);
    return `Applied ${months} month${months > 1 ? 's' : ''} ago`;
  }
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
