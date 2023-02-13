<template>
   <div class="reset-password">
    <Modal v-if="popupActive" :popupMessage="popupMessage" v-on:close-popup="closePopup"/>
    <Loading v-if="loading"/>
    <div class="form-wrap">
<form class="reset">
  <p class="login-register">
           Back to 
            <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
        </p>
  <h2>Reset Password</h2>
  <p>Enter your email to reset it</p>
  <div class="inputs">
    <div class="input">
      <input type="text" placeholder="Email" v-model="email"/>
      <email class="icon"/>

    </div>
  </div>
  <button class="resetpassword" @click.prevent="resetPassword">Reset</button>
  <div class="angle"></div>
</form>
<div class="background"></div>
    </div>
   </div>
  </template>
  
  <script>



  import email from "../assets/Icons/envelope-regular.svg";
  import Modal from "../components/Modal.vue";
  import Loading from "../components/Loading.vue";
  import firebase from "firebase/app";
  import "firebase/auth";
  export default {
    name: "ForgotPassword",

    data(){
      return{
       email: "",
       popupActive: false,
       popupMessage: '',
       loading: false
      }
    }, 

    components: { email, Modal, Loading },

   methods: {
 
    resetPassword(){
      this.loading = true;
      firebase
      .auth().sendPasswordResetEmail(this.email)
      .then(() =>{
        this.popupMessage = "You will recieve a email, if your account exists";
        this.loading = false;
        this.popupActive = true;
      })
      .catch((err) => {
        this.popupMessage = err.message;
        this.loading = false;
        this.popupActive = true;
      })
    },

    closePopup(){
      this.popupActive = !this.popupActive;
      this.email = '';
    }
   }

  

  
  }
  </script>
  
  <style lang="scss" scoped>

  .reset-password{
    position: relative;
    .form-wrap{
      .reset{
        h2{
          margin-bottom: 8px;

        }
        p{
          text-align: center;
          margin-bottom: 32px;
        }
      }
    }
  }

.resetpassword:hover{
        background-color: green;
    }
  
  </style>