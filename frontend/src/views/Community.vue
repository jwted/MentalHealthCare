<template>
        <Navbar></Navbar>
        <main v-for="post in getPosts" :key="post.id">
            <PostContainer :post="post"></PostContainer>
        </main>
        <Footer></Footer>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import PostContainer from '../components/PostContainer.vue';
import Footer from '../components/Footer.vue'
import {postStore} from '../store/postStore'
export default {
    components: {
        Navbar,
        PostContainer,
        Footer
    },

    data() {
        return {
            postStore: postStore()
        }
    },

    created () {
        this.postStore.getPosts();
    },

    computed: {
        getPosts() {
            return this.postStore.getAllPosts
        }
    }
}
</script>

<style>

</style>