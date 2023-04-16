<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"><b>Login</b></router-link>
      </p>
      <h2>Register | TechBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName">
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName">
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username">
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email">
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password">
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register" class="signin">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>
  
<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import 'firebase/firestore';



// import firebase from "firebase/app";
import "firebase/auth";
// import firebaseDB from "../../firebaseInit";
import { mapActions } from 'vuex';

export default {
  name: "Register",

  components: { email, password, user },

  data() {
    return {

      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      error: null,
      errorMsg: ""
    };
  },
  methods: {
    ...mapActions(['RegisterUser']),
    register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        this.RegisterUser({
          email: this.email.trim(),
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username
        }).then(() => {
          console.log('user registered')
        }).catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
        })
        // const firebaseAuth = await firebase.auth();
        // const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        // const result = await createUser;
        // const dataBase =  firebaseDB.collection("users").doc(result.user.uid);
        // // this.$router.push({ name: "Home" }); 
        // await dataBase.set({
        //   firstName: this.firstName,
        //   lastName: this.lastName,
        //   username: this.username,
        //   email: this.email,
        // });
        this.$router.push({ name: "Home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill all fields!";
      return;
    },
  },

};
</script>
  
<style lang="scss" scoped>
.signin:hover {
  background-color: green;
}

.register {
  h2 {
    max-width: 350px;
  }
}
</style>