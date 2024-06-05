import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
const url = "http://localhost:3000";
export const postStore = defineStore("post", {
  state: () => ({ posts: [], post: null,userLikes:[] }),
  getters: {
    getAllPosts: (state) => state.posts,
    getPost: (state) => state.post,
  },
  actions: {
    async getPosts(query) {
      try {
        const token=JSON.parse(localStorage.getItem("Token"))
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        if(query){
          const response = await axios.get(`${url}/posts?${query}`,config)
          this.posts=response.data.content
          return
        }
        const response = await axios.get(`${url}/posts`,config);
        this.posts = response.data.content;
        this.posts =response.data.content;
      } catch (error) {
        console.log(error);
      }
    },

    async addPost(post) {
      try {
        const token=JSON.parse(localStorage.getItem("Token"))
        
        const body={text:post}
        const headersConfig = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(`${url}/posts`, body, { headers: headersConfig });
        if(response.data.status === 201){
          this.posts.push(response.data.Post);
        }
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
    },
    async likePost(id) {
      try {
        console.log(id);
        console.log('tou ca ');
        
        const token = JSON.parse(localStorage.getItem("Token"));
        if (!token) {
          throw new Error('No token found');
        }
        
        console.log(localStorage.getItem("Token"));
        
        const headersConfig = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        const response = await axios.post(`${url}/posts/${id}/like`, {}, headersConfig);
        console.log(response)
        if (response.status === 201) {
          this.userLikes.push(id);
          console.log('201')
        } else if (response.status === 204) {
          this.userLikes = this.userLikes.filter((like) => like !== id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  },

});
