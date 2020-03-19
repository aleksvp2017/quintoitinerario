import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const http = Vue.http


async function login(credencial){
    let senhaHash = encripta(credencial.senha)

    return  http.post('http://localhost:3001/login', {user: credencial.email, password: senhaHash})
}

export {
    login
}

function encripta(senha) {
    const crypto = require('crypto')
    let senhaHash = crypto.createHash('sha512').update(senha).digest('hex')
    return senhaHash
}
