import { useEffect, useState } from "react";
import { Award, Flame, Target, TrendingUp } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Workout, Goal } from "@/types/fitness";
import Confetti from "react-confetti";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
}

export const Achievements = () => {
  const [workouts] = useLocalStorage<Workout[]>("workouts", []);
  const [goals] = useLocalStorage<Goal[]>("goals", []);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage<string[]>(
    "unlockedAchievements",
    []
  );
  const [showConfetti, setShowConfetti] = useState(false);

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

  const completedGoals = goals.filter((g) => g.completed).length;
  const streak = calculateStreak();
  const workoutCount = workouts.length;

  const achievements: Achievement[] = [
    {
      id: "streak_7",
      title: "Week Warrior",
      description: "Complete a 7-day workout streak",
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      unlocked: streak >= 7,
      progress: streak,
      target: 7,
    },
    {
      id: "workouts_10",
      title: "Getting Started",
      description: "Complete 10 workouts",
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      unlocked: workoutCount >= 10,
      progress: workoutCount,
      target: 10,
    },
    {
      id: "workouts_25",
      title: "Dedicated",
      description: "Complete 25 workouts",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      unlocked: workoutCount >= 25,
      progress: workoutCount,
      target: 25,
    },
    {
      id: "goals_5",
      title: "Goal Getter",
      description: "Complete 5 goals",
      icon: <Target className="w-8 h-8 text-green-500" />,
      unlocked: completedGoals >= 5,
      progress: completedGoals,
      target: 5,
    },
    {
      id: "goals_10",
      title: "Achiever",
      description: "Complete 10 goals",
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      unlocked: completedGoals >= 10,
      progress: completedGoals,
      target: 10,
    },
    {
      id: "streak_30",
      title: "Unstoppable",
      description: "Complete a 30-day workout streak",
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      unlocked: streak >= 30,
      progress: streak,
      target: 30,
    },
  ];

  useEffect(() => {
    const newlyUnlocked = achievements.filter(
      (a) => a.unlocked && !unlockedAchievements.includes(a.id)
    );

    if (newlyUnlocked.length > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setUnlockedAchievements([
        ...unlockedAchievements,
        ...newlyUnlocked.map((a) => a.id),
      ]);
    }
  }, [achievements, unlockedAchievements]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <section id="achievements" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimationWrapper animation="fade">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-12">
              Achievements
            </h2>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <ScrollAnimationWrapper
                key={achievement.id}
                animation="scale"
                delay={index * 100}
              >
                <div
                  className={`glass rounded-2xl p-6 transition-all duration-300 ${
                    achievement.unlocked
                      ? "neon-glow border-2 border-primary/50"
                      : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={achievement.unlocked ? "animate-pulse" : ""}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {Math.min(achievement.progress, achievement.target)}/
                        {achievement.target}
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 transition-all duration-500 ease-out rounded-full ${
                          achievement.unlocked ? "gradient-bg" : "bg-muted-foreground"
                        }`}
                        style={{
                          width: `${Math.min(
                            (achievement.progress / achievement.target) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {achievement.unlocked && (
                    <div className="mt-4 text-center">
                      <span className="text-success font-semibold text-sm">
                        ✓ Unlocked!
                      </span>
                    </div>
                  )}
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
