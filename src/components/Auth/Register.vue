<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <h1 class="text-center headeing">Register</h1>
        </div>
        
        <div class="col-md-4  pt-2">
            <div>
                <div class="form-group mt-3">
                    <input v-model="user.name" v-validate="'required'" name="name" type="text" class="form-control" placeholder="Name">
                    <div v-if="errorsResponse.name" class="text-danger text-start ml-1 mb-2"> {{ errorsResponse.name[0] }} </div>
                    <div v-show="errors.has('name')" class="text-danger text-start">{{ errors.first('name') }}</div>
                </div>
                <div class="form-group mt-3">
                    <input v-model="user.email" name="email" v-validate="'required|email'" type="text" class="form-control" placeholder="Email">
                    <div v-if="errorsResponse.email" class="text-danger text-start ml-1 mb-2"> {{ errorsResponse.email[0] }} </div>
                    <div v-show="errors.has('email')" class="text-danger text-start">{{ errors.first('email') }}</div>
                </div>
                <div class="form-group mt-3">
                    <input  v-model="user.password" name="password" v-validate="'required|min:8'" type="password" class="form-control" placeholder="Password">
                    <div v-if="errorsResponse.password" class="text-danger text-start ml-1 mb-2"> {{ errorsResponse.password[0] }} </div>
                    <div v-show="errors.has('password')" class="text-danger text-start">{{ errors.first('password') }}</div>
                </div>
                <div class="form-group mt-3">
                    <input  v-model="user.confilmPassword" name="confilmPassword" type="password" v-validate="'required|min:8'" class="form-control" placeholder="Confirm Password">
                    <div v-if="errorsResponse.confilmPassword"  class="text-danger text-start ml-1 mb-2"> {{ errorsResponse.confilmPassword[0] }} </div>
                    <div v-show="errors.has('confilmPassword')" class="text-danger text-start">{{ errors.first('confilmPassword') }}</div>
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
                errorsResponse: []
            }
        },
        created() {
            this.RegisterSuccess = '';
        },
        methods: {
            register() {
                this.$validator.validate().then(valid => {
                    if (valid) {
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
                                this.errorsResponse = error.response.data.errors
                            }
                        })
                    }
                });
            }
        }
        ,
        mounted() {
        }
    }
</script>