import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 7;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const message =
    progress < 10
      ? "Preparing..."
      : progress < 70
        ? "Brewing your experience..."
        : "Almost ready...";

  return (
    <div className="h-screen w-screen bg-background flex flex-col items-center justify-center ">
      <img
        alt="Kissa Mori"
        className="w-50 md:w-96 object-contain mb-12"
        src="/logo.png"
      ></img>

      <div className="flex flex-col items-center gap-4 fade-in">
        <Loader2 className="size-8 animate-spin text-espresso" />

        <p className="font-serif text-base italic text-text-secondary">
          {message}
        </p>
      </div>
    </div>
  );
}
