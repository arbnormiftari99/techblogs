import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
const firebaseDB = require('../../firebaseInit').firestore;
import { API } from '../api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Janar 21, 2023" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "Janar 21, 2023" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Janar 21, 2023" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Janar 21, 2023" }


<<<<<<< HEAD
     ],
     blogPosts: [],
     postLoaded: null,

     blogHTML: "Your blog Title",
     blogTitle: "",
     blogPhotoName: "",
     blogPhotoFileURL: null,
     blogPhotoPreview: null,
     editPost: null,
     user: null,
     profileEmail: null,
     profileFirstName: null,
     profileLastName: null,
     profileUsername: null,
     profileId: null,
     profileInitials: null
=======
    ],
    blogHTML: "Your blog Title",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    isLoggedIn: false,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
>>>>>>> 8903b1ead5bb32563a79a358538b0ce919261793
  },
  mutations: {
    signOut(state) {
      state.isLoggedIn = false
      state.profileEmail = null;
      state.profileFirstName = null;
      state.profileLastName = null;
      state.profileUsername = null;

    },
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    setLoggedIn(state, payload) {
      const userData = JSON.parse(localStorage.getItem('user'));
      console.log('ti got called')
      console.log(userData)

      if (userData || payload) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }

    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.email;
      state.profileFirstName = doc.firstName;
      state.profileLastName = doc.lastName;
      state.profileUsername = doc.username;

    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");

    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },

  actions: {
    async RegisterUser({ commit }, payload) {
      const res = await API.userRegister(payload)
      console.log(commit);
      console.log(res)
      commit("setLoggedIn", res);

    },
    async LogInUser({ commit }, payload) {
      const res = await API.userLogIn(payload);
      console.log(res)
      commit("setLoggedIn", res);

      console.log(res)
      console.log(commit)
    },
    async GetUser({ commit }, payload) {
      const user = await API.getUser({
        userId: payload.userId,
        token: payload.token
      })
      console.log('8888')
      console.log(user)
      commit("setProfileInfo", user);
    },
    async getCurrentUser({ commit }) {
      const dataBase = await firebaseDB.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResult = await dataBase.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials");
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await firebaseDB.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    }
  },
  modules: {
  }
})
