import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const message =
    progress < 30
      ? "Preparing..."
      : progress < 70
        ? "Brewing your experience..."
        : "Almost ready...";

  return (
    <div className="h-screen w-screen bg-[#DCE4D6] flex flex-col items-center justify-center ">
      <img
        alt="Kissa Mori"
        className="w-50 md:w-96 object-contain mb-12"
        src="/public/logo.png"
      ></img>

      <div className="w-80 fade-in">
        <div className="w-80 h-2 rounded-full bg-white/60 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-[#3E4438] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-base text-[#5F665D] italic mb-6 mt-3">{message}</p>
      </div>
    </div>
  );
}
