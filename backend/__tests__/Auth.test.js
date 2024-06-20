const axios = require("axios");
const API_BASE_URL = "http://localhost:3000";

let userId, tokenAdmin, adminId;

describe("Register", () => {
  test("Correct Credentials-User", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/register`,
      data: {
        email: "teste@gmail.com",
        password: "teste",
        name: "User Test",
      },
    });
    expect(response.status).toBe(200);
  }),
    test("Correct Credentials-Admin Registers", async () => {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/register`,
        data: {
          email: "testeadmin@gmail.com",
          password: "teste",
          name: "Admin Test",
          type: 1,
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

describe("Login", () => {
  test("Correct Credentials", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/login`,
      data: {
        email: "teste@gmail.com",
        password: "teste",
      },
    });
    userId = response.data.user;
    expect(response.status).toBe(200);
  });

  test("Correct Credentials-Admin", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/login`,
      data: {
        email: "testeAdmin@gmail.com",
        password: "teste",
      },
    });
    tokenAdmin = response.data.token;
    adminId = response.data.user;
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