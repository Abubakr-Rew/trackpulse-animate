import { useState, useEffect } from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRandomQuote } from "@/data/quotes";

interface HeroProps {
  onStartTracking: () => void;
}

export const Hero = ({ onStartTracking }: HeroProps) => {
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-bg animate-gradient opacity-20" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full gradient-bg blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full gradient-bg blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
          FitTrack
        </h1>
        
        <div className="glass rounded-2xl p-8 mb-8 neon-glow">
          <p className="text-2xl md:text-3xl font-medium mb-2 text-foreground">
            {quote}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuote(getRandomQuote())}
            className="mt-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Quote
          </Button>
        </div>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Track your workouts, weight, water intake, and goals with beautiful visuals and animations.
        </p>

        <Button
          size="lg"
          onClick={onStartTracking}
          className="text-lg px-8 py-6 rounded-full neon-glow hover:scale-105 transition-transform"
        >
          Start Tracking
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
