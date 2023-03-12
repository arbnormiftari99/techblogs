<template>
    <div class="create-post">
        <BlogCoverPreview v-show="this.$store.state.BlogCoverPreview" />
        <Loading v-show="loading" />
        <div class="container">
            <div :class="{ invisible: !error }" class="err-message">
                <p><span>Error: </span>{{ this.errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
                    <button @click="openPreview" class="preview"
                        :class="{ 'button-inactive': !this.$store.state.selectedBlog.blogPhotoFileURL }">
                        Preview Photo
                    </button>
                    <span>File Chosen: {{ this.$store.state.selectedBlog.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                hello
                <vue-editor :editorOptions="editorOptions" v-model="blogHTMLData" useCustomImageHandler />
            </div>
            <div class="blog-actions">
                <button @click="uploadBlog">Publish Blog</button>
                <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
            </div>
            <div class="modal" v-if="showPreviewModal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <img :src="this.$store.state.selectedBlog.blogPhotoFileURL" alt="Blog Cover Preview">
                </div>
                <button class="modal-close is-large" aria-label="close" @click="showPreviewModal = false"></button>
            </div>
        </div>
    </div>
</template>
 
<script>
import Loading from "../components/Loading.vue";
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import firebase from "firebase/app";
import "firebase/storage";
// import firebaseDB from "../../firebaseInit";

import Quill from "quill";

window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
    name: 'CreatePost',

    data() {
        return {
            showPreviewModal: false,
            error: null,
            errorMsg: null,
            file: null,
            loading: null,
            blogTitle: '',
            blogHTMLData: '',
            editorOptions: {
                modules: {
                    toolbar: {
                        container: [
                            ["bold", "italic", "underline", "strike"],
                            [{ header: 1 }, { header: 2 }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ align: [] }],
                            ["link", "image"],
                        ],
                        handlers: {
                            image: this.imageHandler,
                        },
                    },
                }
            }
        }
    },

    components: {
        BlogCoverPreview,
        Loading,
    },


    methods: {

        fileChange() {
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));

        },
        openPreview() {
            this.$store.commit("openPhotoPreview");
            this.showPreviewModal = true; // set modal display to true
        },
        imageHandler(file, Editor, cursorLocation, resetUploader) {
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
            docRef.put(file).on("state_changed", (snapshot) => {
                console.log(snapshot);
            },
                (err) => {
                    console.log(err);
                }, async () => {
                    const downloadURL = await docRef.getDownloadURL();
                    Editor.insertEmbed(cursorLocation, "image", downloadURL);
                    resetUploader();
                }
            )

        },
        uploadBlog() {
            const userData = JSON.parse(localStorage.getItem('user'));
            const text = this.blogHTMLData.slice(3, this.blogHTMLData.length - 4);
            if (this.blogTitle.length !== 0 && text !== 0) {
                const token = userData.token;
                const userId = userData.userId;
                const username = this.$store.state.profileUsername;
                const blog = {
                    title: this.blogTitle,
                    textContent: text,
                    image: null,
                }
                console.log(blog)
                const payload = {
                    blog: blog,
                    token: token,
                    userId: userId,
                    username: username,
                    file: this.file
                }
                console.log(payload)
                this.$store.dispatch("CreateBlog", payload)
                this.$router.push({ name: "Home" });
            }
        },
        created() {
            // Initialize the data property with the value from the computed property
            this.blogHTMLData = this.blogHTML;
        },


        computed: {
            profileId() {
                return this.$store.state.profileId;
            },

        },


    },
}

</script>

<style lang="scss">
 .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
    }

    .modal-content {
        max-width: 80%;
        max-height: 80%;
    }

.create-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0;

    }

    .router-button {
        text-decoration: none;
        color: #fff;

    }

    label,
    button,
    .router-button {
        transition: 0.5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(0, 115, 145, 0.8)
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;

    }


    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: 5s ease all;

        p {
            font-size: 14px;

        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 300px;

        }

        input {
            transition: .5s ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            flex: 1;
            margin-left: 16px;
            display: flex;
            position: relative;

            input {
                display: none;

            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;

            }
        }


    }

    .editor {
        height: 60vh;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        margin-top: 32px button {
            margin-right: 16px;
        }
    }

}
</style>