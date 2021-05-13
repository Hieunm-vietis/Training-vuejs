import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'
import axios from 'axios';
Vue.component('pagination', require('laravel-vue-pagination'));
import store from './store/store.js';

Vue.config.productionTip = false

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        window.location = '/login';
    } else {
        return Promise.reject(error);
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
