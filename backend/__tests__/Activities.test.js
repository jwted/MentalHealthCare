const axios = require("axios");
const API_BASE_URL = "http://localhost:3000";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE1OTU0MzU1fQ.NnZdD1wIsA3JRCQpe9UGwM8LWSz_wzMbBnPAs1rp9TI";

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
        points:100
      },
    });
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
        url: `${API_BASE_URL}/activities?activity=1`,
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
      url: `${API_BASE_URL}/activities/1`,
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
      url: `${API_BASE_URL}/activities/14`,
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
        url: `${API_BASE_URL}/activities/2`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(204);
    });
});