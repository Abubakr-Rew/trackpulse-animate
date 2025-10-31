import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { UserProfile } from "@/components/UserProfile";
import { Nutrition } from "@/components/Nutrition";
import { Achievements } from "@/components/Achievements";
import { DailyMotivation } from "@/components/DailyMotivation";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";

const Index = () => {
  return (
    <div className="min-h-screen animated-gradient-bg relative">
      <Navbar />
      
      <div id="home" className="pt-16">
        <Hero onStartTracking={() => {
          const dashboard = document.getElementById("workouts");
          dashboard?.scrollIntoView({ behavior: "smooth" });
        }} />
      </div>

      <DailyMotivation />

      <div id="workouts">
        <ScrollAnimationWrapper animation="fade">
          <Dashboard />
        </ScrollAnimationWrapper>
      </div>

      <UserProfile />

      <Nutrition />

      <Achievements />

      <footer className="py-8 text-center text-muted-foreground">
        <p>© 2024 FitTrack. Track your fitness journey with style.</p>
      </footer>
    </div>
  );
};

export default Index;
