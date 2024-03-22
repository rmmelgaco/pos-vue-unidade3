import {createRouter, createWebHashHistory} from 'vue-router';
import InicioView from '@/views/InicioView.vue';

const routes = [
    {path: '/:pathMatch(.*)*', component: () => import('../views/PaginaNaoEncontradaView.vue')},
    {path: '/', component: InicioView},
    {path: '/torneios', component: () => import('../views/TorneiosView.vue')},
    {path: '/torneio/:codigoTorneio(\\d+)', component: () => import('../views/TorneioView.vue')},
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router