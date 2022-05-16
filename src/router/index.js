import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import( '../views/'),
        redirect: {name: 'Home'},
        children: [
            {
                path: 'discoverMusic',
                name: 'DiscoverMusic',
                component: () => import( '../components/main/container/DiscoverMusic'),
                meta: {
                    title: '发现'
                }
            },
            {
                path: 'home',
                name: 'Home',
                component: () => import('../components/main/container/Home'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/playList/:id',
                name: 'PlayList',
                component: () => import( '../views/playList'),

            },
            {
                path: '/searchList/:keywords',
                name: 'SearchList',
                component: () => import( '../views/searchList'),

            }
        ],

    },

]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
export default router
