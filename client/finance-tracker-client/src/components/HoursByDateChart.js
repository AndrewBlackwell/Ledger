import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

// Register necessary components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function HoursByDateChart({ transactions }) {
  // Group hours by date
  const groupedData = transactions.reduce((acc, transaction) => {
    const date = dayjs(transaction.date).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += parseFloat(transaction.amount);
    return acc;
  }, {});

  const dates = Object.keys(groupedData);
  const hours = Object.values(groupedData);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Hours Worked",
        data: hours,
        fill: false,
        backgroundColor: "#f6aa1c",
        borderColor: "rgba(246, 170, 28, 0.3)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // White color for x-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light gray for x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // White color for y-axis labels
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Light gray for y-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff", // White color for legend labels
        },
      },
      tooltip: {
        titleColor: "#ffffff", // White color for tooltip title
        bodyColor: "#ffffff", // White color for tooltip body
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#000000", // Matching the background of HoursByDateChart
        borderColor: "rgb(53, 53, 53)",
        borderRadius: "20px",
        width: "100%", // Ensure full width within the grid cell
        maxWidth: "500px", // Adjusted max-width to match HoursByDateChart
        minHeight: "300px", // Reduced min-height for more compact layout
        height: "300px", // Set height for compact layout
        boxSizing: "border-box",
      }}
      className="shadow-md rounded px-8 pt-6 pb-8 mb-8 w-full max-w-lg border"
    >
      <h2 style={{ color: "#ffffff" }} className="text-xl font-bold mb-4">
        Total Hours Worked by Date
      </h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default HoursByDateChart;
