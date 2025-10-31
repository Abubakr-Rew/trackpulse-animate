import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Workout } from "@/types/fitness";
import { getRandomQuote } from "@/data/quotes";
import { WorkoutForm } from "./WorkoutForm";
import { WorkoutChart } from "./WorkoutChart";
import { WeightChart } from "./WeightChart";
import { StreakCounter } from "./StreakCounter";
import { WaterIntake } from "./WaterIntake";
import { GoalsList } from "./GoalsList";

export const Dashboard = () => {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>("workouts", []);
  const [quote, setQuote] = useState(getRandomQuote());

  const addWorkout = (workout: Workout) => {
    setWorkouts([...workouts, workout]);
  };

  return (
    <section id="progress" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Your Workouts
          </h2>
          <div className="glass rounded-xl p-4 inline-block">
            <p className="text-lg font-medium">{quote}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuote(getRandomQuote())}
              className="mt-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Quote
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <StreakCounter workouts={workouts} />
          <div className="lg:col-span-2">
            <WaterIntake />
          </div>
        </div>

        <div id="goals" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <WorkoutForm onAdd={addWorkout} />
          <GoalsList />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <WorkoutChart workouts={workouts} />
          <WeightChart />
        </div>
      </div>
    </section>
  );
};
