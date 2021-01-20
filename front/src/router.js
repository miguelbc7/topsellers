import Vue from 'vue';
import Router from 'vue-router';
import Products from '@/pages/Products.vue'
import Sellers from '@/pages/Sellers.vue';  
import Login from '@/pages/login.vue';  
import UserRegister from '@/pages/UserRegister.vue';  
import UserList from '@/pages/UserList.vue';  
import Layout from '@/pages/layout.vue';  


Vue.use(Router);

export default new Router({
	routes: [
        { 
            path: '/', 
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Layout,
            children:[
                { 
                    path: '/home/products', 
                    name: 'products',
                    component: Products 
                },
                { 
                    path: '/', 
                    name: 'sellers',
                    component: Sellers 
                },
                { 
                    path: '/home/user/register', 
                    name: 'user-register',
                    component: UserRegister 
                },
                { 
                    path: '/home/user/edit/:id', 
                    name: 'user-edit',
                    component: UserRegister 
                },
                { 
                    path: '/home/users', 
                    name: 'users',
                    component: UserList 
                }
            ]
        }

        
    ],
    linkActiveClass: "active",
    mode: "history"
});