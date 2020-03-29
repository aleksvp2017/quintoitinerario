import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const http = Vue.http


async function registrar(usuario){
    return  http.post('http://localhost:3001/usuario', {usuario})
}

export {
    registrar
}
