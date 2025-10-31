import { useState, useEffect } from "react";
import { RefreshCw, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

const dailyQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Don't wish for it, work for it.",
  "Sweat is magic. Cover yourself in it daily.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Push yourself, because no one else will.",
  "Great things never come from comfort zones.",
  "Success starts with self-discipline.",
  "Train like a beast, look like a beauty.",
  "Stronger every day.",
  "Small steps every day.",
  "Progress, not perfection.",
  "Your only limit is you.",
  "Believe in yourself.",
  "Make it happen.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The difference between try and triumph is a little umph.",
  "A one hour workout is 4% of your day. No excuses.",
  "You don't have to be great to start, but you have to start to be great.",
  "Take care of your body. It's the only place you have to live.",
];

export const DailyMotivation = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage(
    "notificationsEnabled",
    false
  );
  const [todayQuote, setTodayQuote] = useLocalStorage("todayQuote", "");
  const [lastQuoteDate, setLastQuoteDate] = useLocalStorage("lastQuoteDate", "");

  const getQuoteForToday = () => {
    const today = new Date().toISOString().split("T")[0];
    if (lastQuoteDate !== today) {
      const dayOfYear = Math.floor(
        (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const quote = dailyQuotes[dayOfYear % dailyQuotes.length];
      setTodayQuote(quote);
      setLastQuoteDate(today);
      return quote;
    }
    return todayQuote || dailyQuotes[0];
  };

  const [quote, setQuote] = useState(getQuoteForToday());

  useEffect(() => {
    setQuote(getQuoteForToday());
  }, []);

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setNotificationsEnabled(true);
          toast.success("Notifications enabled! You'll get daily reminders.");
          
          // Schedule daily notification (demonstration)
          setTimeout(() => {
            new Notification("FitTrack Reminder", {
              body: "Time to move! Don't skip your workout today!",
              icon: "/favicon.ico",
            });
          }, 2000);
        } else {
          toast.error("Notification permission denied");
        }
      } else {
        toast.error("Notifications not supported in this browser");
      }
    } else {
      setNotificationsEnabled(false);
      toast.success("Notifications disabled");
    }
  };

  const refreshQuote = () => {
    const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
    setQuote(randomQuote);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimationWrapper animation="fade">
          <div className="glass rounded-2xl p-8 text-center hover:neon-glow transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Daily Motivation
            </h2>
            
            <div className="relative mb-6 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                "{quote}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={refreshQuote}
                className="glass"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Quote
              </Button>

              <Button
                variant={notificationsEnabled ? "default" : "outline"}
                onClick={toggleNotifications}
                className={notificationsEnabled ? "" : "glass"}
              >
                {notificationsEnabled ? (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications On
                  </>
                ) : (
                  <>
                    <BellOff className="w-4 h-4 mr-2" />
                    Enable Reminders
                  </>
                )}
              </Button>
            </div>

            {notificationsEnabled && (
              <p className="mt-4 text-sm text-muted-foreground">
                You'll receive daily workout reminders
              </p>
            )}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};
