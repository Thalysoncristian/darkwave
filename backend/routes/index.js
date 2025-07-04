const express = require('express');
const router = express.Router();

// Exemplo de importação de rotas futuras
// router.use('/programas', require('./programas'));
// router.use('/agendamentos', require('./agendamentos'));
router.use('/playlists', require('./playlists'));
router.use('/auth', require('./auth'));
router.use('/ao-vivo', require('./aoVivo'));
router.use('/programas', require('./programas'));
router.use('/agendamentos', require('./agendamentos'));

module.exports = router; 