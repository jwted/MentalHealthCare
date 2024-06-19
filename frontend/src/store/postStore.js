import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";

export const postStore = defineStore("post", {
  state: () => ({
    posts: [],
    post: null,
    userLikes: [],
    comments: [],
    postComments: [],
  }),
  getters: {
    getAllPosts: (state) => state.posts,
    getPost: (state) => state.post,
    getAllComments: (state) => state.comments,
    getPostComments: (state) => state.postComments,
  },
  actions: {
    async getPosts(query) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        if (query) {
          const response = await axios.get(`${url}/posts?${query}`, config);
          this.posts = response.data.content;
          return;
        }
        const response = await axios.get(`${url}/posts`, config);
        this.posts = response.data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async getIndividualPost(id) {
      try {
        console.log(+id);
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${url}/posts/${id}`, config);
        this.post = response.data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async getCommentsByPostId(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${url}/posts/${id}/comments`, config);
        this.postComments = response.data.content;
      } catch (error) {
        console.log(error);
      }
    },

    async addPost(post) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));

        const body = { text: post };
        const headersConfig = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(`${url}/posts`, body, {
          headers: headersConfig,
        });
        if (response.data.status === 201) {
          this.posts.push(response.data.Post);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deletePost(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(`${url}/posts/${id}`, config);
        if (response.status === 204) {
          this.posts = this.posts.filter((post) => post.id !== id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async likePost(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        if (!token) {
          throw new Error("No token found");
        }

        const headersConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(
          `${url}/posts/${id}/like`,
          {},
          headersConfig
        );
        if (response.status === 201) {
          const likedPost = this.posts.find((post) => post.id === id);
          if (likedPost) {
            likedPost.likes += 1;
          }
          this.userLikes.push(id);
        } else if (response.status === 204) {
          const unlikedPost = this.posts.find((post) => post.id === id);
          if (unlikedPost) {
            unlikedPost.likes -= 1;
          }
          this.userLikes = this.userLikes.filter((like) => like !== id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addComment(postId, comment) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const body = { text: comment };
        const headersConfig = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(
          `${url}/posts/${postId}/comments`,
          body,
          {
            headers: headersConfig,
          }
        );
        if (response.data.status === 201) {
          this.comments.push(response.data.comment);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
