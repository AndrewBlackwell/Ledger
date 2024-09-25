import React, { useState } from "react";
import axios from "axios";

function TransactionForm({ setTransactions }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "regular", // Default to regular hours
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/transactions", formData)
      .then((response) => {
        setTransactions((prev) => [
          ...prev,
          { ...formData, id: response.data.data.id },
        ]);
        setFormData({ description: "", amount: "", type: "regular", date: "" }); // Reset the form
      })
      .catch((error) => console.error("Error adding transaction!", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#000000",
        borderColor: "rgb(53, 53, 53)",
        borderRadius: "20px",
        width: "100%", // Ensure full width within the grid cell
        maxWidth: "500px", // Adjust max-width as needed
        minHeight: "430px", // Ensure a minimum height to match the list
        height: "430px",
        boxSizing: "border-box",
      }}
      className="shadow-md rounded px-8 pt-6 pb-8 mb-8 w-full max-w-lg border"
    >
      <div className="mb-4">
        <label
          style={{ color: "rgb(255, 255, 255)" }} // Custom yellow color for label
          className="block text-sm font-bold mb-2"
          htmlFor="description"
        >
          Shift Notes
        </label>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="How'd you do today?"
          style={{
            backgroundColor: "rgb(24, 24, 24)", // Dark background
            color: "rgb(255, 255, 255)", // White text color
            borderColor: "rgb(53, 53, 53)", // Dark border
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          style={{ color: "rgb(255, 255, 255)" }} // Custom yellow color for label
          className="block text-sm font-bold mb-2"
          htmlFor="amount"
        >
          Hours Worked
        </label>
        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          type="number"
          placeholder="Too many to count?"
          style={{
            backgroundColor: "rgb(24, 24, 24)", // Dark background
            color: "rgb(255, 255, 255)", // White text color
            borderColor: "rgb(53, 53, 53)", // Dark border
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          style={{ color: "rgb(255, 255, 255)" }} // Custom yellow color for label
          className="block text-sm font-bold mb-2"
          htmlFor="type"
        >
          Shift Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          style={{
            backgroundColor: "rgb(24, 24, 24)", // Dark background
            color: "rgb(255, 255, 255)", // White text color
            borderColor: "rgb(53, 53, 53)", // Dark border
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="regular">Regular</option>
          <option value="overtime">Overtime</option>
          <option value="holiday">Holiday</option>
          <option value="game-day">Game-Day</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          style={{ color: "rgb(255, 255, 255)" }}
          className="block text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date
        </label>
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          style={{
            backgroundColor: "rgb(24, 24, 24)", // Dark background
            color: "rgb(255, 255, 255)", // White text color
            borderColor: "rgb(53, 53, 53)", // Dark border
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "rgb(255, 255, 255)", // Custom yellow button
          color: "rgb(0, 0, 0)", // Black text color
        }}
        onMouseEnter={
          (e) => (e.target.style.backgroundColor = "rgb(220, 220, 220)") // Darker yellow on hover
        }
        onMouseLeave={
          (e) => (e.target.style.backgroundColor = "rgb(255, 255, 255)") // Restore yellow on leave
        }
        className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Add Shift
      </button>
    </form>
  );
}

export default TransactionForm;
