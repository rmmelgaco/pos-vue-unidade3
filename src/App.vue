<script setup>
const menus = [
  {rota: '/', label: 'Início'},
  {rota: '/campeonatos', label: 'Campeonatos'}
]
</script>
<template>
  <header>
    <div class='wrapper'>
      <nav>
        <RouterLink v-for='(menu, indice) in menus' :key='`menu${indice}`' :to='menu.rota'>
          {{menu.label}}
        </RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
</style>
