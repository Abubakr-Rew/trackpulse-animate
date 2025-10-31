import { Droplet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DailyData } from "@/types/fitness";
import { toast } from "sonner";

const DAILY_GOAL = 2000; // ml

export const WaterIntake = () => {
  const [dailyData, setDailyData] = useLocalStorage<DailyData[]>("dailyData", []);

  const today = new Date().toISOString().split("T")[0];
  const todayData = dailyData.find((d) => d.date === today);
  const currentIntake = todayData?.water || 0;

  const addWater = () => {
    const newData = dailyData.filter((d) => d.date !== today);
    newData.push({ date: today, water: currentIntake + 250 });
    setDailyData(newData);
    toast.success("Added 250ml water!");
  };

  const percentage = Math.min((currentIntake / DAILY_GOAL) * 100, 100);

  return (
    <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Water Intake</h3>
        </div>
        <Button onClick={addWater} size="sm" className="rounded-full">
          <Plus className="w-4 h-4 mr-1" />
          250ml
        </Button>
      </div>

      <div className="flex items-center justify-center mb-4">
        {/* Circular Progress */}
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="hsl(var(--secondary))"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--gradient-start))" />
                <stop offset="100%" stopColor="hsl(var(--gradient-end))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold gradient-text">{Math.round(percentage)}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              {currentIntake}ml / {DAILY_GOAL}ml
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 gradient-bg transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
