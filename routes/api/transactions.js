const express = require("express");
const router = express.Router();

// Transaction Model
const Transaction = require("../../models/Transaction");

// @route   GET api/transaction
// @desc    Get all transaction
// @access  Public
router.get("/", (req, res) => {
  Transaction.find()
    .sort({ date: 1 })
    .then(transactions => res.json(transactions));
  // return res.end("We made it!");
});

// @route   POST api/transaction
// @desc    Create an transaction
// @access  Public
router.post("/", (req, res) => {
  const newTransaction = new Transaction({
    date: req.body.date,
    store: req.body.store,
    amount: req.body.amount
  });

  newTransaction.save().then(transaction => res.json(transaction));
});

// @route   DELETE api/transactions/:id
// @desc    Delete an transaction
// @access  Public
router.delete("/:id", (req, res) => {
  Transaction.findById(req.params.id)
    .then(transaction =>
      transaction.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
