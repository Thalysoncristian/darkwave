const express = require('express');
const router = express.Router();
const { Programa } = require('../models');
const auth = require('../middlewares/auth');

// Listar todos os programas
router.get('/', async (req, res) => {
  const programas = await Programa.findAll();
  res.json(programas);
});

// Criar novo programa
router.post('/', auth, async (req, res) => {
  const { nome, descricao } = req.body;
  const novo = await Programa.create({ nome, descricao });
  res.status(201).json(novo);
});

// Editar programa
router.put('/:id', auth, async (req, res) => {
  const { nome, descricao } = req.body;
  const programa = await Programa.findByPk(req.params.id);
  if (!programa) return res.status(404).json({ error: 'Programa não encontrado' });
  programa.nome = nome;
  programa.descricao = descricao;
  await programa.save();
  res.json(programa);
});

// Deletar programa
router.delete('/:id', auth, async (req, res) => {
  const programa = await Programa.findByPk(req.params.id);
  if (!programa) return res.status(404).json({ error: 'Programa não encontrado' });
  await programa.destroy();
  res.json({ ok: true });
});

module.exports = router; 