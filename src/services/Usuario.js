import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '../store'
import {BASE_BACKEND_URL} from './Constantes.js'
import { encripta } from './Autenticador'

Vue.use(VueResource)
const http = Vue.http


async function alterarSenha(usuario, senhaNova){
    return  http.post(BASE_BACKEND_URL + 'usuario/alterarSenha', {...usuario, senha: encripta(usuario.senha), senhaNova: encripta(senhaNova)})
}

async function alterarUsuario(usuario){
    return  http.post(BASE_BACKEND_URL + 'usuario/alterar', {usuario})
}

async function excluirUsuario(usuario){
    return  http.post(BASE_BACKEND_URL + 'usuario/excluir', {usuario})
}


function obterUsuario(){
    return store.state.user
}

export {
    obterUsuario, alterarUsuario, excluirUsuario, alterarSenha
}