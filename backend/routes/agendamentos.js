const express = require('express');
const router = express.Router();
const { Agendamento, Programa, Playlist } = require('../models');
const auth = require('../middlewares/auth');

// Listar todos os agendamentos com join
router.get('/', async (req, res) => {
  const agendamentos = await Agendamento.findAll({
    include: [Programa, Playlist],
    order: [['inicio', 'ASC']]
  });
  res.json(agendamentos);
});

// Criar novo agendamento
router.post('/', auth, async (req, res) => {
  const { programaId, playlistId, inicio, fim, descricao } = req.body;
  const novo = await Agendamento.create({ programaId, playlistId, inicio, fim, descricao });
  res.status(201).json(novo);
});

// Editar agendamento
router.put('/:id', auth, async (req, res) => {
  const { programaId, playlistId, inicio, fim, descricao } = req.body;
  const agendamento = await Agendamento.findByPk(req.params.id);
  if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
  agendamento.programaId = programaId;
  agendamento.playlistId = playlistId;
  agendamento.inicio = inicio;
  agendamento.fim = fim;
  agendamento.descricao = descricao;
  await agendamento.save();
  res.json(agendamento);
});

// Deletar agendamento
router.delete('/:id', auth, async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id);
  if (!agendamento) return res.status(404).json({ error: 'Agendamento não encontrado' });
  await agendamento.destroy();
  res.json({ ok: true });
});

module.exports = router; 