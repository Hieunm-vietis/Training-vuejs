import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/auth/login';

class AuthService {
    login(user) {
        return axios
        .post(API_URL + 'signin', {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        })
        .catch(error => {
            console.log(error);
             console.log('oh no');
         });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();