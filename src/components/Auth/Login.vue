<template>
    <div>
        <div class="row justify-content-center mt-5">
            <div class="col-12 text-center">
                <h3>Login</h3>
            </div>
            <div class="col-md-4 form-login">
                <div v-if="this.login.message != ''">
                    <p class="text-danger mb-2">{{this.login.message}}</p>
                </div>
                <div class="form-group mt-3">
                    <input v-model="admin.email" v-validate="'required|email'" name="email" placeholder="Email" type="text" class="form-control" id="usr">
                    <p v-show="errors.has('email')" class="text-danger text-start">{{ errors.first('email') }}</p>
                </div>
                <div class="form-group mt-3">
                    <input  v-model="admin.password" v-validate="'required|min:8'" placeholder="Password" type="password" class="form-control" id="pwd" name="password">
                    <div v-if="errors.has('password')" class="text-danger text-start">{{ errors.first('password') }}</div>
                </div>
                <div class="btncre mt-3">
                    <button  type="submit" @click="login()" class="btn btn-primary">Login</button>
                </div>
                <div class="pt-2 text-center font-site16">
                    <div class="d-inline-block">Create new account: 
                    </div> 
                    <router-link to="/register" class="nav-link d-inline-block">
                        <p>Register</p>
                    </router-link>
                </div>
                <div class="text-center font-site16 mb-5 ">
                    <router-link to="/forget_password" class="nav-link d-inline-block">
                        <p>Forget password</p>
                    </router-link>
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
                value: '',
                email:'',
                submitted: false,
                user: {
                    firstName:''
                }
            }
        },
        watch: {
            
        },
        created() {
        },
        methods: {
            login() {
                this.$validator.validate().then(valid => {
                    if (valid) {
                        if (!this.errors.count()) {
                            axios.post('http://127.0.0.1:8000/api/login', {email: this.admin.email, password: this.admin.password})
                            .then(response => {
                                this.Jwt = response.data.access_token;
                                this.$store.commit('loginSuccess', this.Jwt);
                                this.$router.push({ path: '/blogs' })
                                console.log(response);
                            })
                            .catch(error => {
                                console.log(error);
                                console.log('oh no');
                            })
                        }
                    }
                });
                
            }
        },
        mounted() {
            
        }
}
</script>
