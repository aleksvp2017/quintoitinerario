import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../store'
import {BASE_BACKEND_URL} from './Constantes.js'

Vue.use(VueResource)
const http = Vue.http


async function enviarMensagem(mensagem){
    return  http.post(BASE_BACKEND_URL + 'mensagem', {...mensagem, usuario: store.state.user.email})
}

export {
    enviarMensagem
}