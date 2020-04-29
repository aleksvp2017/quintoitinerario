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
          }
      ]
}

function listarColunasNoticiasCrud(){
    return [     
        {
            text: 'Data de publicação',
            value: 'datapublicacao',
          
        },
        {
          text: 'Título',
          value: 'titulo',
        },
        {
            text: 'Conteúdo',
            value: 'conteudo',
        },
        ,
        {
            text: 'Actions',
            value: 'actions', 
            sortable: false
        }
      ]
}

async function listarNoticias(){
    return http.get(BASE_BACKEND_URL + 'noticias')
}

async function salvarNoticia(noticia){
    return http.post(BASE_BACKEND_URL + 'noticias/' + (noticia.noticiaid ? (':' + noticia.noticiaid) : ''), {noticia})
}

async function apagarNoticia(noticia){
    return  http.delete(BASE_BACKEND_URL + 'noticias/' + noticia.noticiaid)
}

export {
    listarNoticias, listarColunasNoticias, listarColunasNoticiasCrud, salvarNoticia, apagarNoticia
}

