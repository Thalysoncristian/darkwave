<template>
  <div :style="mainBgStyle" class="main-bg">
    <div class="bg-overlay"></div>
    <!-- Elemento de áudio invisível -->
    <audio ref="audioRef" :src="radioUrl" preload="none"></audio>
    <!-- Layout Desktop -->
    <div v-if="isDesktop" class="desktop-layout">
      <!-- Sidebar Bandeira -->
      <transition name="fade">
        <aside v-if="activePanel === 'flag' && !minimalPlayer" class="desktop-sidebar">
          <div class="sidebar-header">
            <div class="sidebar-title">#MinimalWave</div>
            <div class="sidebar-desc">Radio Gothic &amp; Wave tocando o melhor da música dark</div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-section-title">NOSSAS REDES SOCIAIS</div>
            <div class="sidebar-link"><span class="sidebar-icon">📢</span> <a href="#">CANAL</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">💬</span> <a href="#">GRUPO</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">🖇️</span> <a href="#">COMUNIDADE</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">▶️</span> <a href="#">YOUTUBE</a></div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-section-title">APOIO</div>
            <div class="sidebar-link"><span class="sidebar-icon">💰</span> <a href="#">DOAÇÃO</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">⚡</span> <a href="#">ASSINATURA</a></div>
          </div>
          <div class="sidebar-section">
            <div class="sidebar-section-title">APLICATIVO</div>
            <div class="sidebar-link"><span class="sidebar-icon">▶️</span> <a href="#">GOOGLE PLAY</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">🤖</span> <a href="#">APK ANDROID</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">🪟</span> <a href="#">ZIP DO WINDOWS</a></div>
            <div class="sidebar-link"><span class="sidebar-icon">⬇️</span> <a href="#">ARQUIVO DO M3U PLAYER</a></div>
          </div>
          <div class="sidebar-section sidebar-footer">
            <div class="sidebar-desc2">FOTOS CORTESIA DA<br>COMUNIDADE <a href="#">LOST SLIDES</a></div>
          </div>
        </aside>
      </transition>
      <!-- Sidebar Histórico -->
      <transition name="fade">
        <aside v-if="activePanel === 'music' && !minimalPlayer" class="desktop-history">
          <div class="history-header">
            <div class="history-artist-label">ÉTER</div>
            <div class="history-artist-main">MÚSICAS TOCADAS</div>
          </div>
          <div class="history-list">
            <div v-for="(item, i) in historico" :key="i" class="history-row" style="display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;margin-bottom:1.1em;width:100%;column-gap:24px;">
              <span class="history-time" style="grid-column:1;grid-row:1;color:#bdbdbd;font-size:1.08rem;font-family:'Unbounded','Inter',Arial,sans-serif;letter-spacing:0.04em;text-shadow:0 2px 8px #000;align-self:center;">{{ item.hora }}</span>
              <span class="history-artist" style="grid-column:2;grid-row:1;color:#fff;font-weight:600;font-size:1.08rem;letter-spacing:0.04em;text-shadow:0 2px 8px #000;text-decoration:underline;">{{ item.artista }}</span>
              <span class="history-music" style="grid-column:2;grid-row:2;color:#fff;font-size:1.08rem;font-weight:400;letter-spacing:0.04em;text-shadow:0 2px 8px #000;">{{ item.musica }}</span>
            </div>
          </div>
        </aside>
      </transition>
      <div class="desktop-player" :class="{ minimal: minimalPlayer }">
        <div v-if="capa" class="album-cover" style="display:flex;justify-content:center;align-items:center;margin-bottom:16px;">
          <img :src="capa" alt="Capa do álbum" :style="styleCapa" />
        </div>
        <transition name="fade-slide">
          <div class="desktop-title impact-title" :style="styleTitulo" key="artista">{{ artista }}</div>
        </transition>
        <transition name="fade-slide">
          <div class="desktop-sub impact-sub" :style="styleLegenda" key="musica">{{ musica }}</div>
        </transition>
        <button @click="togglePlay" :aria-label="playing ? 'Pausar' : 'Tocar'" class="desktop-btn no-outline">
          <svg v-if="!playing" width="60" height="60" viewBox="0 0 54 54" fill="none"><path d="M18 14L40 27L18 40V14Z" fill="#fff"/></svg>
          <svg v-else width="60" height="60" viewBox="0 0 54 54" fill="none"><rect x="16" y="14" width="7" height="26" rx="2" fill="#fff"/><rect x="31" y="14" width="7" height="26" rx="2" fill="#fff"/></svg>
        </button>
        <div class="desktop-city">{{ cidade }}</div>
      </div>
      <!-- Rodapé Desktop -->
      <footer class="desktop-footer">
        <div class="footer-left" v-if="!minimalPlayer">
          <span :class="['footer-menu', {active: activePanel==='flag'}]" @click="togglePanel('flag')">MENU</span>
          <span :class="['footer-menu', {active: activePanel==='music'}]" @click="togglePanel('music')">ÉTER</span>
        </div>
        <div class="footer-center" style="display: flex; align-items: center; justify-content: center; gap: 16px; position: relative; width: 100%;">
          <img src="/logo@capa-removebg-preview.png" alt="Logo" class="footer-logo" />
          <div class="footer-title">Gothic &amp; Wave</div>
        </div>
        <div class="footer-right" v-if="!minimalPlayer">
          <span class="footer-icon-group">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" fill="#fff"/></svg>
            <span style="margin-left:4px;">{{ ouvintes }}</span>
          </span>
          <span class="footer-icon-group" style="margin-left:18px;">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" stroke="#fff" stroke-width="2"/><rect x="9" y="9" width="6" height="6" rx="3" fill="#fff"/></svg>
            <input type="range" min="0" max="1" step="0.01" :value="volume" @input="onVolumeChange" class="footer-slider" />
          </span>
          <span class="footer-icon-group" style="margin-left:18px;">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="#fff" stroke="#181716" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="#181716"/></svg>
          </span>
        </div>
      </footer>
      <!-- Botão da câmera invisível, mas funcional -->
      <button class="camera-btn-desktop" @click="trocarCor" aria-label="Trocar cor de fundo"></button>
    </div>

    <!-- Layout Mobile -->
    <div v-else class="mobile-layout">
      <div v-if="activePanel === ''" class="main-clean main-player-center">
        <div class="player-info player-info-center">
          <div v-if="capa" class="album-cover album-cover-center">
            <img :src="capa" alt="Capa do álbum" :style="styleCapa" />
          </div>
          <div class="player-title" :style="styleTitulo">{{ artista }}</div>
          <div class="player-sub" :style="styleLegenda">{{ musica }}</div>
          <button @click="togglePlay" :aria-label="playing ? 'Pausar' : 'Tocar'" class="player-btn no-outline player-btn-center">
            <svg v-if="!playing" width="54" height="54" viewBox="0 0 54 54" fill="none"><path d="M18 14L40 27L18 40V14Z" fill="#fff"/></svg>
            <svg v-else width="54" height="54" viewBox="0 0 54 54" fill="none"><rect x="16" y="14" width="7" height="26" rx="2" fill="#fff"/><rect x="31" y="14" width="7" height="26" rx="2" fill="#fff"/></svg>
          </button>
          <div class="player-city">{{ cidade }}</div>
        </div>
      </div>
      <!-- Painel: Bandeira -->
      <div v-if="activePanel === 'flag'" class="panel-flag-mobile">
        <div class="panel-flag-gradient"></div>
        <div class="panel-flag-header">
          <div class="footer-title">Gothic &amp; Wave</div>
          <div class="panel-flag-title">#SOVIETWAVE</div>
          <div class="panel-flag-sub">MÚSICA RUSSA MODERNA INSPIRADA EM SONHOS DO PASSADO</div>
        </div>
        <div class="panel-flag-list">
          <div class="panel-flag-section-title">NOSSAS REDES SOCIAIS</div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">📢</span> <a href="#">CANAL</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">💬</span> <a href="#">GRUPO</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">🖇️</span> <a href="#">COMUNIDADE</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">▶️</span> <a href="#">YOUTUBE</a></div>
          <div class="panel-flag-section-title" style="margin-top:18px;">APOIO</div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">💰</span> <a href="#">DOAÇÃO</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">⚡</span> <a href="#">ASSINATURA</a></div>
          <div class="panel-flag-section-title" style="margin-top:18px;">APLICATIVO</div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">▶️</span> <a href="#">GOOGLE PLAY</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">🤖</span> <a href="#">APK ANDROID</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">🪟</span> <a href="#">ZIP DO WINDOWS</a></div>
          <div class="panel-flag-list-item"><span class="sidebar-icon">⬇️</span> <a href="#">ARQUIVO DO M3U PLAYER</a></div>
          <div class="panel-flag-section-title" style="margin-top:18px;">FOTOS CORTESIA DA <a href="#">LOST SLIDES</a></div>
        </div>
      </div>
      <!-- Painel: Histórico -->
      <div v-if="activePanel === 'music'" class="panel-history-mobile">
        <div class="panel-history-gradient"></div>
        <div class="panel-history-header">
          <div class="panel-history-title">ÉTER</div>
          <div class="panel-history-sub">MÚSICAS TOCADAS</div>
        </div>
        <div class="panel-history-list">
          <div v-for="(item, i) in historico" :key="i" class="history-row" style="display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;margin-bottom:1.1em;width:100%;column-gap:24px;">
            <span class="history-time" style="grid-column:1;grid-row:1;color:#bdbdbd;font-size:1.08rem;font-family:'Unbounded','Inter',Arial,sans-serif;letter-spacing:0.04em;text-shadow:0 2px 8px #000;align-self:center;">{{ item.hora }}</span>
            <span class="history-artist" style="grid-column:2;grid-row:1;color:#fff;font-weight:600;font-size:1.08rem;letter-spacing:0.04em;text-shadow:0 2px 8px #000;text-decoration:underline;">{{ item.artista }}</span>
            <span class="history-music" style="grid-column:2;grid-row:2;color:#fff;font-size:1.08rem;font-weight:400;letter-spacing:0.04em;text-shadow:0 2px 8px #000;">{{ item.musica }}</span>
          </div>
        </div>
      </div>
      <!-- Painel: Foto -->
      <div v-if="activePanel === 'photo'" class="panel-box">
        <h2>Trocar fundo</h2>
        <div style="margin:16px 0;">(Em breve: escolha de fotos)</div>
        <button @click="trocarCor" style="background:#ffe066;color:#181716;padding:8px 18px;border:none;border-radius:6px;font-weight:600;">Trocar cor de fundo</button>
      </div>
      <!-- Botão da câmera invisível, mas funcional -->
      <button class="camera-btn-mobile" @click="trocarCor" aria-label="Trocar cor de fundo"></button>
      <!-- Rodapé fixo com 3 ícones -->
      <footer class="footer-bar-clean">
        <button :class="['footer-btn', {active: activePanel==='flag'}]" @click="togglePanel('flag')" aria-label="Opções">
          <span class="footer-icon-wrap"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M4 21V5a1 1 0 0 1 1-1h11.382a1 1 0 0 1 .894.553l.724 1.447H20a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.382a1 1 0 0 0-.894.553l-.724 1.447A1 1 0 0 1 14.618 19H5a1 1 0 0 1-1-1Z" stroke="#181716" stroke-width="2" fill="currentColor"/></svg></span>
        </button>
        <button :class="['footer-btn', {active: activePanel==='music'}]" @click="togglePanel('music')" aria-label="Histórico">
          <span class="footer-icon-wrap"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" stroke="#181716" stroke-width="2" fill="currentColor"/><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/></svg></span>
        </button>
        <button :class="['footer-btn', {active: activePanel==='photo'}]" @click="togglePanel('photo')" aria-label="Foto">
          <span class="footer-icon-wrap"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" stroke="#181716" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="#181716"/></svg></span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

