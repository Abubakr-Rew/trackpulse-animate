import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Workout } from "@/types/fitness";
import { Activity } from "lucide-react";

interface WorkoutChartProps {
  workouts: Workout[];
}

export const WorkoutChart = ({ workouts }: WorkoutChartProps) => {
  // Get last 7 days of data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const chartData = last7Days.map((date) => {
    const dayWorkouts = workouts.filter((w) => w.date === date);
    const totalCalories = dayWorkouts.reduce((sum, w) => sum + w.calories, 0);
    const totalDuration = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);

    return {
      date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      calories: totalCalories,
      duration: totalDuration,
    };
  });

  return (
    <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Weekly Progress</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
