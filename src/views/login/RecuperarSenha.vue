<template>
  <div>
      <div align="center" class="center">
      <b-card border-variant="dark" 
         header="Recuperação de senha" class="text-center">
      <b-form @submit="submit">  
        <b-form-input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Digite seu e-mail"
        ></b-form-input>
        <br/>
        <div align="right">
          <b-button pill variant="primary" type="submit">Recuperar</b-button>     
        </div>
        <div align="left">
          <router-link to="/login">Cancelar</router-link>
        </div>
      </b-form>
    </b-card>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
            email: '',
      }
    },
    methods : {
      submit(evt){
        evt.preventDefault()
        recuperarSenha(this.email)
      }
    }
  }</script>

<style>

.center {
  width: 20rem;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
