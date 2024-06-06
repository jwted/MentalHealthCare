const axios = require("axios");
const API_BASE_URL = "http://localhost:3000";

describe("Login", () => {
  test("Correct Credentials", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/login`,
      data: {
        email: "johndoe@gmail.com",
        password: "123",
      },
    });
    expect(response.status).toBe(200);
  });
  test("Invalid Credentials", async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/login`,
        data: {
          email: "johndoesfasfasfasf@gmail.com",
          password: "123",
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Missing Credentials", async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/login`,
        data: {
          email: "",
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("Register", () => {
  test("Correct Credentials", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/register`,
      data: {
        email: "user@gmail.com",
        password: "123",
        name: "User",
      },
    });
    expect(response.status).toBe(200);
  }),
    test("Missing Credentials", async () => {
      try {
        const response = await axios({
          method: "post",
          url: `${API_BASE_URL}/register`,
          data: {
            email: "user@gmail.com",
            password: "123",
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    }),
    test("Invalid Credentials", async () => {
      try {
        const response = await axios({
          method: "post",
          url: `${API_BASE_URL}/register`,
          data: {
            email: "johndoe@gmail.com",
            password: "123",
            name: "User",
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(409);
      }
    });
});
