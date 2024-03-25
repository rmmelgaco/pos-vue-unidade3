<script setup>
const {codigoCampeonato} = defineProps(['codigoCampeonato'])
const classificacao = ref(null)
const mensagem = ref('')

fetch('../src/assets/dados.json')
    .then(dados => dados.json())
    .then(dados => classificacao.value =
        preencheClassificacao(
            dados.jogos
                .filter(jogo => jogo.codigoCampeonato === +codigoCampeonato)
        )
    )
    .catch(error => mensagem.value = error)

function preencheClassificacao(jogos) {
  jogos.forEach(jogo => {

  })
}
</script>

<template></template>