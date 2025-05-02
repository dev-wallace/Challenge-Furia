const express = require('express');
const router = express.Router();
const messageStore = require('../stores/message.store');

// Rota para ver chunks armazenados (apenas debug)
router.get('/chunks', (req, res) => {
  try {
    const chunks = Array.from(messageStore.getAll());
    return res.json({
      status: 'success',
      count: chunks.length,
      chunks
    });
  } catch (error) {
    console.error('Debug error:', error);
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

module.exports = router;