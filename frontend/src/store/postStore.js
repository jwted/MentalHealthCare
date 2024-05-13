import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
const url = "http://localhost:3000";
export const postStore = defineStore("post", {
  state: () => ({ posts: [], post: null }),
  getters: {
    getAllPosts: (state) => state.posts,
    getPost: (state) => state.post,
  },
  actions: {
    async getPosts() {
      try {
        const response = await axios.get(`${url}/posts`);
        this.posts = response.data.Posts;
      } catch (error) {
        console.log(error);
      }
    },

    async getPostById(id) {
      try {
        const response = await axios.get(`${url}/posts/${id}`);
        this.post = response.data.Post;
      } catch (error) {
        console.log(error);
      }
    },

    async getCommentsByPostId(id) {
      try {
        const response = await axios.get(`${url}/posts/${id}/comments`);
        this.post.comments = response.data.Comments;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
