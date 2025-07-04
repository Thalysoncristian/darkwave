const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Aqui futuramente será feita a checagem real do status do FFmpeg/Icecast
  res.json({ status: 'offline' });
});

module.exports = router; 