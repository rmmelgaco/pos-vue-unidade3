<script setup>
import {ref} from 'vue';

const torneios = ref([])
const mensagem = ref(null)

fetch('./src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => torneios.value = dados.torneios)
    .catch(error => mensagem.value = error)
</script>

<template>
  <h1>Torneios</h1>
  {{ mensagem }}
  <RouterLink :to='`/torneio/${torneio.codigo}`'
              v-for='(torneio, indice) in torneios'
              :key='`torneio${indice}`'>
    <div
        class='card'
    >
      {{ torneio.nome }}
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  cursor: pointer;
  margin: 10px;
  padding: 10px
}

.card:hover {
  background-color: #bde0fe;
}
</style>