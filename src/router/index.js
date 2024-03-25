import {createRouter, createWebHashHistory} from 'vue-router';
import InicioView from '@/views/InicioView.vue';

const routes = [
    {path: '/:pathMatch(.*)*', component: () => import('../views/PaginaNaoEncontradaView.vue')},
    {path: '/', component: InicioView},
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

export default router