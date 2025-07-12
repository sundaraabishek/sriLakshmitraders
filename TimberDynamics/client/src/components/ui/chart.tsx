import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

Chart.register(...registerables);

interface ChartProps {
  config: ChartConfiguration;
  className?: string;
}

export function ChartComponent({ config, className = "" }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new Chart(canvasRef.current, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [config]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}
