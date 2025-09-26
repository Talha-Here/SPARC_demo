export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface GameModule {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_time: number; // in minutes
  learning_objectives: string[];
  is_premium?: boolean;
}

export interface UserProgress {
  id: string;
  user_id: string;
  game_id: string;
  completed: boolean;
  score?: number;
  time_spent: number;
  completed_at?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}