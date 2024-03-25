<script setup>
import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter()
const {codigoCampeonato} = defineProps(['codigoCampeonato'])
const campeonatos = ref(null)
const mensagem = ref('')

fetch('../src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => campeonatos.value = dados.campeonatos.find(campeonato => campeonato.codigo === +codigoCampeonato))
    .catch(error => mensagem.value = error)

watch(campeonatos, (novoCampeonato) => {
  if (!novoCampeonato) {
    router.replace({
      path: '/campeonatos',
      query: {
        msg: 'Campeonato não encontrado'
      }
    })
  }
})
</script>

<template>
  <div>
    {{ mensagem }}
    <div v-if='campeonatos'>
      <h2>{{ campeonatos.nome }}</h2>
    </div>
  </div>
  <main class='tab_menu'>
    <RouterLink class='tab_item' :to="{ name: 'jogosCampeonato'}">Jogos</RouterLink>
    <RouterLink class='tab_item' :to="{ name: 'classificacaoCampeonato'}">Classificação</RouterLink>
  </main>
  <RouterView/>
</template>

<style scoped>
.tab_menu {
  margin: 5px;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #e75f52;
}
.tab_item {
  padding: 10px;
  color: #f4a255;
  flex: 1;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>