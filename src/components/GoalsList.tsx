import { useState } from "react";
import { Check, Plus, Target, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Goal } from "@/types/fitness";
import { toast } from "sonner";
import Confetti from "react-confetti";

export const GoalsList = () => {
  const [goals, setGoals] = useLocalStorage<Goal[]>("goals", []);
  const [newGoal, setNewGoal] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const addGoal = () => {
    if (!newGoal.trim()) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setGoals([...goals, goal]);
    setNewGoal("");
    toast.success("Goal added!");
  };

  const toggleGoal = (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (goal && !goal.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      toast.success("🎉 Goal completed! Amazing work!");
    }
    
    setGoals(goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g)));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
    toast.success("Goal deleted");
  };

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
      
      <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Goals</h3>
        </div>

        <div className="flex gap-2 mb-4">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            onKeyPress={(e) => e.key === "Enter" && addGoal()}
            className="glass border-border/50"
          />
          <Button onClick={addGoal} size="icon" className="shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {goals.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No goals yet. Add one to get started!
            </p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center gap-2 p-3 glass rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`shrink-0 ${goal.completed ? "text-success" : ""}`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <span
                  className={`flex-1 ${
                    goal.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {goal.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive"
                  onClick={() => deleteGoal(goal.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
