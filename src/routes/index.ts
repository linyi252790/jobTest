/*
* 路由的配置
* */
import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from '../pages/Home/index.vue';
import WorkInfo from '../pages/Home/WorkInfo.vue';
import Company from '../pages/Company/index.vue';
import CompanyInfo from '../pages/Company/CompanyInfo.vue';


import Message from '../pages/Message/index.vue';
import Mine from '../pages/Mine/index.vue';
import ResumeCenter from '../pages/Mine/ResumeCenter.vue';
import ResumeInfo from '../pages/Mine/ResumeInfo.vue';
import ResumeList from '../pages/Mine/ResumeList.vue';
import CollectCenter from '../pages/Mine/CollectCenter.vue';

import Login from '../pages/Login/index.vue';
import Chat from '../pages/Message/Chat.vue';

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: 'Home',
        component: Home,
        meta: {
            title: '首页',
            needAuth: false,
        }
    },
    {
        path: "/workinfo",
        name: 'WorkInfo',
        component: WorkInfo,
        meta: {
            title: '岗位详情',
            needAuth: false,
        }
    },
    {
        path: "/company",
        name: 'Company',
        component: Company,
        meta: {
            title: '公司列表',
            needAuth: false,
        }
    },
    {
        path: "/company-info",
        name: 'CompanyInfo',
        component: CompanyInfo,
        meta: {
            title: '公司详情',
            needAuth: false,
        }
    },
    {
        path: "/message",
        name: 'Message',
        component: Message,
        meta: {
            title: '岗位咨询',
            needAuth: true,
        }
    },
    {
        path: "/mine",
        name: 'Mine',
        component: Mine,
        meta: {
            title: '个人中心',
            needAuth: true,
        }
    },
    {
        path: "/login",
        name: 'Login',
        component: Login,
        meta: {
            title: '登录',
            needAuth: false,
        }
    },
    {
        path: "/chat",
        name: 'Chat',
        component: Chat,
        meta: {
            title: '沟通中...',
            needAuth: true,
        }
    },
    {
        path: "/resume-center",
        name: 'ResumeCenter',
        component: ResumeCenter,
        meta: {
            title: '个人简历',
            needAuth: true,
        }
    },
    {
        path: "/resume-info",
        name: 'ResumeInfo',
        component: ResumeInfo,
        meta: {
            title: '查看简历',
            needAuth: true,
        }
    },
    {
        path: "/resume-list",
        name: 'ResumeList',
        component: ResumeList,
        meta: {
            title: '已投简历',
            needAuth: true,
        }
    },

    {
        path: "/collect-center",
        name: 'CollectCenter',
        component: CollectCenter,
        meta: {
            title: '我的收藏',
            needAuth: true,
        }
    },


];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

/*router 的路由守卫进行授权检测，对于要登录后才可以访问的路由；如果没有登录，则不可以访问 */
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let needAuth = to.meta.needAuth;
    if (needAuth) {
        // 需要授权（登录）后才可以访问 检测登录的标识 token 是否存在
        let token = localStorage.getItem('token');
        if (token) {
            // 代表用户已经登录了的
            next();
        } else {
            // 代表用户没有登录的情况下，访问了一个需要登录后才可以访问的页面，则重定向到 login 页面
            /*next 支持参数，代表就是要前往的 路由地址*/
            next('/login');
        }


    } else {
        // 不需要授权，代表可以直接访问
        next();
    }

})


export default router;
