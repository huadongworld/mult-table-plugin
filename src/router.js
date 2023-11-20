// router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import AppCalendar from './AppCalendar.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/AppCalendar',
        name: 'AppCalendar',
        component: AppCalendar
    }
];

const router = new VueRouter({
    mode: 'history', // 可选项，使用 HTML5 History API 模式
    routes
});

export default router;
