<template>
    <div>
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">{{ $t('titleBlog') }}</h3>
                        <div class="box-tools text-end mb-4">
                            <button type="btn btn-succes" @click="handleClickNewBlog" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newBlog">
                                New Blog
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
                                    - <strong> {{ blog.user.name }} </strong>
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
        <!-- Modal -->
        <div class="modal fade" id="newBlog" tabindex="-1" aria-labelledby="newBlogModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newBlogModalLabel">Create Blogs</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        

                        <div class=" justify-content-center">
                            <div class=" mb-3 row">
                                <div class=" ml-3 col-2">
                                    <label for="" class="float-start">Title:</label>
                                </div>
                                <div class="col-9">
                                    <input v-model="blog.title" class="form-control" name="title" id="title" value="">
                                    <p class="text-danger">
                                    </p>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <div class=" ml-3 col-2">
                                    <label for="" class="float-start">Content:</label>
                                </div>
                                <div class="col-9">
                                    <textarea v-model="blog.content" class="form-control" rows="5" name="content" id="content">
                                    </textarea>
                                    <p class="text-danger">
                                    </p>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">Image</label>
                                <input type="file" v-on:change="onImageChangeBlog" name="image" required="true">
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="createTour">Create</button>
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
                } else {
                    this.params.page = page;
                }

                this.$router.push({
                    query: this.params
                });

                console.log(this.params);
                axios.get('http://127.0.0.1:8000/api/blogs', {
                    headers: yourConfig,
                    params:  this.params
                })
                .then(response => {
                    this.blogs = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            Search() {
                console.log(this.params.search)
                this.getListBlogs();
            },
            onImageChangeBlog(e) {
                this.blog.image = e.target.files[0];
            },
            handleClickNewBlog() {
                this.blog = {
                    title: '',
                    content: '',
                    image: ''
                }
            },
            createTour() {
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                let formData = new FormData();
                formData.append('title', this.blog.title);
                formData.append('content', this.tour.content);
                formData.append('image', this.tour.image);
                axios.post('/api/tour/store', formData, config)
                .then(response => {
                    console.log(response);
                    this.blog.title = null;
                    this.blog.content = null;
                    this.blog.image = null;
                    this.getListBlogs();
                })
                .catch(error => {
                    this.success = ''
                    if (error.response.status == 422) {
                        console.log(error);
                        // this.errors = error.response.data.errors
                    }
                })
            }
        },
        mounted() {
        }
    }
</script>