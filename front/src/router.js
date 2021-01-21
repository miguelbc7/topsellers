import Vue from 'vue';
import Router from 'vue-router';
import Products from '@/pages/Products.vue'
import Sellers from '@/pages/Sellers.vue';  
import Login from '@/pages/login.vue';  
import UserRegister from '@/pages/UserRegister.vue';  
import UserList from '@/pages/UserList.vue';  
import Layout from '@/pages/layout.vue';  


Vue.use(Router);

const router = new Router({
    routes: [
        { 
            path: '/', 
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            component: Layout,
            children:[
                { 
                    path: '', 
                    name: 'sellers',
                    component: Sellers,
                    meta: { Auth: true } 
                },
                { 
                    path: '/home/products', 
                    name: 'products',
                    component: Products,
                    meta: { Auth: true } 
                },
                { 
                    path: '/home/user/register', 
                    name: 'user-register',
                    component: UserRegister,
                    meta: { Auth: true } 
                },
                { 
                    path: '/home/user/edit/:id', 
                    name: 'user-edit',
                    component: UserRegister,
                    meta: { Auth: true } 
                },
                { 
                    path: '/home/users', 
                    name: 'users',
                    component: UserList,
                    meta: { Auth: true } 
                }
            ]
        }

        
    ],
    linkActiveClass: "active",
    mode: "history"
});
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.Auth && !token) {
        next({ path: '/' });
    } 
    else {
        if(to.name === "login" && token){
            next({ path: '/home' });
        }
        next();
    }
});

export default router