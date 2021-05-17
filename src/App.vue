<template>
    <div id="app" class="mt-0">
        <div v-if="$store.state.jwt">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Blog</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/blogs" class="nav-link">Blogs</router-link>
                        <router-link to="/users" class="nav-link">Users</router-link>
                    </div>
                </div>
                <div class="float-right">
                    <span class="dropdown">
                        <a class="dropdown-toggle text-white" type="button" style="text-decoration: none !important;" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            Language
                        </a>
                        <ul class="dropdown-menu text-white" aria-labelledby="dropdownMenu2">
                            <li v-for="entry in languages" :key="entry.title">
                                <button @click="changeLocale(entry.language)" class="dropdown-item" type="button">
                                    <flag :iso="entry.flag" v-bind:squared=false />
                                    {{entry.title}}
                            </button>
                            </li>
                        </ul>
                    </span>
                    <span class="text-white"> | </span>
                    <a class="text-secondary" @click="logout()"  href="#">Logout</a>
                </div>

            </div>
            </nav>
        </div>
        <div v-if="!$store.state.jwt">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-end">
                <div class="">
                    <div class="text-end">
                        <span class="dropdown">
                            <a class="dropdown-toggle text-white" type="button" style="text-decoration: none !important;" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Language
                            </a>
                            <ul class="dropdown-menu text-white" aria-labelledby="dropdownMenu2">
                                <li v-for="entry in languages" :key="entry.title">
                                    <button @click="changeLocale(entry.language)" class="dropdown-item" type="button">
                                        <flag :iso="entry.flag" v-bind:squared=false />
                                        {{entry.title}}
                                </button>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
        <div>
            <router-view/>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import i18n from '@/plugins/i18n';
import { Validator } from 'vee-validate';
import vi from "vee-validate/dist/locale/vi.js";
import en from "vee-validate/dist/locale/en.js";
export default {
    data() {
        return {
            languages: [
                { flag: 'us', language: 'en', title: 'English' },
                { flag: 'vn', language: 'vi', title: 'Tiếng Việt' }
            ]
        }
    },
    watch: {
        
    },
    created() {
        console.log(this.$store.state.appLanguage)
        this.setLanguage();
    },
    methods: {
        logout() {
            axios.get('http://127.0.0.1:8000/api/logout')
            .then(response => {
                this.$store.commit('loginSuccess', '');
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                console.log('oh no');
            })
        },
        changeLocale(locale) {
            if (locale == 'vi') {
                Validator.localize('vi', vi);
            } else {
                Validator.localize('en', en);
            }
            
            localStorage.setItem('i18n', locale);

            i18n.locale = locale;
        },
        setLanguage() {
            const locale = localStorage.getItem('i18n');
            if (locale == 'vi') {
                i18n.locale = locale;
                Validator.localize('vi', vi);
            } else {
                i18n.locale = locale;
                Validator.localize('en', en);
            }
        }
    },
    mounted() {
        
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.dropdown-toggle::after {
            content: none;
        }
</style>
