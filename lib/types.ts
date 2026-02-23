export type Genre = 'Drama' | 'Action' | 'Romance' | 'Thriller' | 'Comedy' | 'Mystery';

export interface Show {
  id: string;
  title: string;
  language: string;
  genres: Genre[];
  views: string;
  posterUrl: string;
  backdropUrl: string;
  isNew?: boolean;
  tagLine: string;
  about: string;
  rating: string;
  timeLeft?: string;
  releaseCountdown?: string;
  isSeries?: boolean;
}

export interface Reel {
  id: string;
  showId: string;
  title: string;
  duration: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface UserProgress {
  showId: string;
  progress: number;
  leftLabel: string;
}

export interface NotificationRequest {
  showId: string;
  enabled: boolean;
}
