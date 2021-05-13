<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <h3>Login</h3>
            </div>
            <div class="col-md-4 form-login">
                <div v-if="this.login.message != ''">
                    <p class="text-danger mb-2">{{this.login.message}}</p>
                </div>
                <div class="form-group mt-3">
                    <input v-model="admin.email" placeholder="Email" type="text" class="form-control" id="usr" name="user_name">
                </div>
                <div class="form-group mt-3">
                    <input  v-model="admin.password" placeholder="Password" type="password" class="form-control" id="pwd" name="password">
                </div>
                <div class="btncre mt-3">
                    <button  type="submit" @click="login()" class="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
            return {
                admin: {
                    email: '',
                    password:''
                },
                jwt: '',
            }
        },
        watch: {
            
        },
        created() {
        },
        methods: {
            login() {
                axios.post('http://127.0.0.1:8000/api/login', {email: this.admin.email, password: this.admin.password})
                .then(response => {
                    this.Jwt = response.data.access_token;
                    this.$store.commit('loginSuccess', this.Jwt);
                    this.$router.push({ path: '/' })
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
