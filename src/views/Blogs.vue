<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit" v-if="isAdmin">
        <span>Toggle editing/deleting Post</span>
        <input type="checkbox" v-model="editPost">
      </div>
      <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
      <Modal :is-open="this.isModalOpen" @update:is-open="isModalOpen = $event">
        <h2>Hello, World!</h2>
        <p>This is some sample content for the modal.</p>
        <button @click="closeModal">Close Modal</button>
      </Modal>
      <button @click="openModal">Open Modal</button>
    </div>
  </div>
  
</template>

<script>
import BlogCard from '../components/BlogCard.vue';
import Modal from '../components/EditBlog.vue'
// import { API } from '../api';
export default {
  name: 'blogs',
  components: { BlogCard, Modal },
  created(){
      this.$store.dispatch("GetBlogs")
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods:{
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
  // methods:{
  //   getList(){
  //     this.$store.dispatch("GetBlogs")
  //   }
  // },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
    blogPosts(){
      return this.$store.state.blogPosts;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
    isAdmin(){
            if(this.$store.state.isLoggedIn){
                const user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):undefined;
                return user?user.role === 'ADMIN':false
            }
            return false;
        }
  },
  beforeDestroy() {
    this.$store.commit("toggleEditPost", false);
  }

};
</script>

<style lang="scss" scoped>
.hiiii{
  background-color: red;
}
.blog-cards {
  position: relative;


  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;

    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);


    }

    input:checked[type="checkbox"]:before {
      background: red;
      left: 52px;
    }
  }
}
</style>