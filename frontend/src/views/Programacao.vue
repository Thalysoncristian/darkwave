<template>
  <div>
    <h1>Programação</h1>
    <ul>
      <li v-for="ag in agendamentos" :key="ag.id">
        <strong>{{ ag.Programa?.nome || '---' }}</strong> -
        {{ new Date(ag.inicio).toLocaleString() }} até {{ new Date(ag.fim).toLocaleString() }}<br>
        <em>{{ ag.descricao }}</em>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const agendamentos = ref([])

onMounted(async () => {
  const res = await fetch('/api/agendamentos')
  agendamentos.value = await res.json()
})
</script> 