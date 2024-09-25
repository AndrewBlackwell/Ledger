import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionChart from "./components/TransactionChart";
import HoursByDateChart from "./components/HoursByDateChart";
import EditTransactionModal from "./components/EditTransactionModal";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null); // For the transaction being edited
  const [greeting, setGreeting] = useState(""); // For dynamic greeting
  const [currentTime, setCurrentTime] = useState(""); // For storing current time

  // Hardcoded Boone, NC coordinates
  const booneCoordinates = {
    latitude: 36.2168,
    longitude: -81.6746,
  };

  // Fetch transactions (or shifts) from the backend and set the greeting
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/transactions")
      .then((response) => {
        setTransactions(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the transactions!", error);
      });

    // Determine the greeting based on the time of day
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Morning, Mountaineer");
    } else {
      setGreeting("Afternoon, Mountaineer");
    }

    // Update current time for Boone, NC every second
    const updateTime = () => {
      const options = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const now = new Date().toLocaleTimeString([], options);
      setCurrentTime(now);
    };
    updateTime(); // Initial time update
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handler to delete a shift
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/api/transactions/${id}`)
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the transaction!", error);
      });
  };

  // Handler to start editing a shift
  const handleEdit = (id) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    setEditTransaction(transactionToEdit);
  };

  // Handler to update a shift
  const handleUpdate = (updatedTransaction) => {
    axios
      .put(
        `http://localhost:5001/api/transactions/${updatedTransaction.id}`,
        updatedTransaction
      )
      .then(() => {
        setTransactions(
          transactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? updatedTransaction
              : transaction
          )
        );
        setEditTransaction(null); // Clear the edit state after updating
      })
      .catch((error) => {
        console.error("There was an error updating the transaction!", error);
      });
  };

  // Function to close the edit modal
  const handleCloseModal = () => {
    setEditTransaction(null);
  };

  // Function to save changes from the edit modal
  const handleSaveTransaction = (updatedTransaction) => {
    handleUpdate(updatedTransaction);
    handleCloseModal();
  };

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div
      style={{ backgroundColor: "#000000" }}
      className="App min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-8"
    >
      {/* Greeting */}
      <h1 style={{ color: "#ffffff" }} className="text-4xl font-bold mb-2">
        {greeting}
      </h1>
      {/* Boone, NC Coordinates and Current Time */}
      <p style={{ color: "#f6aa1c" }} className="text-sm mb-8">
        Boone, NC ({booneCoordinates.latitude.toFixed(4)},{" "}
        {booneCoordinates.longitude.toFixed(4)}): {currentTime}
      </p>
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full justify-items-center align-items-center">
        <TransactionForm setTransactions={setTransactions} />
        <TransactionList
          transactions={sortedTransactions} // Pass sorted transactions
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      {/* Analytics Label */}
      <div className="w-full flex justify-center max-w-6xl mx-auto">
        {" "}
        {/* Matching the grid width */}
        <h2
          style={{ color: "#FFFFFF" }}
          className="text-2xl font-bold my-8 text-center"
        >
          Your Analytics
        </h2>
      </div>
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full justify-items-center align-items-center">
        <TransactionChart transactions={transactions} />
        <HoursByDateChart transactions={transactions} />
      </div>
      {/* Edit Transaction Modal */}
      {editTransaction && (
        <EditTransactionModal
          transaction={editTransaction}
          onSave={handleSaveTransaction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
