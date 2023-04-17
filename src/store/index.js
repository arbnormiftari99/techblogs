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


    ],
    selectedBlog: {
      blogPhotoName: "",
      blogHTML: "Your blog Title",
      blogTitle: "",
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
    },
    blogPosts: [],

    usersList: [],
    contentList: [],

    logInError: {
      email: undefined,
      password: undefined,
    },
    registerError: {
      email: undefined,
      password: undefined,
    },

    editPost: null,
    isLoggedIn: false,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    signOut(state) {
      state.isLoggedIn = false
      state.profileEmail = null;
      state.profileFirstName = null;
      state.profileLastName = null;
      state.profileUsername = null;

    },
    addBlogs(state, payload) {
      const modifiedPayload = payload.map(obj => ({
        ...obj,
        dateAdded: obj.dateAdded.slice(0, 10)
      }));
      state.blogPosts = modifiedPayload;
    },
    populateUsers(state, payload) {
      state.usersList = payload;
    },
    populateContent(state, payload) {
      const modifiedPayload = payload.map(obj => ({
        ...obj,
        dateAdded: obj.dateAdded.slice(0, 10)
      }));
      state.contentList = modifiedPayload;
    },
    newBlogPost(state, payload) {
      state.selectedBlog.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.selectedBlog.blogTitle = payload;
    },
    promoteToAdmin(state, payload) {
      state.usersList = state.usersList.filter(user => user.id !== payload.userId);
    },
    fileNameChange(state, payload) {
      state.selectedBlog.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.selectedBlog.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.selectedBlog.blogPhotoPreview = !state.blogPhotoPreview;
    },
    //
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
      console.log('hehhe');

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
    async GetBlogs({ commit }) {
      const res = await API.blogList();
      commit("addBlogs", res);
    },
    async CreateBlog({ commit }, payload) {
      console.log(commit)
      try {
        const res = await API.blogCreate(payload);
        console.log(res)
      } catch { (err) => console.log(err) }
    },
    async GetContent({ commit }, payload) {
      const res = await API.trackerList(payload);
      commit("populateContent", res)
    },
    async RegisterUser({ commit }, payload) {
      const res = await API.userRegister(payload)
      commit("setLoggedIn", res);

    },
    async LogInUser({ commit }, payload) {

      const res = await API.userLogIn(payload);
      console.log(res);

      console.log(commit);
      commit("setLoggedIn", res);
      commit("setProfileInitials");

    },
    async GetUser({ commit }, payload) {
      const user = await API.getUser({
        userId: payload.userId,
        token: payload.token
      })
      commit("setProfileInfo", user);
      commit("setProfileInitials");
    },
    async PromoteUser({ commit }, payload) {
      try {
        const res = await API.userPromote({
          userId: payload.userId,
          token: payload.token
        });
        commit("promoteToAdmin", payload)
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    async GetUsers({ commit }, payload) {
      try {
        const users = await API.getUsers(payload);
        commit("populateUsers", users)
      } catch (err) {
        console.log(err);
      }
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