const activePanel = ref('')
const playing = ref(false)
const artista = ref('PRÓTON-4')
const musica = ref('NA ÓRBITA DA TERRA')
const cidade = ref('BELÉM / PA')
const capa = ref('http://31.97.249.57/api/station/thalyson/art/82f9d9bfe4f386237bc16f21-1751521257.jpg')

const historico = ref([])

const bgImages = ['bg.jpg', 'b2.jpeg']
const bgIndex = ref(0)
const isDesktop = ref(window.innerWidth >= 768)
const radioUrl = ref('http://31.97.249.57/listen/thalyson/radio.mp3')
const audioRef = ref(null)
const volume = ref(0.8)
const ouvintes = ref(0)

const playerConfig = ref({ tituloSize: 32, capaSize: 180, legendaSize: 18 })

const mainBgStyle = computed(() => ({
  position: 'relative',
  width: '100%',
  minHeight: '100dvh',
  background: `url('${bgImages[bgIndex.value]}') center center / cover no-repeat fixed`,
  transition: 'background 0.3s',
  border: '4px solid #181716',
  borderRadius: '18px',
  boxSizing: 'border-box',
  padding: '8px',
}))

const minimalPlayer = ref(false)

function togglePanel(panel) {
  if (panel === 'photo') {
    trocarCor();
    return;
  }
  activePanel.value = activePanel.value === panel ? '' : panel
}
function togglePlay() {
  playing.value = !playing.value
  if (audioRef.value) {
    if (playing.value) {
      audioRef.value.play()
    } else {
      audioRef.value.pause()
    }
  }
}
function trocarCor() {
  bgIndex.value = (bgIndex.value + 1) % bgImages.length
}
function handleResize() {
  isDesktop.value = window.innerWidth >= 768
}
function onVolumeChange(e) {
  volume.value = parseFloat(e.target.value)
}
watch(volume, (val) => {
  if (audioRef.value) {
    audioRef.value.volume = val
  }
})
onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (audioRef.value) {
    audioRef.value.volume = volume.value
  }
  fetchCurrentSong();
  setInterval(fetchCurrentSong, 10000);
  if (window.innerWidth < 768) {
    lockScroll()
    // Bloqueia scroll por touch no mobile
    window.addEventListener('touchmove', preventScroll, { passive: false })
  }
  carregarConfig();
})

