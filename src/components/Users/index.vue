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
                <div>
                    <table class="table table-bordered" >
                        <thead>
                            <tr class="table__title">
                                <th>Name</th>
                                <th>Emai</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody v-for="user in users.data" :key="user.id">
                            <tr class="table__content">
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <div v-if="user.status == 1">
                                        <div class="text-success">
                                            Active
                                        </div>
                                    </div>
                                    <div v-if="user.status == 0">
                                        <div class="text-danger">
                                            No Active
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination :data="users" @pagination-change-page="getListUser"></pagination>
                </div>
            <!-- /.box -->
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
                    name : '',
                    email : '',
                    status : '',
                },
                users: {},
                errors: [],
                params: {
                    page: '',
                    search: ''
                }
            }
        },
        created() {
            this.params.page = this.$route.query.page;
            this.params.search = this.$route.query.search;
            this.getListUser(this.params.page);
        },
        methods: {
            getListUser(page) {
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
                axios.get('http://127.0.0.1:8000/api/users', {
                    params:  this.params,
                    headers: yourConfig
                })
                .then(response => {
                    this.users = response.data;
                })
                .catch(function(error) {
                    this.errors = error;
                });
            },
            Search() {
                console.log(this.params.search)
                this.getListUser();
            }
        },
        mounted() {
        }
    }
</script>