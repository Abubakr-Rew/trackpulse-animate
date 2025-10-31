import { useState, useEffect } from "react";
import { User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

interface UserProfileData {
  name: string;
  age: string;
  height: string;
  weight: string;
}

export const UserProfile = () => {
  const [profile, setProfile] = useLocalStorage<UserProfileData>("userProfile", {
    name: "",
    age: "",
    height: "",
    weight: "",
  });

  const [formData, setFormData] = useState(profile);

  const calculateBMI = () => {
    const heightM = parseFloat(formData.height) / 100;
    const weightKg = parseFloat(formData.weight);
    if (heightM > 0 && weightKg > 0) {
      return (weightKg / (heightM * heightM)).toFixed(1);
    }
    return "0";
  };

  const getFitnessLevel = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi === 0) return "Enter your data";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Healthy Weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getRecommendation = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi === 0) return "";
    if (bmi < 18.5) return "Focus on strength training and calorie surplus";
    if (bmi < 25) return "Maintain your current routine!";
    if (bmi < 30) return "Combine cardio with strength training";
    return "Consult with a healthcare professional";
  };

  const handleSave = () => {
    setProfile(formData);
    toast.success("Profile saved successfully!");
  };

  const handleChange = (field: keyof UserProfileData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <section id="profile" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimationWrapper animation="fade">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center mb-12">
            Your Profile
          </h2>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollAnimationWrapper animation="slide-right">
            <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-xl">Personal Information</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your name"
                    className="glass mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="Enter your age"
                    className="glass mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                    placeholder="Enter your height"
                    className="glass mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    placeholder="Enter your weight"
                    className="glass mt-1"
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="slide-left" delay={100}>
            <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-300">
              <h3 className="font-semibold text-xl mb-6">Health Metrics</h3>

              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {calculateBMI()}
                  </div>
                  <p className="text-lg font-medium">{getFitnessLevel()}</p>
                </div>

                {getRecommendation() && (
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <p className="text-sm font-medium mb-1">Recommendation</p>
                    <p className="text-sm text-muted-foreground">
                      {getRecommendation()}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Age</span>
                    <span className="font-medium">{formData.age || "-"}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Height</span>
                    <span className="font-medium">
                      {formData.height ? `${formData.height} cm` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <span className="font-medium">
                      {formData.weight ? `${formData.weight} kg` : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
};
