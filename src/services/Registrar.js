import Vue from 'vue'
import VueResource from 'vue-resource'
import {BASE_BACKEND_URL} from './Constantes.js'
import {encripta} from './Autenticador.js'

Vue.use(VueResource)
const http = Vue.http


async function registrar(usuario){
    return  http.post(BASE_BACKEND_URL + 'usuario/registrar', {...usuario, senha: encripta(usuario.senha)})
}

export {
    registrar
}
