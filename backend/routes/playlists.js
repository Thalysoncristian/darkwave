const express = require('express');
const router = express.Router();
const { Playlist } = require('../models');
const auth = require('../middlewares/auth');

// Listar todas as playlists
router.get('/', async (req, res) => {
  const playlists = await Playlist.findAll();
  res.json(playlists);
});

// Criar nova playlist
router.post('/', auth, async (req, res) => {
  const { nome, descricao } = req.body;
  const nova = await Playlist.create({ nome, descricao });
  res.status(201).json(nova);
});

// Editar playlist
router.put('/:id', auth, async (req, res) => {
  const { nome, descricao } = req.body;
  const playlist = await Playlist.findByPk(req.params.id);
  if (!playlist) return res.status(404).json({ error: 'Playlist não encontrada' });
  playlist.nome = nome;
  playlist.descricao = descricao;
  await playlist.save();
  res.json(playlist);
});

// Deletar playlist
router.delete('/:id', auth, async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id);
  if (!playlist) return res.status(404).json({ error: 'Playlist não encontrada' });
  await playlist.destroy();
  res.json({ ok: true });
});

module.exports = router; 