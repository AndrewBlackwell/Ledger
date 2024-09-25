const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./server/db/database.sqlite");

// Get all transactions
router.get("/", (req, res) => {
  db.all("SELECT * FROM transactions", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Add a transaction
router.post("/", (req, res) => {
  const { description, amount, type, date } = req.body;
  db.run(
    `INSERT INTO transactions (description, amount, type, date) VALUES (?, ?, ?, ?)`,
    [description, amount, type, date],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: { id: this.lastID },
      });
    }
  );
});

// Delete a transaction by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM transactions WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: { id: id },
      changes: this.changes,
    });
  });
});

// Update a transaction by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { description, amount, type, date } = req.body;
  db.run(
    `UPDATE transactions SET description = ?, amount = ?, type = ?, date = ? WHERE id = ?`,
    [description, amount, type, date, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: { id: id },
        changes: this.changes,
      });
    }
  );
});

module.exports = router;
