import { ref, computed } from "vue";
import { defineStore } from "pinia";

const url = "https//innerpeace.com";
export const postStore = defineStore("post", {
  state: () => ({ posts: [], post: null }),
  getters: {
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
  },
  actions: {
    async fetchPosts() {
      const response = await fetch(`${url}/posts`);
      const data = await response.json();
      this.posts = data;
    },

    async fetchPost(id) {
      const response = await fetch(`${url}/posts/${id}`);
      const data = await response.json();
      this.post = data;
    },

    async addPost(post) {
      const response = await fetch(`${url}/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.posts.push(data);
    },

    async updatePost(post) {
      const response = await fetch(`${url}/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.posts = this.posts.map((p) => (p.id === post.id ? data : p));
    },

    async deletePost(post) {
      try {
        const response = await fetch(`${url}/posts/${post.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error deleting post: ${response.statusText}`);
        }

        this.posts = this.posts.filter((p) => p.id !== post.id);
      } catch (error) {
        console.error(error);
      }
    },

    async likePost(post) {
      const response = await fetch(`${url}/posts/${post.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.posts = this.posts.map((p) => (p.id === post.id ? data : p));
    },

    async unlikePost(post) {
      const response = await fetch(`${url}/posts/${post.id}/unlike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.posts = this.posts.map((p) => (p.id === post.id ? data : p));
    },

    async fetchPostComments(post) {
      const response = await fetch(`${url}/posts/${post.id}/comments`);
      const data = await response.json();
      post.comments = data;
    },

    async addComment(post, comment) {
      const response = await fetch(`${url}/posts/${post.id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      post.comments.push(data);
    },

    async deleteComment(post, comment) {
      try {
        const response = await fetch(
          `${url}/posts/${post.id}/comments/${comment.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Error deleting comment: ${response.statusText}`);
        }

        post.comments = post.comments.filter((c) => c.id !== comment.id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
