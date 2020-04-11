
import Bemvindo from './views/bemvindo/Bemvindo.vue';
import Login from './views/login/Login.vue';
import RecuperarSenha from './views/login/RecuperarSenha.vue';
import Noticias from './views/noticias/Noticias.vue'
import Registrar from './views/registrar/Registrar.vue'
import Cursos from './views/cursos/Cursos.vue'
import Usuario from './views/usuario/Usuario.vue'
import FaleConosco from './views/suporte/FaleConosco.vue'
import Senha from './views/usuario/Senha.vue'

export const routes = [

   { path: '/', name: 'Início', component: Bemvindo, menuItem: true, alwaysShow: true},
   { path: '/recuperarsenha', name: 'RecuperarSenha', component: RecuperarSenha, menuItem: false },
   { path: '/entrar', name: 'Entrar', component: Login, menuItem: true },
   { path: '/home', name: 'Noticias', component: Noticias, requireAuth:true, menuItem: true },
   { path: '/registrar', name: 'Registrar', component: Registrar, requireAuth: false, menuItem: false},
   { path: '/cursos', name: 'Cursos', component: Cursos, requireAuth: true, menuItem: true},
   { path: '/usuario', name: 'Usuário', component: Usuario, requireAuth: true, menuItem: false},
   { path: '/faleconosco', name: 'Fale Conosco', component: FaleConosco, requireAuth: true, menuItem: true},
   { path: '/alterarsenha', name: 'Alterar Senha', component: Senha, requireAuth: true, menuItem: false}
   //{ path: '/', name: 'Cursos', component: Cursos, menuItem: false}

];

