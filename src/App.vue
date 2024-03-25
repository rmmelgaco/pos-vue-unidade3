<script setup>
const menus = [
  {rota: '/', label: 'Início'},
  {rota: '/campeonatos', label: 'Campeonatos'}
]
</script>
<template>
  <header>
    <div class='wrapper'>
      <nav class='tab_menu'>
        <RouterLink class='tab_item' v-for='(menu, indice) in menus' :key='`menu${indice}`' :to='menu.rota'>
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
.tab_menu {
  margin: 5px;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #52e7d6;
}
.tab_item {
  padding: 10px;
  color: #15295d;
  flex: 1;
  text-align: center;
  font-size: larger;
  font-weight: bolder;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
