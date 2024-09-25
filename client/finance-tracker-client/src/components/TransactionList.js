import React from "react";

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div
      style={{
        backgroundColor: "#000000",
        borderColor: "rgb(53, 53, 53)",
        borderRadius: "16px",
        width: "100%", // Ensure full width within the grid cell
        maxWidth: "500px", // Adjust max-width as needed
        overflowY: "auto", // Add scrollbars when needed
        minHeight: "430px", // Ensure a minimum height to match the list
        height: "430px",
        boxSizing: "border-box",
      }}
      className="shadow-md rounded px-8 pt-6 pb-8 mb-8 w-full max-w-lg border"
    >
      <h2
        style={{ color: "rgb(255, 255, 255)" }}
        className="text-xl font-bold mb-4"
      >
        Shift Log
      </h2>
      <ul className="space-y-4">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "rgb(24, 24, 24)", // Custom background color
              borderColor: "rgb(53, 53, 53)", // Custom border color
            }}
            className="flex justify-between items-center p-4 rounded shadow-sm border"
          >
            <span>
              {transaction.date}: {transaction.description} -{" "}
              {transaction.amount} hours ({transaction.type})
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  console.log("Edit clicked for ID:", transaction.id);
                  onEdit(transaction.id);
                }}
                style={{
                  backgroundColor: "rgb(255, 255, 255)", // Initial white background
                  color: "rgb(0, 0, 0)", // Initial black text color
                  borderColor: "rgb(24, 24, 24)", // Initial black border color
                }}
                onMouseEnter={
                  (e) => (e.target.style.backgroundColor = "rgb(200, 200, 200)") // Lighter gray on hover
                }
                onMouseLeave={
                  (e) => (e.target.style.backgroundColor = "rgb(255, 255, 255)") // Restore white on leave
                }
                className="font-bold py-1 px-2 rounded border"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  console.log("Delete clicked for ID:", transaction.id);
                  onDelete(transaction.id);
                }}
                style={{
                  backgroundColor: "rgb(255,255,255)", // Initial background color
                  color: "rgb(0, 0, 0)", // Initial text color
                  borderColor: "rgb(24, 24, 24)", // Initial black border color
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgb(220,220,220)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgb(255,255,255)")
                }
                className="font-bold py-1 px-2 rounded border"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
