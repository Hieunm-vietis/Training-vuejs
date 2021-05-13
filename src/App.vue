<template>
    <div id="app" class="mt-0">
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Blog</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/" class="nav-link">Blogs</router-link>
                        <router-link to="/users" class="nav-link">Users</router-link>
                    </div>
                </div>
                <div class="float-right">
                    <a class="text-secondary" @click="logout()"  href="#">Logout</a>
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
export default {
    data() {
        return {
            
        }
    },
    watch: {
        
    },
    created() {
    },
    methods: {
        logout() {
            axios.get('http://127.0.0.1:8000/api/logout')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                console.log('oh no');
            })
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
</style>
