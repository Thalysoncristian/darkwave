const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Usuário fixo para exemplo
const user = {
  id: 1,
  username: 'admin',
  password: bcrypt.hashSync('admin123', 8)
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router; 