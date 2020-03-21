
import Bemvindo from './views/bemvindo/Bemvindo.vue';
import Login from './views/login/Login.vue';
import RecuperarSenha from './views/login/RecuperarSenha.vue';
import Noticias from './views/noticias/Noticias.vue'

export const routes = [

   { path: '/', component: Bemvindo},
   { path: '/recuperarsenha', component: RecuperarSenha },
   { path: '/entrar', component: Login },
   { path: '/home', component: Noticias, requireAuth:true }

];

