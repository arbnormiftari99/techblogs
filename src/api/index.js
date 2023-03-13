import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const API = {
    async userLogIn({ email, password }) {
        const body = {
            email: email,
            password: password
        }
        try {
            const res = await axios.post(`${BASE_URL}/login`, body);
            localStorage.setItem('user', JSON.stringify(res.data));
            return { state: 'successful', response: res }
        } catch (err) {
            return { state: 'error', response: err.response.data }
        }
    },
    async userRegister({ email, password, firstName, lastName, username }) {
        const body = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            username: username
        }
        try {
            const res = await axios.post(`${BASE_URL}/register`, body);
            console.log(res)
            const user = {
                token: res.data.token,
                userId: res.data.userId,
                role: res.data.role
            }
            localStorage.setItem('user', JSON.stringify(user));
            return { state: 'successful', response: res.data }
        } catch (err) {
            return { state: 'error', response: err.response.data }
        }
    },
    async userPromote({ userId, token }) {
        try {
            const body = {
                userId: userId
            }
            const res = await axios.post(`${BASE_URL}/promote`, body, {
                headers:
                    { authorization: `Bearer ${token}` }
            });
            return { state: 'successful', response: res.data }
        } catch (err) {
            return { state: 'error', response: err.response.data }
        }
    },
    async getUser({ userId, token }) {
        const response = await axios.get(`${BASE_URL}/${userId}`, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        return response.data;

    },
    async blogList() {
        const res = await axios.get(`${BASE_URL}/blogs`);
        return res.data;
    },
    async blogCreate({ blog, token, userId, username, file }) {
        try {
            console.log(blog);
            const formData = new FormData();
            formData.append("title", blog.title);
            formData.append("dateAdded", new Date(Date.now()));
            formData.append("textContent", blog.textContent);
            formData.append("userId", userId);
            formData.append("username", username);
            formData.append("image", file);

            const res = await axios.post(`${BASE_URL}/blogs`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            });
            return { state: 'successful', response: res.data }
        } catch (err) {
            return { state: 'error', response: err.response.data }
        }
    },
    async blogGet({ blogId }) {
        const res = await axios.get(`${BASE_URL}/blogs/${blogId}`);
        console.log(res);
    },
    async blogUpdate({ blog, token, blogId }) {
        const body = {
            title: blog.title,
            textContent: blog.textContent,
            img: null
        }
        try {
            const res = await axios.put(`${BASE_URL}/blogs/${blogId}`, body, {
                headers:
                    { authorization: `Bearer ${token}` }
            });
            return { state: 'successful', response: res.data }
        } catch (err) {
            return { state: 'error', response: err.response.data }
        }
    },
    async blogDelete({ blogId, token }) {
        try {
            const res = await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
                headers:
                    { authorization: `Bearer ${token}` }
            });
            return { state: 'successful', response: res.data }
        } catch (err) {
            return { state: 'error', response: err.response.data }
        }
    },
    async trackerList({ token }) {
        await axios.get(`${BASE_URL}/tracker`, {
            headers:
                { authorization: `Bearer ${token}` }
        });
    },
}