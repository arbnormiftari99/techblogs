import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

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
            role: res.data.role
        }
        localStorage.setItem('user', JSON.stringify(user));
        console.log(res);
        return res.data;
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
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    },
    async getUser({ userId, token }) {
        const response = await axios.get(`${BASE_URL}/${userId}`, {
            headers:
                { authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        return response.data;
    },
    async getUsers({ token }) {
        try {
            const res = await axios.get(`${BASE_URL}/users`, {
                headers:
                    { authorization: `Bearer ${token}` }
            });
            return res.data.map(user => ({
                id: user.id,
                firstName: user.firstName,
                email: user.email,
                lastName: user.lastName,
                role: user.role,
                username: user.username
            }));
        } catch (err) {
            return err.message
        }
    },
    async blogList() {
        const res = await axios.get(`${BASE_URL}/blogs`);
        return res.data;
    },
    async blogCreate({ blog, token, userId, username, file }) {
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

        return res.data;
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
        try {
            const res = await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
                headers:
                    { authorization: `Bearer ${token}` }
            });
            return res;
        }
        catch { (err) => console.log(err) }
    },
    async trackerList({ token }) {
        try {
            const res = await axios.get(`${BASE_URL}/tracker`, {
                headers:
                    { authorization: `Bearer ${token}` }
            });
            console.log(res)
            return res.data.map((data) => ({
                userId: data.userId,
                operationType: data.operationType,
                dateAdded: data.dateAdded,
                entityType: data.entityType
            }));
        } catch {
            (err) => {
                console.log(err)
            }
        }
    },
}