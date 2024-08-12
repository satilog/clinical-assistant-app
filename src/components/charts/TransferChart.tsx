import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register necessary components
Chart.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransferData {
  intime: string;
  outtime: string;
  careunit: string;
}

const TransferChart: React.FC<{ data: TransferData[] }> = ({ data }) => {
  const chartData = {
    datasets: (data || [])
      .map((item: any) => {
        const inTime = new Date(item.intime);
        const outTime = new Date(item.outtime);
        const diffDays = Math.ceil(
          (outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60 * 24)
        ); // Difference in days

        return {
          label: item.careunit,
          data: [
            { x: inTime, y: diffDays },
            { x: outTime, y: diffDays },
          ],
          borderColor: getColorByCareUnit(item.careunit),
          fill: false,
          tension: 0.1,
        };
      })
      .filter((a) => a.data[0].y > 3)
      .sort((a, b): any => a.data[0].y < b.data[0].y)
      // .slice(0, 10),
  };

  const options: any = {
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ward stay > 2 days",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true, // Use lines instead of rectangles
          pointStyleWidth: 0,
          font: {
            size: 10, // Adjust the font size
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const getColorByCareUnit = (careUnit: string): string => {
  switch (careUnit) {
    case "Medical Intensive Care Unit (MICU)":
      return "blue";
    case "Medical/Surgical Intensive Care Unit (MICU/SICU)":
      return "green";
    case "Surgical Intensive Care Unit (SICU)":
      return "orange";
    case "Cardiac Vascular Intensive Care Unit (CVICU)":
      return "red";
    case "Coronary Care Unit (CCU)":
      return "purple";
    default:
      return "gray";
  }
};

export default TransferChart;
