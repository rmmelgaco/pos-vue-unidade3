<script setup>
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter()
const usuario = reactive({})
const temUsuario = ref(false)
const mensagem = ref(null)

const acessar = () => {
  fetch('/src/assets/dados.json')
      .then(dados => dados.json())
      .then(dados => {
        temUsuario.value = dados.usuarios
            .some(user => {
              const emailValido = user.email == usuario.email
              const senhaValida = user.senha == usuario.senha
              return emailValido && senhaValida
            })
        if (temUsuario.value) {
          sessionStorage.setItem('usuario', usuario)
          router.replace('/inicio')
        }
      })
      .catch(erro => mensagem.value = erro)
}
</script>

<template>
  <main>
    <form>
      <div>
        <label>E-mail</label>
        <input type='email' v-model='usuario.email' placeholder='E-mail'/>
      </div>
      <div>
        <label>Senha</label>
        <input type='password' v-model='usuario.senha' placeholder='Senha'/>
      </div>
      <button @click.prevent='acessar'>Acessar</button>
      <p v-show='temUsuario'>Usuário autenticado: {{usuario.email}}</p>
    </form>
  </main>
</template>

<style scoped>
main > form {
  display: flex;
  width: 30%;
  flex-direction: column;
  margin: 15px;
  padding: 10px;
}

main > form > div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 2px;
  padding: 5px;
}

main > form > div > label {
  padding: 10px;
}

main > form > div > input {
  padding: 10px;
  flex: 1;
}

main > form > p {
  background-color: #f6bd60;
  color: #023047;
  border-radius: 5px;
  text-align: center;
  margin: 5px 20px;
  padding: 10px 5px;
}

main > form > button {
  margin: 5px;
  padding: 5px;
  border: none;
  background-color: #2a9d8f;
  color: #ffffff;
  border-radius: 5px;
  transition-duration: 200ms;
  cursor: pointer;
}

</style>