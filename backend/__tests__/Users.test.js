const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE1OTU0MzU1fQ.NnZdD1wIsA3JRCQpe9UGwM8LWSz_wzMbBnPAs1rp9TI";

describe("Get All Users", () => {
  test("All Correct - Default Response", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Pagination - With Offset and Length", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users?offset=1&length=3`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Search by User ID - Single ID", async () => {
    const userIds = ["1"];
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users?user=${userIds.join(",")}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Search by User ID - Multiple IDs", async () => {
    const userIds = ["1", "2"];
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users?user=${userIds.join(",")}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });
});

describe("Get User by ID", () => {
  test("Correct ID", async () => {
    let userId = 1;
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Incorrect ID", async () => {
    let userId = 999;
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(404);
  });

  test("Edit Profile", async () => {
    let userId = 1;
    const response = await axios({
      method: "put",
      url: `${API_BASE_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "Test User",
        password: "testpassword",
        bio: "This is a test user",
      },
    });
    expect(response.status).toBe(200);
  });

  test("Edit Profile - No Data", async () => {
    let userId = 3;
    const response = await axios({
      method: "put",
      url: `${API_BASE_URL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(400);
  });
});

describe("User Objectives", () => {
  test("Get User Objectives", async () => {
    let userId = 3;
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users/${userId}/objectives`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Get User Objectives - User not found", async () => {
    let userId = 90;
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users/${userId}/objectives`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Delete Objective from User", async () => {
    let userId = 3;
    let objectiveId = 3;
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/users/${userId}/objectives/${objectiveId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(204);
  });
});
