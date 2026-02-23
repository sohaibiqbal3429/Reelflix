export interface Category {
  id: string;
  name?: string;
  label?: string;
}

export interface Show {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  videoUrl: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  sections: string[];
  status: string;
  views: number;
  watchMinutes: number;
}

export interface HomePayload {
  featured: Show[];
  trending: Show[];
  topRanked: Show[];
  comingSoon: Show[];
  categories: Category[];
}

export interface UserProgress {
  id?: string;
  deviceId: string;
  contentId: string;
  positionSec: number;
  durationSec: number;
  updatedAt?: string;
}
