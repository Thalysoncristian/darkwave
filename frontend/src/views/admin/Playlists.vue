<template>
  <div>
    <h2>Playlists</h2>
    <form @submit.prevent="salvar">
      <input v-model="form.nome" placeholder="Nome" required />
      <input v-model="form.descricao" placeholder="Descrição" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Adicionar' }}</button>
      <button v-if="form.id" @click.prevent="reset">Cancelar</button>
    </form>
    <ul>
      <li v-for="pl in playlists" :key="pl.id">
        <strong>{{ pl.nome }}</strong> - {{ pl.descricao }}
        <button @click="editar(pl)">Editar</button>
        <button @click="deletar(pl.id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const playlists = ref([])
const form = ref({ nome: '', descricao: '', id: null })

async function carregar() {
  playlists.value = await (await fetch('/api/playlists')).json()
}

async function salvar() {
  const token = localStorage.getItem('token')
  const method = form.value.id ? 'PUT' : 'POST'
  const url = form.value.id ? `/api/playlists/${form.value.id}` : '/api/playlists'
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({ nome: form.value.nome, descricao: form.value.descricao })
  })
  reset()
  carregar()
}

function editar(pl) {
  form.value = { ...pl }
}

async function deletar(id) {
  const token = localStorage.getItem('token')
  await fetch(`/api/playlists/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } })
  carregar()
}

function reset() {
  form.value = { nome: '', descricao: '', id: null }
}

onMounted(carregar)
</script> 