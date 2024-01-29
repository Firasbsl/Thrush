import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import axios from "axios";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));
const tokenSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('token')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    get tokenValue () { return tokenSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password){
    let res = axios({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password,
        }
    });
    return res
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            console.log(user.data.data)
            userSubject.next(user.data.data);
            localStorage.setItem('user', JSON.stringify(user.data.data));
            localStorage.setItem('token', JSON.stringify(user.data.token));

            return user;
        });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(name, email, password, passwordConfirm) {
    let res = axios({
        method: 'POST',
        url: `${baseUrl}/signup`,
        data: {
            name,
            email,
            password,
            passwordConfirm,
            "role": "user"
        }
    });
    return res
}

function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            if (id === userSubject.value.id) {
                // update local storage
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                userSubject.next(user);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
