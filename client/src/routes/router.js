import Vue from 'vue';
import vueRouter from 'vue-router';

import Homepage from '@/components/Homepage';
import Aboutme from '@/components/Aboutme';
import RecentProjects from '@/components/RecentProjects';
import Reachme from '@/components/Reachme';

Vue.use(vueRouter);

export default new vueRouter({
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: Homepage
        },
        {
            path: '/aboutme',
            name: 'aboutme',
            component: Aboutme
        },
        {
            path: '/projects',
            name: 'projects',
            component: RecentProjects
        },
        {
            path: '/reachme',
            name: 'reachme',
            component: Reachme
        }
    ]
});