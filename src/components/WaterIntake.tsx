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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Water Intake</h3>
        </div>
        <Button onClick={addWater} size="sm" className="rounded-full">
          <Plus className="w-4 h-4 mr-1" />
          250ml
        </Button>
      </div>
      
      <div className="relative w-full h-4 bg-secondary rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 gradient-bg transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-sm text-muted-foreground mt-2 text-center">
        {currentIntake}ml / {DAILY_GOAL}ml
      </p>
    </div>
  );
};