function preventScroll(e) {
  e.preventDefault()
}

function upper(str) {
  return (str || '').toUpperCase();
}

async function fetchCurrentSong() {
  try {
    const res = await fetch('http://31.97.249.57/api/nowplaying', {
      headers: {
        'Authorization': 'Bearer bd0af7ebc28a76ee:080c11920e7551b3665d74bc4789394e'
      }
    });
    const data = await res.json();

    // Se houver mais de uma estação, pegue a primeira (ou ajuste para sua estação)
    const station = Array.isArray(data) ? data[0] : data;

    // Metadados disponíveis
    const nowPlaying = station.now_playing || {};
    const song = nowPlaying.song || {};
    const art = nowPlaying.art || '';
    const elapsed = nowPlaying.elapsed || 0;
    const duration = nowPlaying.duration || 0;
    const playlist = station.playlist || '';
    const listeners = station.listeners?.current || 0;

    // Exemplo de como popular variáveis reativas
    artista.value = (song.artist || '').toUpperCase();
    const musicaFormatada = (song.title || '').replace(/\s*[\r\n]+\s*/g, ' ').toUpperCase();
    musica.value = musicaFormatada;
    capa.value = song.art && song.art.trim() !== ''
      ? (song.art.startsWith('http') ? song.art : `http://31.97.249.57${song.art}`)
      : '/capa.jpg';
    ouvintes.value = listeners;

    // Adicione ao histórico, se desejar
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const novaEntrada = { hora, artista: artista.value, musica: musicaFormatada };
    if (
      !historico.value.length ||
      historico.value[0].artista !== novaEntrada.artista ||
      historico.value[0].musica !== novaEntrada.musica
    ) {
      historico.value.unshift(novaEntrada);
      if (historico.value.length > 100) historico.value.pop();
    }
  } catch (e) {
    console.error('Erro ao buscar dados do Azurecast', e);
  }
}

