import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isAr?: boolean;
}

export default function AnimatedCounter({
  target,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  isAr = false,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing function: easeOutQuad
      const easeProgress = progress * (2 - progress);
      
      const currentValue = startValue + easeProgress * (target - startValue);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  const formattedValue = count.toFixed(decimals);
  const displayText = `${prefix}${formattedValue}${suffix}`;

  const toArabicDigits = (str: string): string => {
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return str
      .replace(/[0-9]/g, (w) => arabicDigits[parseInt(w)])
      .replace(/\./g, "٫"); // Arabic decimal separator
  };

  return <span>{isAr ? toArabicDigits(displayText) : displayText}</span>;
}
