import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import store from '../store/store.js';
Vue.use(VueI18n);

const messages = {
    'en': {
        welcomeMsg: 'Welcome to Your Vue.js App',
        titleBlog: 'Blogs'
    },
    'vi': {
        welcomeMsg: 'Chào mừng đến với ứng dụng Vue.js của bạn',
        titleBlog: 'Bài viết'
    }
};

const i18n = new VueI18n({
    locale: localStorage.getItem('i18n'), // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
});

export default i18n;