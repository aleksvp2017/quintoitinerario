import Vue from 'vue'
import VueResource from 'vue-resource'
 

Vue.use(VueResource)
const http = Vue.http
import {BASE_BACKEND_URL} from './Constantes.js'

function importar(file){
    let formData = new FormData()
    //esse parametro tem que coincidir com o lido pelo muter no backend
    formData.append('fileuploaded', file)
    return http.post(BASE_BACKEND_URL + 'vagas/importar', formData)
}

export {
    importar
}