<template>
    <div>
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Users</h3>
                        <div class="box-tools text-end mb-4">
                            <button class="btn btn-success" data-toggle="modal" data-target="#NewUser">
                                New User
                                <i class="fas fa-user-plus fa-fw"></i>
                            </button>
                            <div class="col-3">
                                <input v-model="params.search" type="text" placeholder="Search" class="form-control" @change="Search()">
                            </div>
                        </div>
                    </div>
                <!-- /.box-body -->
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="row mt-5" v-for="blog in blogs.data" :key="blog.id">
                            <div class="col-md-3 mr-3">
                                <img v-bind:src="'http://127.0.0.1:8000' + blog.image" /> 
                            </div>
                            <div class="col-md-6 ml-4">
                                <div class="h5"> <span>{{ blog.title }}</span>
                                    - 
                                    <span>
                                    </span>
                                    <div>{{ blog.content }}</div>
                                    <div class="mt-2">
                                        <div>
                                            <span><a type="button" style="text-decoration: none" href="" >View >></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <pagination :data="blogs" @pagination-change-page="getListBlogs"></pagination>
                    </div>
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
                blog: {
                    title : '',
                    content : '',
                    image : '',
                },
                blogs: {},
                errors: [],
                params: {
                    page: '',
                    search: ''
                }
            }
        },
        created() {
            this.params.page = this.$route.query.page;
            this.getListBlogs(this.params.page);
        },
        methods: {
            getListBlogs(page) {
                const yourConfig = {
                    Authorization: "Bearer " + this.$store.state.jwt
                };
                if (typeof page === 'undefined') {
                    this.params.page = 1;
                }

                console.log(this.params);
                axios.get('http://127.0.0.1:8000/api/blogs', {
                    headers: yourConfig
                })
                .then(response => {
                    this.blogs = response.data;
                })
                .catch(function(error) {
                    this.errors = error;
                });
            },
        },
        mounted() {
        }
    }
</script>