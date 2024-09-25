import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function TransactionChart({ transactions }) {
  // Calculate hours for each type
  const regularHours =
    transactions
      .filter((t) => t.type === "regular")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0) || 0;

  const overtimeHours =
    transactions
      .filter((t) => t.type === "overtime")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0) || 0;

  const holidayHours =
    transactions
      .filter((t) => t.type === "holiday")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0) || 0;

  const gameDayHours =
    transactions
      .filter((t) => t.type === "game-day")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0) || 0;

  const data = {
    labels: [
      "Regular Hours",
      "Overtime Hours",
      "Holiday Hours",
      "Game-Day Hours",
    ],
    datasets: [
      {
        label: "Hours Worked",
        data: [regularHours, overtimeHours, holidayHours, gameDayHours],
        backgroundColor: ["#f6aa1c", "#E88E17", "#D97212", "#BC3908"], // Matching colors with HoursByDateChart
        borderColor: ["#000000"], // Matching border color
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "right", // Place legend inside the chart on the right
        labels: {
          color: "#FFFFFF", // Dark color for legend labels
          font: {
            size: 12, // Increase legend font size
          },
          padding: 20, // Increase padding between legend items
          boxWidth: 20, // Increase size of color box in legend
        },
      },
      tooltip: {
        titleColor: "#FFFFFF", // Dark color for tooltip title
        bodyColor: "#FFFFFF", // Dark color for tooltip body
      },
    },
    cutout: "30%", // Increase the inner radius to make the donut smaller and more prominent
    circumference: 180, // Partial donut (half-circle)
    rotation: -90, // Start from the top, creating a rainbow shape
    aspectRatio: 1.5, // Adjust aspect ratio to provide more space for the chart
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 10, // Reduce padding to allow more space for chart and legend
      },
    },
    maintainAspectRatio: false, // Allow the chart to grow inside the container
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
      <h2 style={{ color: "#FFFFFF" }} className="text-xl font-bold mb-4">
        Distribution of Hours by Type
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default TransactionChart;
