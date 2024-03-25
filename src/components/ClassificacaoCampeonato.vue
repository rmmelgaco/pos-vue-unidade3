<script setup>
import {reactive, ref} from 'vue';

const {codigoCampeonato} = defineProps(['codigoCampeonato'])
const classificacao = ref(null)
const mensagem = ref('')
const classificacaoOrdenada = ref(null)

function recuperaTime(dados, codigoTime) {
  return dados.times.find(time => time.codigo === codigoTime)
}

fetch('../src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => classificacao.value =
        preencheClassificacao(
            dados,
            dados.jogos
                .filter(jogo => jogo.codigoCampeonato === +codigoCampeonato)
        )
    )
    .catch(error => mensagem.value = error)

function preencheClassificacao(dados, jogos) {
  let mapaPontosTime = new Map()
  dados.times.forEach(time => mapaPontosTime.set(time, 0))
  jogos.forEach(jogo => {
    const timeMandante = recuperaTime(dados, jogo.codigoTimeMandante)
    const timeVisitante = recuperaTime(dados, jogo.codigoTimeVisitante)
    if (jogo.resultado.golsMandante > jogo.resultado.golsVisitante) {
      mapaPontosTime.set(timeMandante, mapaPontosTime.get(timeMandante) + 3)
    } else if (jogo.resultado.golsMandante < jogo.resultado.golsVisitante) {
      mapaPontosTime.set(timeVisitante, mapaPontosTime.get(timeVisitante) + 3)
    } else {
      mapaPontosTime.set(timeMandante, mapaPontosTime.get(timeMandante) + 1)
      mapaPontosTime.set(timeVisitante, mapaPontosTime.get(timeVisitante) + 1)
    }
  })
  classificacaoOrdenada.value = new Map([...mapaPontosTime.entries()].sort((a, b) => {
    if (a[1] < b[1]) {
      return 1
    } else if (a[1] > b[1]) {
      return -1
    } else {
      return a[0].nome.localeCompare(b[0].nome)
    }
  }))
}
</script>

<template>
  <table>
    <thead>
    <tr>
      <th class='colClassificacao'>Classificação</th>
      <th>Time</th>
      <th>Pontos</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='(classificacaoTime, indice) in classificacaoOrdenada'
        :key='`classificacaoTime${indice}`'>
      <td style='text-align: right; padding: 15px; width: 20px'>
        {{ indice + 1 }}
      </td>
      <td>
        {{ classificacaoTime[0].nome }}
      </td>
      <td>
        {{ classificacaoTime[1] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-top: 40px;
  width: 60%;
  border-collapse: collapse;
  border: 2px solid darkgreen;
  border-radius: 10px;
}

table > thead > tr > th {
  margin: 10px;
  padding: 10px;
  border: 1px solid darkgreen;
}

table > tbody > tr > td {
  margin: 10px;
  padding: 10px;
  border: 1px solid darkgreen;
}
</style>