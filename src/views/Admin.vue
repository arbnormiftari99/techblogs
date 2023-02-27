<template>
    <div class="dashboard">
      <div class="dashboard-card">
        <h2>Users</h2>
        <div class="users-list">
          <div class="user" v-for="(user, index) in users" :key="index" :class="{active: user.active, inactive: !user.active}">
            <h4>{{ user.name }}</h4>
            <p>Role: Admin</p> 

            <div class="user-buttons">
              <button class="btn btn-primary btn-sm" @click="editUser(index)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteUser(index)">Delete</button>
            </div>
          </div>
        </div>
        <button class="btn btn-success" @click="addUser">Add User</button>
      </div>
      
      <div class="dashboard-card">
        <h2>Posts</h2>
        <div class="posts-list">
          <div class="post" v-for="(post, index) in posts" :key="index">
            <h4>{{ post.title }}</h4>
            <p>{{ post.content }}</p>
            <p>Posted: {{ post.user }}</p>
            <div class="post-buttons">
              <button class="btn btn-primary btn-sm" @click="editPost(index)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deletePost(index)">Delete</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="dashboard-card">
        <h2>Add Admin</h2>
        <div class="add-admin">
          <h4 v-if="addAdminMsg">{{ addAdminMsg }}</h4>
          <input type="text" placeholder="Enter email address" v-model="adminEmail" />
          <button class="btn btn-primary" @click="addAdmin">Add Admin</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          { name: "John Doe", active: true },
          { name: "Jane Doe", active: false },
          { name: "Bob Smith", active: true }
        ],
        posts: [
          { title: "Post 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", user: "John Doe" },
          { title: "Post 2", content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", user: "Jane Doe" },
          { title: "Post 3", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", user: "Bob Smith" }
        ],
        adminEmail: "",
        addAdminMsg: ""
      }
    },
    methods: {
      addUser() {
        // Logic for adding user
      },
      editUser() {
        // Logic for editing user
      },
      deleteUser(index) {
        this.users.splice(index, 1);
      },
      editPost() {
        // Logic for editing post
      },
      deletePost(index) {
        this.posts.splice(index, 1);
      },
      addAdmin() {
        if (this.adminEmail === "") {
          this.addAdminMsg = "Please enter an email address.";
        } else {
          // Logic for adding admin
          this.addAdminMsg = "Admin added successfully!";
          this.adminEmail = "";
        }
      }
    }
  }
  </script>
  
  <style>
    /* Add your CSS styles here */
/* Colors */
:root {
  --primary-color: #3498db;
  --secondary-color: #f1c40f;
  --accent-color: #e74c3c;
  --background-color: #f5f6fa;
  --text-color: #34495e;
}

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: var(--background-color);
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  font-weight: 600;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

button {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

/* Dashboard styles */
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
}

.dashboard-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  margin-bottom: 40px;
  padding: 20px;
}

.dashboard-card h2 {
  color: var(--text-color);
  font-size: 24px;
  margin-bottom: 20px;
}

.users-list {
  margin-bottom: 20px;
}

.users-list .user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
  background-color: #f9f9f9;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.users-list .user:hover {
  background-color: #eaeaea;
}

.users-list .user.active {
  background-color: var(--secondary-color);
  color: #fff;
}

.users-list .user.inactive {
  opacity: 0.6;
}

.users-list .user h4 {
  color: var(--text-color);
  font-size: 18px;
  margin: 0;
}

.user-buttons button {
  margin-left: 10px;
}

.posts-list .post {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.posts-list .post h4 {
  color: var(--text-color);
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 10px;
}

.posts-list .post p {
  color: #888;
  font-size: 14px;
  margin: 0;
}

.add-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
</style>
  