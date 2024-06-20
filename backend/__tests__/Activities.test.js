const axios = require("axios");
const API_BASE_URL = "http://localhost:3000";
let token, userId, adminToken, activityId;

beforeAll(async () => { 
    const responseLog = await axios({
      method: "post",
      url: `${API_BASE_URL}/login`,
      data: {
        email: "teste@gmail.com",
        password:"teste",
      },
    });
    token = responseLog.data.token;
    userId = responseLog.data.user;
  
    const adminResponse = await axios({
      method: "post",
      url: `${API_BASE_URL}/login`,
      data: {
        email: "testeAdmin@gmail.com",
        password: "teste",
      },
    });
    adminToken = adminResponse.data.token;
    userAdminId = adminResponse.data.user;
  });

describe("Activities", () => {
  test("Create Activity", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/activities`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "Activity",
        description: "Description",
        categoryId: 1,
        points: 100,
      },
    });
    activityId = response.data.Activity.id;
    expect(response.status).toBe(201);
  }),
    test("Get All Activities", async () => {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/activities`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    }),
    test("Pagination - offset and length", async () => {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/activities?offset=0&length=2`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    }),
    test("Filter by ids", async () => {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/activities?activity=${activityId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    });
});

describe("Activity by Id", () => {
  test("Get Activity by Id", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/activities/${activityId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  }),
    test("Get Activity by Id - Not Found", async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_BASE_URL}/activities/100`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });

  test("Update Activity", async () => {
    const response = await axios({
      method: "patch",
      url: `${API_BASE_URL}/activities/${activityId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "Activity",
        description: "Description",
        categoryId: 1,
      },
    });
    expect(response.status).toBe(200);
  }),
    test("Delete Activity", async () => {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/activities/${activityId}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      expect(response.status).toBe(204);
    });
});