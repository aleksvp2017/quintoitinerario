
import Bemvindo from './views/bemvindo/Bemvindo.vue';
import Login from './views/login/Login.vue';
import RecuperarSenha from './views/login/RecuperarSenha.vue';
import Noticias from './views/noticias/Noticias.vue'

export const routes = [

   { path: '/', name: 'Home', component: Bemvindo, menuItem: true, alwaysShow: true},
   { path: '/recuperarsenha', name: 'RecuperarSenha', component: RecuperarSenha, menuItem: false },
   { path: '/entrar', name: 'Login', component: Login, menuItem: true },
   { path: '/home', name: 'Noticias', component: Noticias, requireAuth:true, menuItem: true }

];

