<script setup>
import {ref} from 'vue';

const {codigoCampeonato} = defineProps(['codigoCampeonato'])
const jogosCampeonato = ref(null)
const mensagem = ref('')

function recuperaTime(dados, codigoTime) {
  return dados.times.find(time => time.codigo === codigoTime)
}

function preencheDadosJogo(jogoCampeonato, dados) {
  const timeMandante = recuperaTime(dados, jogoCampeonato.codigoTimeMandante)
  const timeVisitante = recuperaTime(dados, jogoCampeonato.codigoTimeVisitante)
  return {
    ...jogoCampeonato,
    timeMandante,
    timeVisitante
  }
}

fetch('../src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => jogosCampeonato.value =
        dados.jogos
            .filter(jogo => jogo.codigoCampeonato === +codigoCampeonato)
            .map(jogo => preencheDadosJogo(jogo, dados))
    )
    .catch(error => mensagem.value = error)
</script>

<template>
  <h5>Jogos</h5>
  <div
      class='card'
      v-for='(jogoCampeonato, indice) in jogosCampeonato'>
    <span class='timeMandante'>{{ jogoCampeonato.timeMandante.nome }}</span>
    <span class='gols'>{{jogoCampeonato.resultado.golsMandante}}</span>
    <span class='x'>X</span>
    <span class='gols'>{{jogoCampeonato.resultado.golsVisitante}}</span>
    <span class='timeVisitante'>{{ jogoCampeonato.timeVisitante.nome }}</span>

  </div>
</template>
<style scoped>
.card {
  display: inline-flex;
  flex-direction: row;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  min-width: 170px;
  box-shadow: 1px 1px 5px lightgray;
}

.timeMandante {
  padding: 10px;
}

.timeVisitante {
  padding: 10px;
}

.gols {
  padding: 10px;
  font-weight: bolder;
  border: 1px solid;
}

.x {
  padding: 10px;
}
</style>