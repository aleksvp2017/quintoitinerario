import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const http = Vue.http


async function listarNoticias(){
    console.log('listar noticias em Noticias.js')
    return http.post('http://localhost:3001/noticias')
}

export {
    listarNoticias
}

