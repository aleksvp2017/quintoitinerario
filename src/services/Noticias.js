import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const http = Vue.http

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
    return http.post('http://localhost:3001/noticias')
}

export {
    listarNoticias, listarColunasNoticias
}

