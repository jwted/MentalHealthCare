const axios = require("axios");
const API_BASE_URL = "http://localhost:3000";
let activityId
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTcxODk4MDg1OX0.IAGB_pE49Xq6KzX2w8bgX5CX98wB_ENGz9IP9iPw1v8"




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
        categoryId: "1",
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

    test("Delete Activity", async () => {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/activities/${activityId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(204);
    });
});