function lockScroll() {
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.width = '100vw'
  document.body.style.height = '100vh'
  document.documentElement.style.overflow = 'hidden'
  document.documentElement.style.position = 'fixed'
  document.documentElement.style.width = '100vw'
  document.documentElement.style.height = '100vh'
}

function unlockScroll() {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.height = ''
  document.documentElement.style.overflow = ''
  document.documentElement.style.position = ''
  document.documentElement.style.width = ''
  document.documentElement.style.height = ''
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  unlockScroll()
  window.removeEventListener('touchmove', preventScroll)
})

function carregarConfig() {
  const salvo = localStorage.getItem('playerConfig')
  if (salvo) {
    Object.assign(playerConfig.value, JSON.parse(salvo))
  }
}

const styleTitulo = computed(() => ({
  fontSize: playerConfig.value.tituloSize + 'px',
  fontWeight: 'bold',
  color: '#fff',
  letterSpacing: '0.12em',
  textShadow: '0 2px 12px #000, 0 1px 0 #fff',
  lineHeight: 1.1,
  marginBottom: '0.2em',
  textAlign: 'center',
}))
const styleCapa = computed(() => ({
  maxWidth: playerConfig.value.capaSize + 'px',
  maxHeight: playerConfig.value.capaSize + 'px',
  borderRadius: '12px',
  boxShadow: '0 2px 12px #0008',
}))
const styleLegenda = computed(() => ({
  fontSize: playerConfig.value.legendaSize + 'px',
  color: '#fff',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textShadow: '0 2px 8px #000',
  lineHeight: 1.1,
  marginBottom: '0.5em',
  textAlign: 'center',
}))

function toggleMinimalPlayer() {
  minimalPlayer.value = !minimalPlayer.value
}
</script>

