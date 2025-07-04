<template>
  <div>
    <h1>Painel Admin</h1>
    <nav>
      <router-link to="/admin/programas">Programas</router-link> |
      <router-link to="/admin/agendamentos">Agendamentos</router-link> |
      <router-link to="/admin/playlists">Playlists</router-link>
    </nav>
    <div style="margin-top:2rem">
      <button @click="iniciarTransmissao">Iniciar Transmissão</button>
      <button @click="pararTransmissao">Parar Transmissão</button>
      <p>Status: <span :style="{color: status === 'online' ? 'green' : 'red'}">{{ status }}</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const status = ref('offline')
const artista = ref('')
const musica = ref('')
const cidade = ref('')
const historico = ref([])

async function atualizarStatus() {
  const res = await fetch('/api/ao-vivo')
  const data = await res.json()
  status.value = data.status
}

async function iniciarTransmissao() {
  await fetch('/api/ao-vivo/iniciar', { method: 'POST', headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
  atualizarStatus()
}

async function pararTransmissao() {
  await fetch('/api/ao-vivo/parar', { method: 'POST', headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
  atualizarStatus()
}

onMounted(atualizarStatus)
</script> 