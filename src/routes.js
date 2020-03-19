
import Home from './views/home/Home.vue';
import Login from './views/login/Login.vue';
import RecuperarSenha from './views/login/RecuperarSenha.vue';
import Noticias from './views/noticias/Noticias.vue'

export const routes = [

   { path: '/', component: Home},
   { path: '/recuperarsenha', component: RecuperarSenha },
   { path: '/entrar', component: Login },
   { path: '/noticias', component: Noticias, requireAuth:true }

];

