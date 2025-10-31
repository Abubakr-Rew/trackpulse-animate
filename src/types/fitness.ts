export interface Workout {
  id: string;
  type: string;
  duration: number;
  date: string;
  calories: number;
  notes?: string;
}

export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface DailyData {
  date: string;
  water: number;
}
