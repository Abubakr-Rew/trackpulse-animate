import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {!showDashboard ? (
        <Hero onStartTracking={() => setShowDashboard(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default Index;
