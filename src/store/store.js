import Vue from 'vue'
import Vuex from 'vuex'
// import auth from './auth.js'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        jwt: '',
        
    },
    getters: {

    },
    mutations: {
        loginSuccess(state, jwt) {
            state.jwt = jwt;
        }
    },
    plugins: [
        createPersistedState({
            getState: (jwt) => Cookies.getJSON(jwt),
            setState: (jwt, state) => Cookies.set(jwt, state, { expires: 3, secure: true })
        })
    ]
})
