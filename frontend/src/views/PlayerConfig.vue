<template>
  <div class="config-container">
    <h2>Configurações do Player</h2>
    <form @submit.prevent="salvarConfig">
      <div class="config-item">
        <label for="tituloSize">Tamanho do Título (px):</label>
        <input id="tituloSize" type="number" v-model.number="config.tituloSize" min="10" max="80" />
      </div>
      <div class="config-item">
        <label for="capaSize">Tamanho da Capa (px):</label>
        <input id="capaSize" type="number" v-model.number="config.capaSize" min="50" max="400" />
      </div>
      <div class="config-item">
        <label for="legendaSize">Tamanho das Legendas (px):</label>
        <input id="legendaSize" type="number" v-model.number="config.legendaSize" min="8" max="40" />
      </div>
      <div class="config-actions">
        <button type="submit">Salvar</button>
        <button type="button" @click="restaurarPadrao">Restaurar Padrão</button>
      </div>
    </form>
    <div class="config-preview">
      <h3 style="margin-top:32px;">Pré-visualização</h3>
      <div :style="previewStyle.titulo">Título Exemplo</div>
      <div :style="previewStyle.capa" class="preview-capa">Capa</div>
      <div :style="previewStyle.legenda">Legenda Exemplo</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const PADRAO = {
  tituloSize: 32,
  capaSize: 180,
  legendaSize: 18
}

const config = ref({ ...PADRAO })

onMounted(() => {
  const salvo = localStorage.getItem('playerConfig')
  if (salvo) {
    Object.assign(config.value, JSON.parse(salvo))
  }
})

function salvarConfig() {
  localStorage.setItem('playerConfig', JSON.stringify(config.value))
  alert('Configurações salvas!')
}

function restaurarPadrao() {
  Object.assign(config.value, PADRAO)
  salvarConfig()
}

const previewStyle = computed(() => ({
  titulo: {
    fontSize: config.value.tituloSize + 'px',
    fontWeight: 'bold',
    color: '#ffe066',
    margin: '16px 0 8px 0',
    textShadow: '0 0 16px #ffe066,0 2px 12px #000,0 1px 0 #ffe066',
  },
  capa: {
    width: config.value.capaSize + 'px',
    height: config.value.capaSize + 'px',
    background: '#23232b',
    color: '#ffe066',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    margin: '0 auto 12px auto',
    fontSize: '1.2rem',
    boxShadow: '0 2px 12px #0008',
  },
  legenda: {
    fontSize: config.value.legendaSize + 'px',
    color: '#fffbe6',
    margin: '8px 0',
    textShadow: '0 2px 8px #000',
  }
}))
</script>

<style scoped>
.config-container {
  max-width: 420px;
  margin: 32px auto;
  background: #181716;
  color: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0005;
  padding: 32px 24px 24px 24px;
}
.config-item {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}
.config-item label {
  margin-bottom: 4px;
  font-size: 1rem;
}
.config-item input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ffe066;
  font-size: 1rem;
  background: #23232b;
  color: #ffe066;
}
.config-actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}
.config-actions button {
  background: #ffe066;
  color: #181716;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
}
.config-preview {
  margin-top: 32px;
  background: #23232b;
  border-radius: 10px;
  padding: 18px 12px;
  text-align: center;
}
.preview-capa {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 