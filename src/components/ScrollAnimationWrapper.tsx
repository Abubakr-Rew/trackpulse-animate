import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  className?: string;
}

export const ScrollAnimationWrapper = ({
  children,
  animation = "fade",
  delay = 0,
  className = "",
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animationClasses = {
    fade: "opacity-0 translate-y-4",
    "slide-up": "opacity-0 translate-y-12",
    "slide-left": "opacity-0 translate-x-12",
    "slide-right": "opacity-0 -translate-x-12",
    scale: "opacity-0 scale-95",
  };

  const visibleClasses = "opacity-100 translate-x-0 translate-y-0 scale-100";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleClasses : animationClasses[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
