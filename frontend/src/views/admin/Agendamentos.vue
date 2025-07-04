<template>
  <div>
    <h2>Agendamentos</h2>
    <form @submit.prevent="salvar">
      <select v-model="form.programaId" required>
        <option value="">Selecione o programa</option>
        <option v-for="p in programas" :key="p.id" :value="p.id">{{ p.nome }}</option>
      </select>
      <select v-model="form.playlistId" required>
        <option value="">Selecione a playlist</option>
        <option v-for="pl in playlists" :key="pl.id" :value="pl.id">{{ pl.nome }}</option>
      </select>
      <input v-model="form.inicio" type="datetime-local" required />
      <input v-model="form.fim" type="datetime-local" required />
      <input v-model="form.descricao" placeholder="Descrição" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Adicionar' }}</button>
      <button v-if="form.id" @click.prevent="reset">Cancelar</button>
    </form>
    <ul>
      <li v-for="a in agendamentos" :key="a.id">
        <strong>{{ a.Programa?.nome || '---' }}</strong> - {{ new Date(a.inicio).toLocaleString() }} até {{ new Date(a.fim).toLocaleString() }}
        <button @click="editar(a)">Editar</button>
        <button @click="deletar(a.id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const agendamentos = ref([])
const programas = ref([])
const playlists = ref([])
const form = ref({ programaId: '', playlistId: '', inicio: '', fim: '', descricao: '', id: null })

async function carregar() {
  agendamentos.value = await (await fetch('/api/agendamentos')).json()
  programas.value = await (await fetch('/api/programas')).json()
  playlists.value = await (await fetch('/api/playlists')).json()
}

async function salvar() {
  const token = localStorage.getItem('token')
  const method = form.value.id ? 'PUT' : 'POST'
  const url = form.value.id ? `/api/agendamentos/${form.value.id}` : '/api/agendamentos'
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({
      programaId: form.value.programaId,
      playlistId: form.value.playlistId,
      inicio: form.value.inicio,
      fim: form.value.fim,
      descricao: form.value.descricao
    })
  })
  reset()
  carregar()
}

function editar(a) {
  form.value = {
    id: a.id,
    programaId: a.programaId,
    playlistId: a.playlistId,
    inicio: a.inicio.slice(0, 16),
    fim: a.fim.slice(0, 16),
    descricao: a.descricao
  }
}

async function deletar(id) {
  const token = localStorage.getItem('token')
  await fetch(`/api/agendamentos/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } })
  carregar()
}

function reset() {
  form.value = { programaId: '', playlistId: '', inicio: '', fim: '', descricao: '', id: null }
}

onMounted(carregar)
</script> 