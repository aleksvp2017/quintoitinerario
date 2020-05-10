import VueRouter from 'vue-router' //navegacao
import Vue from 'vue' //core do vue
import Bemvindo from './views/bemvindo/Bemvindo.vue'
import Login from './views/login/Login.vue'
import Noticias from './views/noticias/Noticias.vue'
import Registrar from './views/registrar/Registrar.vue'
import Cursos from './views/cursos/Cursos.vue'
import Usuario from './views/usuario/Usuario.vue'
import FaleConosco from './views/suporte/FaleConosco.vue'
import Senha from './views/usuario/Senha.vue'
import Home from './views/bemvindo/Home.vue'
import Vagas from './views/vagas/Vagas.vue'

const routes = [

   { path: '/', name: 'Início', component: Bemvindo, menuItem: false, alwaysShow: false},
   { path: '/entrar', name: 'Entrar', component: Login, menuItem: true },
   { path: '/home', name: 'Home', component: Home, requireAuth:true, menuItem: false },
   { path: '/noticias', name: 'Noticias', component: Noticias, requireAuth:true, menuItem: true },
   { path: '/registrar', name: 'Registrar', component: Registrar, requireAuth: false, menuItem: false},
   { path: '/cursos', name: 'Cursos', component: Cursos, requireAuth: true, menuItem: true},
   { path: '/usuario', name: 'Usuário', component: Usuario, requireAuth: true, menuItem: false},
   { path: '/faleconosco', name: 'Fale Conosco', component: FaleConosco, requireAuth: true, menuItem: true},
   { path: '/alterarsenha', name: 'Alterar Senha', component: Senha, requireAuth: true, menuItem: false},
   { path: '/vagas', name: 'Vagas', component: Vagas, requireAuth:true, menuItem: true }
   //{ path: '/', name: 'Cursos', component: Cursos, menuItem: false}

];

Vue.use(VueRouter)
const router = new VueRouter({ routes});

function obterRota(nome){
    return routes.filter(router => router.name == nome)[0]
}


export {
    router, routes, obterRota
}
