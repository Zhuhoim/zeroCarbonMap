import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage'
import AccountPage from '@/pages/AccountPage'
import LoginPage from '@/pages/LoginPage'
import MapPage from '@/pages/MapPage'
import MyRelease from '@/pages/MyRelease'
import ReleasePage from '@/pages/ReleasePage'
import ReleaseForm from '@/pages/ReleaseForm'
import { Message } from 'element-ui';
import NewsPage from '@/pages/NewsPage'
import BlogDetail from '@/pages/BlogDetail'

const router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: HomePage,
        },
        {
            name: 'map',
            path: '/map',
            component: MapPage,
        },
        {
            path: '/news',
            component: NewsPage,
        },
        {
            name: 'acoount',
            path: '/account',
            component: AccountPage,
        },
        {
            name: 'login',
            path: '/login',
            component: LoginPage,
        },
        {
            name: 'myrelease',
            path: '/account/myrelease',
            component: MyRelease,
            meta: {needLogin: true},
        },
        {
            name: 'release',
            path: '/release',
            component: ReleasePage,
            meta: {needLogin: true},
            children: [
                {
                    name: 'releaseForm',
                    path: 'form',
                    component: ReleaseForm,
                    meta: {needLogin: true},
                }
            ]
        },
        {
            path: '/news/blogdetail',
            component: BlogDetail,
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.meta.needLogin) {
        if(localStorage.getItem('isLogin')==1) {
            next();
        }else {
            sessionStorage['needToGo'] = to.fullPath;
            router.push('/login');
            Message({
                message: '请先登录',
                duration: 2000,
            })
        }
    }
    else {
        next();
    }
})

export default router