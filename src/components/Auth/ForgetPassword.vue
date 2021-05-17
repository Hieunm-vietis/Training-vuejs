<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <h3>Forget Password</h3>
            </div>
            <div class="col-md-4 form-login">
                
                <div class="form-group mt-3">
                    <input v-model="email" placeholder="Email" type="text" class="form-control" id="usr" name="user_name">
                </div>
                
                <div class="btncre mt-3">
                    <button  type="submit" @click="Forget()" class="btn btn-primary">Login</button>
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
                email: '',
            }
        },
        watch: {
            
        },
        created() {
        },
        methods: {
            Forget() {
                axios.get('http://127.0.0.1:8000/api/forget_password?email='+ this.email)
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
