import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/HelloWorld.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'
import ForgetPassword from './components/Auth/ForgetPassword.vue'
import ResetPassword from './components/Auth/ResetPassword.vue'
import User from './components/Users/index.vue'
import Blog from './components/Blogs/index.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/users', component: User },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/blogs', component: Blog },
        { path: '/forget_password', component: ForgetPassword },
        { path: '/reset-password', component: ResetPassword }
    ]
})