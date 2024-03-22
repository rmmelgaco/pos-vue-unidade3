<script setup>
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute()
const router = useRouter()
const {codigoTorneio} = route.params
const torneio = ref(null)
const mensagem = ref('')

fetch('../src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => torneio.value = dados.torneios.find(torneio => torneio.codigo === +codigoTorneio))
    .catch(error => mensagem.value = error)

watch(torneio, (novoTorneio) => {
  if (!novoTorneio) {
    router.replace({
      path: '/torneios',
      query: {
        msg: 'Torneio não encontrado'
      }
    })
  }
})
</script>

<template>
  <div>
    {{ mensagem }}
    <div v-if='torneio'>
      <h2>{{ torneio.nome }}</h2>
    </div>
  </div>
</template>

<style scoped>
</style>