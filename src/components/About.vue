<template>
    <div>
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Users</h3>
                        <div class="box-tools text-end mb-4">
                            <button class="btn btn-success" data-toggle="modal" data-target="#NewUser">
                                New Admin
                                <i class="fas fa-user-plus fa-fw"></i>
                            </button>
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
                    <pagination :data="users" @pagination-change-page="getUsers"></pagination>
                </div>
            <!-- /.box -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name : '',
                    email : '',
                    status : '',
                    password : ''
                },
                users: {},
                errors: [], 
            }
        },
        created() {
            this.getListUser();
        },
        methods: {
            getListUser(page) {
                fetch('http://127.0.0.1:8000/api/users?page=' + page)
                    .then(response => response.json())
                    .then(data => {
                        this.users = data;
                    })
                    .catch(function(error) {
                        console.log('Looks like there was a problem: \n', error);
                    });
            },
        },
        mounted() {
        }
    }
</script>