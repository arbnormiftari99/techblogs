
<template>
  <div class="Home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View more recent Blogs</h3>
        <div class="blog-cards">
       <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>
    <button @click.prevent="signIn">login</button>
     <div v-if="!user" class="updates">
        <div class="container">
          <h4>Never miss a post - Create your account for free. TECHBLOGS!</h4>
          <router-link class="router-button" :to="{name: 'Login'}"> Register TechBlogs <Arrow class="arrow arrow-light"/></router-link>
        </div>

     </div>    
  </div>
</template>

<script>


import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
import Arrow from '../assets/Icons/arrow-right-light.svg';
import {API} from '../api/index.js';


export default {
  name: 'Home',
  components: { BlogPost, BlogCard, Arrow },


  data(){
    return {
      welcomeScreen: {
        title: 'Welcome',
        blogPost: 'Që nga viti 2020, ne mënyrë intenzive kemi aftësuar qindra studentë me të gjitha aftësitë e nevojshme për të ndërtuar një karrierë të suksesshme në botën e zhvillimit softuerik.',
      welcomeScreen: true, 
      photo: 'coding',
      },
      sampleBlogPost: [
        {
          title: 'This is a filler Title!',
          blogHTML: 'This is a filler Title!',
          blogCoverPhoto: 'beautiful-stories',

        },
        { 
          title: 'This is a filler Title2!',
          blogHTML: 'This is a filler Title!',
          blogCoverPhoto: 'designed-for-everyone',          
        },
        {
          title: 'This is a filler Titl2!',
          blogHTML: 'This is a filler Title!',
          blogCoverPhoto: 'company',
        }
      ],
   
      };
    },
    methods:{
      async signIn(){
        // await API.userLogIn({email:"admin101@gmail.com",password:"TheSecretPass123"})
        await API.trackerList({token:'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVjaGJsb2dzLTg1YTIxIiwiYXVkIjoidGVjaGJsb2dzLTg1YTIxIiwiYXV0aF90aW1lIjoxNjc4MjI5NjgyLCJ1c2VyX2lkIjoiUDhKT09mSlhySmJwYWF5YTVEUFVDeG5HNUF3MiIsInN1YiI6IlA4Sk9PZkpYckpicGFheWE1RFBVQ3huRzVBdzIiLCJpYXQiOjE2NzgyMjk2ODIsImV4cCI6MTY3ODIzMzI4MiwiZW1haWwiOiJhZG1pbjEwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWRtaW4xMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.TM8hyfSmNvgrwda43IXGJz6xltDRoYSwtSXM3NALBfwu58n40Z8sf4SGTHI_f_8OZsW9asauSuigzd_zJXiCZz5I6M9GBdFwMdy54V33MKXrLPIKVzDbhrAw5niumXfMliUnxI8EVeyP3gXNNQLxUlYHS9W7FLIy4-qmmnj4ehXiTe-ZlNI1F745sDzqNjEVPClFpTYULxWoSELCNYndFnyZMz2zm-GwN0hflEB36BIXhcWKkPlruevQ4cFDd2oDDSJooBFIHjQg722UKwPai1Ya4uiwmLNmfwlyN80XDkPSgBD-X4wDDiQ6vLtOqBumXbcuZjWbbm3vJAWXcXlEow'})
      }
    },
    computed: {
      sampleBlogCards() { 
      return this.$store.state.sampleBlogCards;
      },
      user(){
            return this.$store.state.user;
        },  
    },
  
};
</script>


<style lang="scss" scoped>
.blog-card-wrap{
  h3{
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }   
}

.updates{
  .container{
    display: flex;
    padding: 100px 25px;
    flex-direction: column;
    align-items: center;
    @media(min-width: 800px){
     padding: 125px 25px;
     flex-direction: row;
    }
    
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px){
        margin-left: auto;

      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media(min-width: 800px){
        text-align: initial;
        font-size: 40px;

      }
    }

  }
}
</style>
      

    
    


