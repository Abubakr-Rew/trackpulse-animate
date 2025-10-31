import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Scale, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { WeightEntry } from "@/types/fitness";
import { toast } from "sonner";

export const WeightChart = () => {
  const [weightEntries, setWeightEntries] = useLocalStorage<WeightEntry[]>("weightEntries", []);
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const addWeight = () => {
    if (!weight) {
      toast.error("Please enter weight");
      return;
    }

    const entry: WeightEntry = {
      id: Date.now().toString(),
      weight: Number(weight),
      date,
    };

    setWeightEntries([...weightEntries, entry].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
    setWeight("");
    toast.success("Weight entry added!");
  };

  const chartData = weightEntries.slice(-30).map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    weight: entry.weight,
  }));

  return (
    <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Weight Tracker</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70.5"
            className="glass border-border/50"
          />
        </div>
        <div>
          <Label htmlFor="weight-date">Date</Label>
          <Input
            id="weight-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="glass border-border/50"
          />
        </div>
        <div className="flex items-end">
          <Button onClick={addWeight} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
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
            <Line
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-muted-foreground text-sm text-center py-8">
          No weight entries yet. Add your first entry above!
        </p>
      )}
    </div>
  );
};
