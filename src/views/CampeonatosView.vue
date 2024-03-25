<script setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute()
const {msg} = route.query
const campeonatos = ref([])
const mensagem = ref(null)

fetch('./src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => campeonatos.value = dados.campeonatos)
    .catch(error => mensagem.value = error)
</script>

<template>
  <h1>Campeonatos</h1>
  <div v-if='msg'><span class="alert alert-danger" role="alert">{{ msg }}</span><br/><br/></div>

  {{ mensagem }}
  <RouterLink :to='`/campeonato/${campeonato.codigo}`'
              v-for='(campeonato, indice) in campeonatos'
              :key='`campeonato${indice}`'>
    <div
        class='card'
    >
      {{ campeonato.nome }}
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: inline-flex;
  flex-direction: column;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  min-width: 170px;
  box-shadow: 1px 1px 5px lightgray;
}

.card:hover {
  background-color: #bde0fe;
}
</style>