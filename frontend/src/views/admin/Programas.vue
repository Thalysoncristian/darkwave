<template>
  <div>
    <h2>Programas</h2>
    <form @submit.prevent="salvar">
      <input v-model="form.nome" placeholder="Nome" required />
      <input v-model="form.descricao" placeholder="Descrição" required />
      <button type="submit">{{ form.id ? 'Atualizar' : 'Adicionar' }}</button>
      <button v-if="form.id" @click.prevent="reset">Cancelar</button>
    </form>
    <ul>
      <li v-for="p in programas" :key="p.id">
        <strong>{{ p.nome }}</strong> - {{ p.descricao }}
        <button @click="editar(p)">Editar</button>
        <button @click="deletar(p.id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const programas = ref([])
const form = ref({ nome: '', descricao: '', id: null })

async function carregar() {
  const res = await fetch('/api/programas')
  programas.value = await res.json()
}

async function salvar() {
  const token = localStorage.getItem('token')
  const method = form.value.id ? 'PUT' : 'POST'
  const url = form.value.id ? `/api/programas/${form.value.id}` : '/api/programas'
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({ nome: form.value.nome, descricao: form.value.descricao })
  })
  reset()
  carregar()
}

function editar(p) {
  form.value = { ...p }
}

async function deletar(id) {
  const token = localStorage.getItem('token')
  await fetch(`/api/programas/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } })
  carregar()
}

function reset() {
  form.value = { nome: '', descricao: '', id: null }
}

onMounted(carregar)
</script> 