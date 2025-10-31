import { Flame } from "lucide-react";
import { Workout } from "@/types/fitness";

interface StreakCounterProps {
  workouts: Workout[];
}

export const StreakCounter = ({ workouts }: StreakCounterProps) => {
  const calculateStreak = () => {
    if (workouts.length === 0) return 0;

    const sortedWorkouts = [...workouts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < sortedWorkouts.length; i++) {
      const workoutDate = new Date(sortedWorkouts[i].date);
      workoutDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor(
        (currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="glass rounded-2xl p-6 text-center relative overflow-hidden group hover:neon-glow transition-all duration-300">
      <div className="absolute inset-0 gradient-bg opacity-10 group-hover:opacity-20 transition-opacity" />
      <div className="relative z-10">
        <Flame className="w-12 h-12 mx-auto mb-2 text-primary animate-pulse" />
        <div className="text-5xl font-bold gradient-text mb-2">{streak}</div>
        <p className="text-muted-foreground font-medium">Day Streak</p>
      </div>
    </div>
  );
};
