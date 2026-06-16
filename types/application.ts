export type Status =
  | 'Applied'
  | 'OA Received'
  | 'Interview Scheduled'
  | 'Rejected'
  | 'Offer';

export type Source =
  | 'LinkedIn'
  | 'Internshala'
  | 'Company Website'
  | 'Referral'
  | 'Cold Email'
  | 'Other';

export interface Application {
  id: string;
  company: string;
  role: string;
  applicationLink: string;
  location: string;
  appliedDate: string;
  status: Status;
  notes: string;
  salary?: string;
  source: Source;
  lastUpdated: string;
}