<style scoped>
.main-bg {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  border: 4px solid #181716;
  border-radius: 18px;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
}
.bg-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.68);
  z-index: 1;
  pointer-events: none;
}
.desktop-layout, .mobile-layout {
  position: relative;
  z-index: 2;
}
.impact-title, .desktop-title, .player-title, .sidebar-title, .panel-flag-title, .panel-history-title {
  color: #fff;
  text-shadow: 0 2px 12px #000, 0 1px 0 #fff;
}
.impact-sub, .desktop-sub, .player-sub, .sidebar-desc, .panel-flag-sub, .panel-history-sub {
  color: #fff;
  text-shadow: 0 2px 8px #000;
}
.footer-menu, .footer-btn, .footer-icon-group, .footer-slider, .desktop-city, .player-city {
  text-shadow: 0 2px 8px #000;
  color: #fff;
}
.footer-menu.active, .footer-menu:focus, .footer-menu:hover {
  color: #fff;
  background: rgba(255,255,255,0.08);
  box-shadow: 0 2px 8px #fff2;
}
.footer-slider {
  accent-color: #fff;
}
.desktop-btn, .player-btn {
  background: #fff;
  color: #181716;
}
.desktop-btn:focus, .player-btn:focus, .desktop-btn:hover, .player-btn:hover {
  background: #e0e0e0;
  box-shadow: 0 4px 16px #fff4;
}
.desktop-btn svg, .player-btn svg {
  color: #181716;
}
.desktop-sidebar, .desktop-history, .panel-flag-mobile, .panel-history-mobile, .panel-box {
  background: #050000d7 !important;
  border: none !important;
}
.history-time, .panel-list-time, .bloco-horario {
  font-family: 'Fira Mono', 'Menlo', 'Consolas', monospace;
  color: #fff;
  letter-spacing: 0.04em;
}
.panel-section-title, .panel-list-item a, .history-artist, .history-musica, .bloco-historico-artista, .bloco-historico-musica {
  color: #fff;
  text-shadow: 0 2px 8px #000;
}
@media (max-width: 767px) {
  html, body {
    overflow: hidden !important;
    height: 100vh !important;
    position: fixed !important;
    width: 100vw !important;
    overscroll-behavior: none !important;
    touch-action: none !important;
  }
  .main-bg, .mobile-layout, .panel-flag-mobile, .panel-history-mobile, .panel-box {
    overflow: hidden !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
  }
  .footer-bar-clean {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 56px;
    padding: 10px 0 8px 0;
    z-index: 100;
    border: none;
    box-shadow: none;
  }
  .footer-btn {
    background: #181716;
    border: none;
    outline: none;
    box-shadow: 0 2px 8px #0008;
    padding: 0;
    margin: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
    color: #fff;
    font-size: 1.3rem;
    touch-action: manipulation;
  }
  .footer-btn.active, .footer-btn:focus, .footer-btn:hover {
    background: #fff;
    color: #181716;
    box-shadow: 0 4px 16px #fff4;
    transform: scale(1.08);
  }
  .footer-icon-wrap {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer-btn svg {
    color: inherit;
    width: 32px;
    height: 32px;
    filter: drop-shadow(0 1px 2px #0008);
    transition: color 0.2s, filter 0.2s;
  }
}
html, body {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overscroll-behavior: none;
  touch-action: none;
}
@media (max-width: 767px) {
  html, body {
    overflow-y: hidden !important;
    height: 100vh !important;
    position: fixed !important;
    width: 100vw !important;
  }
  .main-bg {
    background-attachment: scroll;
    background-position: center center;
    background-size: cover;
    border-width: 3px;
    border-radius: 12px;
    padding: 4px;
    overflow: hidden;
  }
  .panel-full {
    background: rgba(0,0,0,0.85);
    padding-top: 32px;
    min-height: calc(100vh - 64px);
    box-sizing: border-box;
  }
  .panel-header {
    padding: 0 0 18px 0;
    text-align: center;
  }
  .panel-title {
    font-size: 2.1rem;
    font-weight: 700;
    color: #fffbe6;
    letter-spacing: 0.12em;
    margin-bottom: 0.2em;
    text-shadow: 0 2px 12px #000, 0 1px 0 #ffe066;
  }
  .panel-sub {
    font-size: 1.2rem;
    color: #bdbdbd;
    margin-bottom: 0.2em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-tags {
    font-size: 1.1rem;
    color: #ffe066;
    letter-spacing: 0.08em;
    margin-bottom: 0.5em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-list {
    font-size: 1.15rem;
    padding: 0 10px;
  }
  .panel-list-music {
    font-size: 1.15rem;
    margin-bottom: 0.7em;
  }
  .panel-list-time {
    min-width: 48px;
    color: #bdbdbd;
    font-size: 1.08rem;
  }
  .panel-list-track {
    color: #fff;
    font-weight: 400;
    letter-spacing: 0.04em;
  }
  .panel-history-mobile {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 64px;
    width: 100vw;
    min-height: calc(100vh - 64px);
    background: rgba(10,10,10,0.85);
    box-shadow: 0 4px 32px #000a;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    padding: 0;
  }
  .panel-history-gradient {
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 110px;
    background: linear-gradient(to bottom, #111 60px, transparent 120px);
    z-index: 1;
  }
  .panel-history-header {
    width: 100%;
    padding: 32px 0 18px 0;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  .panel-history-title {
    font-size: 2.4rem;
    font-weight: 700;
    color: #fffbe6;
    letter-spacing: 0.14em;
    margin-bottom: 0.2em;
    text-shadow: 0 0 16px #ffe066, 0 2px 12px #000, 0 1px 0 #ffe066;
  }
  .panel-history-sub {
    font-size: 1.3rem;
    color: #bdbdbd;
    margin-bottom: 0.2em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-history-tags {
    font-size: 1.18rem;
    color: #ffe066;
    letter-spacing: 0.10em;
    margin-bottom: 0.5em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-history-list {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    padding: 0 24px 18px 24px;
    margin-top: 0.5em;
    z-index: 2;
  }
  .panel-history-music {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.22rem;
    margin-bottom: 1.1em;
    text-align: left;
    width: 100%;
  }
  .panel-history-time {
    color: #bdbdbd;
    font-size: 1.08rem;
    margin-bottom: 0.1em;
    font-family: 'Unbounded', 'Inter', Arial, sans-serif;
    letter-spacing: 0.04em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-history-artist {
    color: #fff;
    font-weight: 600;
    font-size: 1.18rem;
    letter-spacing: 0.04em;
    margin-bottom: 0.1em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-history-track {
    color: #ffe066;
    font-size: 1.08rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-shadow: 0 2px 8px #000;
    margin-bottom: 0.1em;
  }
  .panel-flag-mobile {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 64px;
    width: 100vw;
    min-height: calc(100vh - 64px);
    background: rgba(10,10,10,0.85);
    box-shadow: 0 4px 32px #000a;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    padding: 0;
  }
  .panel-flag-gradient {
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 110px;
    background: linear-gradient(to bottom, #111 60px, transparent 120px);
    z-index: 1;
  }
  .panel-flag-header {
    width: 100%;
    padding: 32px 0 18px 0;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  .panel-flag-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffe066;
    letter-spacing: 0.14em;
    margin-bottom: 0.2em;
    text-shadow: 0 0 16px #ffe066, 0 2px 12px #000, 0 1px 0 #ffe066;
  }
  .panel-flag-sub {
    font-size: 1.18rem;
    color: #bdbdbd;
    margin-bottom: 0.2em;
    text-shadow: 0 2px 8px #000;
  }
  .panel-info-list {
    display: flex;
    flex-direction: column;
    gap: 0.7em;
    margin-top: 1.5em;
  }
  .panel-info-row {
    display: grid;
    grid-template-columns: 90px 1fr;
    align-items: center;
    font-size: 1.08rem;
    color: #fff;
    text-shadow: 0 2px 8px #000;
    border-bottom: 1px solid #fff2;
    padding: 0.3em 0;
  }
  .panel-info-label {
    font-weight: 700;
    color: #fff;
    opacity: 0.85;
    letter-spacing: 0.04em;
  }
  .panel-info-value {
    font-weight: 400;
    color: #fff;
    opacity: 0.95;
    letter-spacing: 0.04em;
  }
}

/* DESKTOP */
.desktop-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}
.desktop-player {
  width: 100vw;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 48px;
  margin-bottom: 32px;
}
.desktop-title {
  font-size: 2.2rem;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.08em;
  margin-bottom: 0.2em;
  text-align: center;
}
.desktop-sub {
  font-size: 1.3rem;
  color: #fff;
  font-weight: 300;
  letter-spacing: 0.08em;
  margin-bottom: 1.2em;
  text-align: center;
}
.desktop-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px auto 0 auto;
  background: none !important;
  border: none;
  box-shadow: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  color: #fff !important;
}
.desktop-btn svg {
  width: 54px;
  height: 54px;
  color: #fff !important;
  display: block;
  transition: color 0.2s, filter 0.2s;
}
.desktop-btn:focus, .desktop-btn:hover {
  background: rgba(255,255,255,0.08) !important;
  box-shadow: 0 2px 8px #fff2;
  transform: scale(1.06);
}
.desktop-city {
  font-size: 1.3rem;
  color: #e0e0e0;
  font-weight: 300;
  letter-spacing: 0.08em;
  margin-top: 0.5em;
  text-align: center;
}
.desktop-footer {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: #050000d7 !important;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 40px;
  z-index: 200;
  font-family: 'Unbounded', 'Inter', Arial, sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
}
.footer-left, .footer-center, .footer-right {
  display: flex;
  align-items: center;
}
.footer-center {
  flex: 1;
  justify-content: center;
}
.footer-logo {
  height: 30px;
  filter: brightness(1.2);
}
.footer-menu {
  margin-right: 32px;
  font-size: 1.12rem;
  color: var(--color-text-soft);
  font-weight: 600;
  letter-spacing: 0.10em;
  cursor: pointer;
  padding: 6px 18px;
  border-radius: 8px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  outline: none;
}
.footer-menu.active,
.footer-menu:focus,
.footer-menu:hover {
  color: var(--color-accent);
  background: rgba(255, 224, 102, 0.08);
  box-shadow: 0 2px 8px #0002;
}
.footer-icon-group {
  display: flex;
  align-items: center;
  font-size: 1.18rem;
  color: var(--color-text);
  gap: 6px;
}
.footer-slider {
  margin-left: 8px;
  width: 100px;
  accent-color: var(--color-accent);
  background: transparent;
  border-radius: 6px;
  height: 4px;
  transition: accent-color 0.2s;
}
.footer-slider:focus {
  outline: 2px solid var(--color-accent);
}
.footer-btn {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  transition: background 0.18s, box-shadow 0.18s;
}
.footer-btn.active, .footer-btn:focus, .footer-btn:hover {
  background: rgba(255, 224, 102, 0.10);
  box-shadow: 0 2px 8px #0002;
}
.footer-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}
.footer-btn svg {
  color: var(--color-text);
  filter: drop-shadow(0 1px 2px #0008);
  transition: color 0.2s, filter 0.2s;
  width: 32px;
  height: 32px;
}
.footer-btn.active .footer-icon-wrap,
.footer-btn:focus .footer-icon-wrap,
.footer-btn:hover .footer-icon-wrap {
  background: none;
  box-shadow: none;
}
.footer-btn.active svg,
.footer-btn:focus svg,
.footer-btn:hover svg {
  color: var(--color-accent);
  filter: drop-shadow(0 0 7px #ffe066cc) drop-shadow(0 1px 2px #0008);
}
.desktop-btn, .player-btn {
  background: var(--color-accent);
  color: var(--color-background);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px #0004;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  outline: none;
}
.desktop-btn:focus, .player-btn:focus, .desktop-btn:hover, .player-btn:hover {
  background: var(--color-accent-soft);
  box-shadow: 0 4px 16px #0006;
  transform: scale(1.06);
}
.desktop-btn svg, .player-btn svg {
  width: 44px;
  height: 44px;
  color: var(--color-background);
  transition: color 0.2s, filter 0.2s;
}
.desktop-title, .player-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: 0.14em;
  text-shadow: 0 0 24px var(--color-accent), 0 2px 12px #000, 0 1px 0 var(--color-accent);
  line-height: 1.08;
  margin-bottom: 0.18em;
  text-align: center;
  filter: contrast(1.2) brightness(1.1);
  transition: color 0.4s, text-shadow 0.4s;
}
.desktop-sub, .player-sub {
  font-size: 1.18rem;
  color: var(--color-text);
  font-weight: 500;
  letter-spacing: 0.10em;
  text-shadow: 0 2px 8px #000, 0 0 8px var(--color-accent-soft);
  line-height: 1.1;
  margin-bottom: 0.5em;
  text-align: center;
  filter: blur(0.2px) contrast(1.1);
  transition: color 0.4s, text-shadow 0.4s;
}
.desktop-city, .player-city {
  font-size: 1.08rem;
  color: var(--color-text-soft);
  font-weight: 400;
  letter-spacing: 0.08em;
  margin-top: 0.5em;
  text-align: center;
}
/* Microanimação fade para painéis e menus */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

/* Sidebar Desktop */
.desktop-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 64px;
  width: 340px;
  background: rgba(24, 23, 22, 0.98);
  color: #fff;
  z-index: 300;
  box-shadow: 2px 0 16px #0008;
  display: flex;
  flex-direction: column;
  padding: 0 32px 24px 32px;
  overflow-y: auto;
  font-family: 'Unbounded', 'Inter', Arial, sans-serif;
}
.sidebar-header {
  padding: 32px 0 18px 0;
  text-align: left;
}
.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.12em;
  margin-bottom: 0.2em;
}
.sidebar-desc {
  font-size: 1.02rem;
  color: #e0e0e0;
  margin-bottom: 0.5em;
  line-height: 1.3;
}
.sidebar-section {
  margin-bottom: 18px;
}
.sidebar-section-title {
  font-size: 1.08rem;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.5em;
  margin-top: 1.2em;
  letter-spacing: 0.04em;
  border-bottom: 1px solid #fff2;
  padding-bottom: 2px;
}
.sidebar-link {
  font-size: 1.05rem;
  color: #fff;
  font-weight: 400;
  margin-bottom: 0.2em;
  margin-left: 0.5em;
  display: flex;
  align-items: center;
  gap: 8px;
  border-left: 2px solid #fff2;
  padding-left: 10px;
}
.sidebar-link a {
  color: #fff;
  text-decoration: underline;
  transition: color 0.2s;
}
.sidebar-link a:hover {
  color: #fff !important;
  text-decoration: underline;
}
.sidebar-icon {
  font-size: 1.1em;
  width: 1.5em;
  text-align: center;
  opacity: 0.8;
}
.sidebar-footer {
  margin-top: 32px;
  font-size: 0.95rem;
  color: #bdbdbd;
}
.sidebar-desc2 a {
  color: #fff !important;
  text-decoration: underline;
}
.sidebar-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  margin-top: 1.5em;
}
.sidebar-info-row {
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
  font-size: 1.08rem;
  color: #fff;
  text-shadow: 0 2px 8px #000;
  border-bottom: 1px solid #fff2;
  padding: 0.3em 0;
}
.sidebar-info-label {
  font-weight: 700;
  color: #fff;
  opacity: 0.85;
  letter-spacing: 0.04em;
}
.sidebar-info-value {
  font-weight: 400;
  color: #fff;
  opacity: 0.95;
  letter-spacing: 0.04em;
}

/* Sidebar Histórico Desktop */
.desktop-history {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 64px;
  width: 340px;
  background: rgba(24, 23, 22, 0.98);
  color: #fff;
  z-index: 300;
  box-shadow: 2px 0 16px #0008;
  display: flex;
  flex-direction: column;
  padding: 0 32px 24px 32px;
  overflow-y: auto;
  font-family: 'Unbounded', 'Inter', Arial, sans-serif;
}
.history-header {
  text-align: center;
  margin-bottom: 18px;
  margin-top: 18px;
  border-bottom: 1px solid #fff2;
  padding-bottom: 8px;
}
.history-artist-label {
  font-size: 2.1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.14em;
  margin-bottom: 0.2em;
  text-shadow: 0 2px 12px #000, 0 1px 0 #fff;
}
.history-artist-main {
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 0 2px 8px #000;
}
.history-tags {
  font-size: 1.1rem;
  color: #ffe066;
  letter-spacing: 0.08em;
  margin-bottom: 0.5em;
  text-shadow: 0 2px 8px #000;
}
.history-list {
  overflow: hidden !important;
}
.history-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.08rem;
  margin-bottom: 0.7em;
}
.history-artista {
  font-weight: 600;
  font-size: 1.08rem;
  letter-spacing: 0.04em;
  margin-bottom: 0.1em;
  text-shadow: 0 2px 8px #000;
  text-decoration: underline;
  color: #ffe066;
}
.history-musica {
  color: #fff !important;
  font-size: 1.08rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px #000;
  margin-left: 0;
}
.camera-btn-desktop {
  position: fixed;
  bottom: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  z-index: 400;
  cursor: pointer;
  opacity: 0;
  pointer-events: auto;
}

.no-outline:focus {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}
.desktop-btn:focus {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}
.footer-menu:focus {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

.camera-btn-mobile {
  position: fixed;
  bottom: 80px;
  right: 18px;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  z-index: 400;
  cursor: pointer;
  opacity: 0;
  pointer-events: auto;
}

.footer-bar-clean {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 56px;
  padding: 10px 0 8px 0;
  z-index: 100;
  border: none;
  box-shadow: none;
}
.footer-btn {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}
.footer-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
}
.footer-btn svg {
  color: #fff;
  filter: drop-shadow(0 1px 2px #0008);
  transition: color 0.2s, filter 0.2s;
}
.footer-btn.active .footer-icon-wrap {
  background: none;
  box-shadow: none;
}
.footer-btn.active svg {
  color: #fff;
  filter: drop-shadow(0 0 7px #ffe066cc) drop-shadow(0 1px 2px #0008);
}

/* CSS para destaque visual */
.bloco-programacao {
  margin-bottom: 32px;
  padding: 18px 0 0 0;
}
.bloco-cabecalho {
  text-align: center;
  margin-bottom: 12px;
}
.bloco-nome {
  font-size: 2.1rem;
  font-weight: 700;
  color: #fffbe6;
  letter-spacing: 0.14em;
  margin-bottom: 0.2em;
  text-shadow: 0 0 16px #ffe066, 0 2px 12px #000, 0 1px 0 #ffe066;
}
.bloco-programacao.destaque .bloco-nome {
  color: #ffe066;
  text-shadow: 0 0 24px #ffe066, 0 2px 12px #000, 0 1px 0 #ffe066;
}
.bloco-horario {
  font-size: 1.2rem;
  color: #bdbdbd;
  margin-bottom: 0.2em;
  text-shadow: 0 2px 8px #000;
}
.bloco-tags {
  font-size: 1.1rem;
  color: #ffe066;
  letter-spacing: 0.08em;
  margin-bottom: 0.5em;
  text-shadow: 0 2px 8px #000;
}
.bloco-historico-list {
  margin-top: 8px;
}
.bloco-historico-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 1.08rem;
  margin-bottom: 0.5em;
}
.bloco-historico-hora {
  color: #bdbdbd;
  min-width: 48px;
  font-size: 1.02rem;
}
.bloco-historico-artista {
  color: #fff;
  font-weight: 600;
  font-size: 1.08rem;
  letter-spacing: 0.04em;
  margin-bottom: 0.1em;
  text-shadow: 0 2px 8px #000;
  text-decoration: underline;
}
.bloco-historico-musica {
  color: #fff;
  font-size: 1.08rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  margin-left: 8px;
}
.impact-title {
  font-family: 'Unbounded', 'Inter', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: 0.16em;
  text-shadow: 0 0 24px var(--color-accent), 0 2px 12px #000, 0 1px 0 var(--color-accent);
  line-height: 1.08;
  margin-bottom: 0.18em;
  text-align: center;
  filter: contrast(1.2) brightness(1.1);
  transition: color 0.4s, text-shadow 0.4s;
}
.impact-sub {
  font-family: 'Unbounded', 'Inter', Arial, sans-serif;
  font-size: 1.25rem;
  color: var(--color-text);
  font-weight: 500;
  letter-spacing: 0.10em;
  text-shadow: 0 2px 8px #000, 0 0 8px var(--color-accent-soft);
  line-height: 1.1;
  margin-bottom: 0.5em;
  text-align: center;
  filter: blur(0.2px) contrast(1.1);
  transition: color 0.4s, text-shadow 0.4s;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
@media (max-width: 767px) {
  .main-player-center {
    min-height: 100vh !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 80px;
  }
  .player-info-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    max-width: 400px;
    margin: 0 auto;
  }
  .album-cover-center {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    margin-top: 0;
  }
  .player-title, .player-sub {
    text-align: center;
    margin-bottom: 0.18em;
    color: #fff;
    text-shadow: 0 2px 8px #000;
    font-weight: 600;
    letter-spacing: 0.08em;
  }
  .player-btn-center {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 18px auto 0 auto;
    background: none;
    border: none;
    box-shadow: none;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  }
  .player-btn-center svg {
    width: 54px;
    height: 54px;
    color: #fff;
  }
  .player-btn-center:focus, .player-btn-center:hover {
    background: rgba(255,255,255,0.08);
    box-shadow: 0 2px 8px #fff2;
    transform: scale(1.06);
  }
  .player-city {
    margin-top: 0.7em;
    color: #e0e0e0;
    font-size: 1.08rem;
    text-align: center;
  }
}
.desktop-history .history-row .history-time {
  color: #bdbdbd !important;
  font-size: 1.08rem !important;
  font-family: 'Unbounded','Inter',Arial,sans-serif;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px #000;
  align-self: center;
}
.desktop-history .history-row .history-artist, .desktop-history .history-row .history-music, .history-artist, .history-music {
  color: #fff !important;
  font-size: 0.80rem !important;
  font-weight: 400 !important;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px #000;
  margin-left: 0;
  margin-bottom: 0.1em;
  text-decoration: none;
}
.footer-title {
  font-family: 'UnifrakturCook', 'Cinzel', serif;
  font-size: 2.2rem !important;
  color: #fff;
  letter-spacing: 0.14em;
  text-align: center;
  margin-bottom: 0.2em;
  text-shadow: 0 2px 8px #000, 0 1px 0 #fff;
  font-weight: 700;
}
.sidebar-title, .panel-flag-title {
  font-size: 1.25rem !important;
}
.footer-title-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: none;
  transition: color 0.2s, filter 0.2s;
}
.footer-title-btn:hover {
  filter: brightness(1.3) drop-shadow(0 2px 8px #fff8);
}
.oculto {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.95);
  transition: opacity 0.4s, transform 0.4s;
}
.desktop-player.minimal {
  border: none !important;
  box-shadow: none !important;
}
</style> 