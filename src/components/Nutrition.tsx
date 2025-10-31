import { useState } from "react";
import { Apple, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  calories: number;
  date: string;
}

const DAILY_CALORIE_TARGET = 2000;

const healthyMealSuggestions = [
  { name: "Greek Yogurt with Berries", calories: 150, type: "breakfast" },
  { name: "Oatmeal with Banana", calories: 200, type: "breakfast" },
  { name: "Grilled Chicken Salad", calories: 350, type: "lunch" },
  { name: "Quinoa Bowl", calories: 400, type: "lunch" },
  { name: "Salmon with Vegetables", calories: 450, type: "dinner" },
  { name: "Lean Steak with Sweet Potato", calories: 500, type: "dinner" },
  { name: "Apple with Almond Butter", calories: 180, type: "snack" },
  { name: "Protein Smoothie", calories: 220, type: "snack" },
];

export const Nutrition = () => {
  const [meals, setMeals] = useLocalStorage<Meal[]>("meals", []);
  const [newMeal, setNewMeal] = useState({ name: "", calories: "", type: "breakfast" });

  const today = new Date().toISOString().split("T")[0];
  const todayMeals = meals.filter((m) => m.date === today);
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
  const remainingCalories = DAILY_CALORIE_TARGET - totalCalories;

  const addMeal = () => {
    if (!newMeal.name.trim() || !newMeal.calories) {
      toast.error("Please enter meal name and calories");
      return;
    }

    const meal: Meal = {
      id: Date.now().toString(),
      type: newMeal.type as Meal["type"],
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      date: today,
    };

    setMeals([...meals, meal]);
    setNewMeal({ name: "", calories: "", type: "breakfast" });
    toast.success("Meal logged!");
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter((m) => m.id !== id));
    toast.success("Meal deleted");
  };

  const addSuggestion = (suggestion: typeof healthyMealSuggestions[0]) => {
    const meal: Meal = {
      id: Date.now().toString(),
      type: suggestion.type as Meal["type"],
      name: suggestion.name,
      calories: suggestion.calories,
      date: today,
    };
    setMeals([...meals, meal]);
    toast.success("Meal added!");
  };

  return (
    <section id="nutrition" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimationWrapper animation="fade">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-12">
            Nutrition Tracker
          </h2>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ScrollAnimationWrapper animation="slide-right">
            <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Apple className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-xl">Log Your Meals</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <select
                    id="meal-type"
                    value={newMeal.type}
                    onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                    className="w-full mt-1 px-3 py-2 glass rounded-md border border-border bg-background"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="meal-name">Meal Name</Label>
                  <Input
                    id="meal-name"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    placeholder="e.g., Grilled Chicken Salad"
                    className="glass mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                    placeholder="e.g., 450"
                    className="glass mt-1"
                  />
                </div>

                <Button onClick={addMeal} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Meal
                </Button>
              </div>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="slide-left" delay={100}>
            <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <h3 className="font-semibold text-xl mb-4">Today's Summary</h3>

              <div className="text-center mb-6 p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">Total Calories</p>
                <div className="text-5xl font-bold gradient-text mb-2">
                  {totalCalories}
                </div>
                <p className="text-sm text-muted-foreground">
                  Target: {DAILY_CALORIE_TARGET} cal
                </p>
              </div>

              <div className="relative w-full h-4 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  className="absolute inset-y-0 left-0 gradient-bg transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min((totalCalories / DAILY_CALORIE_TARGET) * 100, 100)}%`,
                  }}
                />
              </div>

              <p className="text-center text-sm mb-6">
                {remainingCalories > 0 ? (
                  <span className="text-muted-foreground">
                    {remainingCalories} calories remaining
                  </span>
                ) : (
                  <span className="text-warning font-medium">
                    {Math.abs(remainingCalories)} calories over target
                  </span>
                )}
              </p>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {todayMeals.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No meals logged today
                  </p>
                ) : (
                  todayMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="flex items-center justify-between p-3 glass rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {meal.type} • {meal.calories} cal
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMeal(meal.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        <ScrollAnimationWrapper animation="fade" delay={200}>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-xl mb-4">Healthy Meal Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthyMealSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => addSuggestion(suggestion)}
                  className="p-4 glass rounded-xl hover:neon-glow transition-all duration-300 text-left group"
                >
                  <p className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {suggestion.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize mb-2">
                    {suggestion.type}
                  </p>
                  <p className="text-sm font-semibold gradient-text">
                    {suggestion.calories} cal
                  </p>
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
