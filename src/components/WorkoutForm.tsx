import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Workout } from "@/types/fitness";
import { toast } from "sonner";

interface WorkoutFormProps {
  onAdd: (workout: Workout) => void;
}

export const WorkoutForm = ({ onAdd }: WorkoutFormProps) => {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    calories: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.duration || !formData.calories) {
      toast.error("Please fill in all required fields");
      return;
    }

    const workout: Workout = {
      id: Date.now().toString(),
      type: formData.type,
      duration: Number(formData.duration),
      date: formData.date,
      calories: Number(formData.calories),
      notes: formData.notes,
    };

    onAdd(workout);
    setFormData({
      type: "",
      duration: "",
      date: new Date().toISOString().split("T")[0],
      calories: "",
      notes: "",
    });
    toast.success("Workout added!");
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4 hover:neon-glow transition-all duration-300">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add Workout
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Workout Type *</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder="e.g. Running, Yoga"
            className="glass border-border/50"
          />
        </div>

        <div>
          <Label htmlFor="duration">Duration (min) *</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="30"
            className="glass border-border/50"
          />
        </div>

        <div>
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="glass border-border/50"
          />
        </div>

        <div>
          <Label htmlFor="calories">Calories Burned *</Label>
          <Input
            id="calories"
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            placeholder="300"
            className="glass border-border/50"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="How did it go?"
          className="glass border-border/50 resize-none"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Workout
      </Button>
    </form>
  );
};
