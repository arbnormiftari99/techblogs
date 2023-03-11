import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseDB from "../../firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Janar 21, 2023"},
      {blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "Janar 21, 2023"},
      {blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Janar 21, 2023"},
      {blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Janar 21, 2023"}


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
  },
  mutations: {

    newBlogPost(state, payload){
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload){
      state.blogTitle = payload;
    },
    fileNameChange(state, payload){
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload){
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },


    toggleEditPost(state, payload){
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload){
      state.user = payload;
    },
    setProfileInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;

    },
    setProfileInitials(state){
     state.profileInitials = 
      state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");

    },
    changeFirstName(state, payload){
      state.profileFirstName = payload;
    },
    changeLastName(state, payload){
      state.profileLastName = payload;
    },
    changeUsername(state, payload){
      state.profileUsername = payload;
    },
  },
 
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await firebaseDB.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResult = await dataBase.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials");
    },
    async updateUserSettings({commit, state}){
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
