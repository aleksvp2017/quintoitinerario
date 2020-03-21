//carregado automaticamente pelo webpack

import Vue from 'vue' //core do vue
import App from './App.vue' //placeholder de toda aplicacao
import vuetify from './plugins/vuetify'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource' //chamada de apis, poderia ser o axios
import VueRouter from 'vue-router' //navegacao
import { routes } from './routes'; //rotas para navegacao
import store from './store' //vuex, gerenciamento global de estado
import AsyncComputed from 'vue-async-computed' //Para permtir computed properties assíncronas

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(AsyncComputed)

const router = new VueRouter({ routes});

//impede acesso direto aos endpoints que requerem acesso identificado - routeGuard
manageProtectedEndPoints()
 
//cria instância global do vue
new Vue({
  el: '#app',
  store, //injeta a store para que todos os componentes tenham acesso
  router,
  vuetify,
  render: h => h(App),
  created(){
    //para manter o token caso seja acionado reload no navegador
    atualizarStatePeloLocalStorage()
  }
})


//reconstruir o state através do cookie, se tiver, com dados do usuário, para o caso de reload da página
function atualizarStatePeloLocalStorage() {
  const userString = localStorage.getItem(store.getters.cookieName)
  if (userString) {
    const userData = JSON.parse(userString)
    console.log('refazendo dados do usuario', userData)
    store.dispatch('ActionSetUser', userData)
  }
}

//impede acesso direto aos endpoints que requerem acesso identificado
//é firula já que esse controle é feito no serviço nos endpoints que realmente fornecem dados
function manageProtectedEndPoints() {
  atualizarStatePeloLocalStorage() //para o caso de reload do navegador
  router.beforeEach((to, from, next) => {
    if (routeRequireAuth(to)) {
      if (!store.getters.loggedIn) {
        next('/entrar')
      }
    }
    if (to.fullPath === '/entrar') {
      if (store.getters.loggedIn) {
        next('/home')
      }
    }
    next()
  })
}

//chega nas propriedades da rota se ela quer autenticacao
function routeRequireAuth(to){
  let secureRoute = routes.filter(route => route.requireAuth && route.path == to.fullPath) 
  return secureRoute.length > 0 
}
