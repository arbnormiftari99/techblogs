<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons">
            <div class="icon" @click="handleEdit">
                <Edit class="edit" />
            </div>
            <div class="icon" @click="handleDelete">
                <Delete class="delete" />
            </div>
        </div>
        <!-- <img :src="require(`../assets/blogCards/stock-1.jpg`)" alt=""> -->
        <img :src="imageSrc" alt="Blog Image">
        <div class="info">
            <h4>{{ post.title }}</h4>
            <h6>Posted on: {{ post.dateAdded }}</h6>
            <router-link class="link" to="#">
                View the Post
                <Arrow class="arrow" />
            </router-link>
        </div>
    </div>
</template>

<script>
import Arrow from '../assets/Icons/arrow-right-light.svg';
import Edit from '../assets/Icons/edit-regular.svg';
import Delete from '../assets/Icons/trash-regular.svg';
// import { blogDelete } from '../api/index.js';

// import axios from 'axios';

export default {
    name: "blogCard",
    props: ['post'],


    components: {
        Arrow, Edit, Delete
    },
    data() {
        return {
            imageSrc: ''
        }
    },
    mounted() {
        if (this.post.img) {
            const binaryData = this.post.img.data.data; // get the binary data from the blog object
            const typedArray = new Uint8Array(binaryData); // create a typed array from the binary data
            const blob = new Blob([typedArray], { type: 'image/jpeg' }); // create a blob object with the typed array and content type
            this.imageSrc = URL.createObjectURL(blob); // create a URL for the blob object and set it as the image source

        }
    },

    methods: {
        async handleDelete() {
            try {
                const userString = localStorage.getItem('user');
                const user = JSON.parse(userString);
                if (user) {
                    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
                    if (confirmed) {
                        await this.$store.dispatch("DeleteBlog", { blogId: this.post._id, token: user.token })
                        this.$store.dispatch("GetBlogs");
                    }
                }
            } catch (err) {
                console.error(err);
                // handle any error that occurred during the request
            }
        },
        handleEdit() {
            // try {
            //     const userString = localStorage.getItem('user');
            //     const user = JSON.parse(userString);
            //     if (user) {
            //         this.$store.dispatch("DeleteBlog", { blogId: this.post._id, token: user.token })
            //         this.$store.dispatch("GetBlogs");
            //     }
            // } catch (err) {
            //     console.error(err);
            //     // handle any error that occurred during the request
            // }
            this.$router.push
        },
        checkifAdmin() {



        },
    },


    computed: {
        editPost() {
            return this.$store.state.editPost;
        }
    }

}

</script>

<style lang="scss">
.blog-card {
    height: 350px;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 300px;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        // animation: rotation 2s infinite linear;

        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 100;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: 5s ease all;

            &:hover {
                background-color: #303030;

                .edit,
                .delete {
                    path {
                        fill: #fff;

                    }
                }

            }

            &:nth-child(1) {
                margin-right: 8px;

            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;

            }
        }

    }

    img {
        display: block;
        border-radius: 8px;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: #000;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 350;
        }

        h6 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            padding-top: 20px;
            font-size: 12px;
            padding-bottom: 4px;
            transition: 0.5s ease-in all;

            &:hover {
                color: rgba(48, 48, 48, 0.8);
            }

            .arrow {
                width: 10px;
            }

        }
    }
}
</style>