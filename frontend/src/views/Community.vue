<template>
        <Navbar></Navbar>
        <main>
            <PostContainer></PostContainer>
        </main>
        <Footer></Footer>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import PostContainer from '../components/PostContainer.vue';
import Footer from '../components/Footer.vue'
export default {
    components: {
        Navbar,
        PostContainer,
        Footer
    },
}
</script>

<style>

</style>