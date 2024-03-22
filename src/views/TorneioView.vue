<script setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute()
const {codigoTorneio} = route.params
const torneio = ref(null)
const mensagem = ref('')

fetch('../src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => torneio.value = dados.torneios.find(torneio => torneio.codigo === +codigoTorneio))
    .catch(error => mensagem.value = error)
</script>

<template>
  {{ mensagem }}
  <div v-if='torneio'>
    <h2>{{ torneio.nome }}</h2>

  </div>
  </template>

<style scoped>
</style>