<template>
  <v-app>
    <v-card width="400px" class="mt-5 mx-auto">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field 
            label="E-mail"
            v-model="credencial.email"
            type="email"
            prepend-icon="mdi-account-circle"/>
          <v-text-field 
            :type="showPassword ? 'text' : 'password'" 
            label="Senha"
            v-model="credencial.senha"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"/>
        </v-form>
      </v-card-text>
      <v-alert :type="tipoAlerta" dense outlined dismissible v-model="mostrarAlerta">
        {{alerta}}
      </v-alert>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="registrar">Registrar</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="login">Entrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
          mostrarAlerta: false,
          alerta: '',
          tipoAlerta: '',
          credencial :{
            email: '',
            senha: '',
          },
          showPassword: false
      }
    },
    methods : {
      ...mapActions(['ActionLogin']),
      login(){
        this.alerta = ''
        this.ActionLogin(this.credencial).then((response) => {
          this.$router.push('home')
        }).catch (error => {
          console.log(error)
          this.alerta = error.body.error
          this.tipoAlerta = "error"
          this.mostrarAlerta = true
        })
      },
      registrar(){
        this.alerta = "Funcionalidade em desenvolvimento"
        this.tipoAlerta = "info"
        this.mostrarAlerta = true
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
