import {createRouter, createWebHashHistory} from 'vue-router';
import LoginView from '@/views/LoginView.vue';

const routes = [
    {path: '/:pathMatch(.*)*', component: () => import('../views/PaginaNaoEncontradaView.vue')},
    {path: '/', name: 'login', component: LoginView},
    {path: '/inicio', component: () => import ('../views/InicioView.vue')},
    {path: '/campeonatos', component: () => import('../views/CampeonatosView.vue')},
    {
        path: '/campeonato/:codigoCampeonato(\\d+)',
        component: () => import('../views/CampeonatoView.vue'),
        props: true,
        children: [
            {
                path: '',
                name: 'jogosCampeonato',
                component: () => import ('../components/JogosCampeonato.vue'),
                props: true
            },
            {
                path: '',
                name: 'classificacaoCampeonato',
                component: () => import ('../components/ClassificacaoCampeonato.vue'),
                props: true
            }
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const usuario = sessionStorage.getItem('usuario')
    if (!usuario && to.name !== 'login') {
        return {
            name: 'login'
        }
    }
})

export default router