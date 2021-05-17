import Vue from 'vue';
import App from './App.vue';
import { router } from './routes';
import axios from 'axios';
Vue.component('pagination', require('laravel-vue-pagination'));
import store from './store/store.js';
import VueI18n from 'vue-i18n';
import i18n from '@/plugins/i18n';
import FlagIcon from 'vue-flag-icon';
import VeeValidate from "vee-validate";
// import id from '@/plugins/locale-id'
import attributesAr from 'vee-validate/dist/locale/vi.js';
import attributesEn from 'vee-validate/dist/locale/en.js';
Vue.use(VueI18n);
Vue.use(FlagIcon);

Vue.config.productionTip = false

// vee-validate
Vue.use(VeeValidate, {
    locale: 'ar',
    dictionary: {
      en: { attributes: attributesEn },
      vn: { attributes: attributesAr }
    }
  });

// const rulesPlugin = ({ Validator }) => {
//     Validator.localize('id', id);
// };

// VeeValidate.use(rulesPlugin);

//Check login

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
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app')
