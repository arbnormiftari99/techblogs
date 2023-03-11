import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

export const API = {
    async userLogIn({ email, password }) {
        const body = {
            email: email,
            password: password
        }
        const res = await axios.post(`${BASE_URL}/login`, body);
        localStorage.setItem('user', JSON.stringify(res.data));
        console.log(res);
    },
    async userRegister({ email, password, firstName, lastName, username }) {
        const body = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            username: username
        }
        const res = await axios.post(`${BASE_URL}/register`, body);
        console.log(res)
        const user = {
            token: res.data.token,
            userId: res.data.userId,
            role:res.data.role
        }
        localStorage.setItem('user', JSON.stringify(user));
        console.log(res);
        return res.data;
    },
    async userPromote({ userId, token }) {
        const body = {
            userId: userId
        }
        const res = await axios.post(`${BASE_URL}/promote`, body, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(res);
    },
    async getUser({ userId, token }) {
        const response = await axios.get(`${BASE_URL}/${userId}`, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    },
    async blogList() {
        const res = await axios.get(`${BASE_URL}/blogs`);
        console.log(res);
    },
    async blogCreate({ blog, token, userId, username }) {
        const body = {
            title: blog.title,
            dateAdded: new Date(Date.now()),
            textContent: blog.textContent,
            userId: userId,
            username: username,
            img: null
        }
        const res = axios.post(`${BASE_URL}/blogs`, body, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(res);
    },
    async blogGet({ blogId }) {
        const res = await axios.get(`${BASE_URL}/blogs/${blogId}`);
        console.log(res);
    },
    async blogUpdate({ blog, token, blogId }) {
        const body = {
            title: blog.title,
            // dateAdded: new Date(Date.now()),
            textContent: blog.textContent,
            // userId: userId,
            // username: username,
            img: null
        }
        const res = axios.put(`${BASE_URL}/blogs/${blogId}`, body, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(res);
    },
    async blogDelete({ blogId, token }) {
        const res = await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(res);
    },
    async trackerList({ token }) {
        const res = await axios.get(`${BASE_URL}/tracker`, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(res);
    },
}