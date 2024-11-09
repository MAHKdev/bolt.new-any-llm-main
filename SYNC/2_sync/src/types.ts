// Update Child interface to include parent heights
export interface Child {
  id: string;
  name: string;
  avatar: string;
  points: number;
  gender: 'male' | 'female' | 'neutral';
  birthDate: string;
  growthData: GrowthEntry[];
  parentHeights?: {
    father?: number;
    mother?: number;
  };
}

export interface GrowthEntry {
  id: string;
  date: string;
  height: number;
  weight: number;
}