import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const http = Vue.http
import {BASE_BACKEND_URL} from './Constantes.js'

function listarColunasNoticias(){
    return [     
        {
          text: 'Título',
          value: 'titulo',
        },
        {
            text: 'Lida',
            value: 'lida',
        },
        {
            text: '',
            value: 'data-table-expand',
          },
      ]
}

async function listarNoticias(){
    console.log('listar noticias em Noticias.js')
    return http.post(BASE_BACKEND_URL + 'noticias')
}

export {
    listarNoticias, listarColunasNoticias
}

