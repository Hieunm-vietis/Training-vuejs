<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h1 class="text-center headeing">Register</h1>
        </div>
        
        <div class="col-md-4  pt-2">
            <div>
                <div class="form-group mt-3">
                    <input v-model="user.name" type="text" class="form-control" placeholder="Name">
                    <span v-if="errors.name" class="text-danger float-start ml-1 mb-2"> {{ errors.name[0] }} </span>
                </div>
                <div class="form-group mt-3">
                    <input v-model="user.email" type="text" class="form-control" placeholder="Email">
                    <span v-if="errors.email" class="text-danger float-start ml-1 mb-2"> {{ errors.email[0] }} </span>

                </div>
                <div class="form-group mt-3">
                    <input  v-model="user.password" type="password" class="form-control" placeholder="Password">
                    <span v-if="errors.password" class="text-danger float-start ml-1 mb-2"> {{ errors.password[0] }} </span>
                </div>
                <div class="form-group mt-3">
                    <input  v-model="user.confilmPassword" type="password" class="form-control" placeholder="Confirm Password">
                    <span v-if="errors.confilmPassword" class="text-danger float-start ml-1 mb-2"> {{ errors.confilmPassword[0] }} </span>
                </div>
                <div class="btncre mt-3">
                    <button @click="register()" type="submit" class="btn btn-primary">Register</button>
                </div>
            </div>
            <div class="pt-2 text-center font-site16 mb-5 pt-5">
                <div class="d-inline-block">You have accoutn: 
                    
                </div> 
                <router-link to="/login" class="nav-link d-inline-block">
                    <p>Login</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    confilmPassword: ''
                },
                RegisterSuccess: '',
                errors: []
            }
        },
        created() {
            this.RegisterSuccess = '';
        },
        methods: {
            register() {
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                let formData = new FormData();
                formData.append('name', this.user.name);
                formData.append('email', this.user.email);
                formData.append('password', this.user.password);
                formData.append('cf_password', this.user.confilmPassword);
                
                this.RegisterSuccess = '';
                axios.post('http://127.0.0.1:8000/api/register', formData, config)
                .then(response => {
                    this.$router.push({ path: '/login' })
                    console.log(response);
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors
                    }
                })
            }
        }
        ,
        mounted() {
        }
    }
</script>