const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";

let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTcxODk4MDg1OX0.IAGB_pE49Xq6KzX2w8bgX5CX98wB_ENGz9IP9iPw1v8"
let userId=31
let postId, commentId;

describe("Posts", () => {
    test("Get All Posts", async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/posts`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    })

    test("Pagination - offset and length", async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/posts?offset=0&length=2`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    })

    test("Add Post", async () => {
        const response = await axios({
            method: "post",
            url: `${API_BASE_URL}/posts`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                text: "Test Post",
            },
        });
        postId = response.data.Post.id;
        expect(response.status).toBe(201);
    })

    test("Missing Field: Text", async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${API_BASE_URL}/posts`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    text: "",
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    })
})

describe ("Post by ID", () => {
    test("Get Post by ID", async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/posts/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    })

    test("Post not found", async () => {
        try {
            const response = await axios({
                method: "get",
                url: `${API_BASE_URL}/posts/1000`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })

    test("Update Post by ID", async () => {
        const response = await axios({
            method: "put",
            url: `${API_BASE_URL}/posts/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                text: "Updated Test Post",
            },
        });
        expect(response.status).toBe(200);
    })

    test("Missing Field: Text", async () => {
        try {
            const response = await axios({
                method: "put",
                url: `${API_BASE_URL}/posts/${postId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    text: "",
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    })

    test("Update Post by ID - Post not found", async () => {
        try {
            const response = await axios({
                method: "put",
                url: `${API_BASE_URL}/posts/1000`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    text: "Updated Test Post",
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })

    test("Delete Post by ID - Post not found", async () => {
        try {
            const response = await axios({
                method: "delete",
                url: `${API_BASE_URL}/posts/1000`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })
})

describe("Comments", () => {
    test("Get Comments by Post ID", async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/posts/${postId}/comments`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    })

    test("Get Comments by Post ID - Post not found", async () => {
        try {
            const response = await axios({
                method: "get",
                url: `${API_BASE_URL}/posts/1000/comments`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })

    test("Pagination - offset and length", async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/posts/${postId}/comments?offset=0&length=2`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    })

    test("Add Comment", async () => {
        const response = await axios({
            method: "post",
            url: `${API_BASE_URL}/posts/${postId}/comments`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                text: "Test Comment",
            },
        });
        commentId=response.data.Comment.id;
        expect(response.status).toBe(201);
    })

    test("Add Comment - Post not found", async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${API_BASE_URL}/posts/1000/comments`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    text: "Test Comment",
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })
})

describe("Comment by ID", () => {
    test("Get Comment by ID", async () => {
        const response = await axios({
            method: "get",
            url: `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(200);
    })

    test("Get Comment by ID - Comment not found", async () => {
        try {
            const response = await axios({
                method: "get",
                url: `${API_BASE_URL}/posts/2/comments/1000`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })

    test("Update Comment by ID", async () => {
        const response = await axios({
            method: "put",
            url: `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                text: "Updated Test Comment",
            },
        });
        expect(response.status).toBe(200);
    })

    test("Update Comment by ID - Comment not found", async () => {
        try {
            const response = await axios({
                method: "put",
                url: `${API_BASE_URL}/posts/${postId}/comments/1000`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    text: "Updated Test Comment",
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    }),

    test("Delete Comment by ID - Comment not found", async () => {
        try {
            const response = await axios({
                method: "delete",
                url: `${API_BASE_URL}/posts/${postId}/comments/1000`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    })
})

describe("Deletes", () => {
    test("Delete Comment by ID", async () => {
        const response = await axios({
            method: "delete",
            url: `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(204);
    })

    test("Delete Post by ID", async () => {
        const response = await axios({
            method: "delete",
            url: `${API_BASE_URL}/posts/${postId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        expect(response.status).toBe(204);
    })
})