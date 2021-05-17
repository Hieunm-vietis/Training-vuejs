<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <h3>Forget Password</h3>
            </div>
            <div class="col-md-4 form-login">
                
                <div class="form-group mt-3">
                    <input v-model="password" placeholder="Password" type="password" class="form-control" id="usr" name="user_name">
                </div>
                <div class="form-group mt-3">
                    <input v-model="confirm_password" placeholder="Confirm Password" type="password" class="form-control" id="usr" name="user_name">
                </div>
                
                <div class="btncre mt-3">
                    <button  type="submit" @click="ResetPassword()" class="btn btn-primary">Login</button>
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
                password: '',
                confirm_password: '',
                token: '',
            }
        },
        watch: {
            
        },
        created() {
            this.token = this.$route.query.token;
                console.log(this.token);
                console.log(11111);
        },
        methods: {
            ResetPassword() {
                const config = {
                    headers: { 'Access-Control-Allow-Origin' : '*' }
                }
                let formData = new FormData();
                formData.append('token', this.token);
                formData.append('password', this.password);
                formData.append('confirm_password', this.confirm_password);
                
                axios.post('http://127.0.0.1:8000/api/reset_password', formData, config)
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
        },
        mounted() {
            
        }
}
</script>
