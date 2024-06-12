const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE1OTU0MzU1fQ.NnZdD1wIsA3JRCQpe9UGwM8LWSz_wzMbBnPAs1rp9TI";

describe("Badges", () => {
  test("Get Badges", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/badges`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Pagination - offset and length", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/badges?offset=0&length=2`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Filter by ids", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/badges?badges=1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Create Badge", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/badges`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "Badge",
        description: "Description",
        points: 10,
        type: "type",
        requirement: 3,
      },
    });
    expect(response.status).toBe(201);
  });
});

describe("Badge by Id", () => {
  test("Get Badge by Id", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/badges/1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Badge not found", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/badges/100`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(404);
  });

  test("Update Badge", async () => {
    const response = await axios({
      method: "put",
      url: `${API_BASE_URL}/badges/1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: "Badge",
        description: "Description",
        points: 10,
        type: "type",
        requirement: 3,
      },
    });
    expect(response.status).toBe(200);
  }),
    test("Update Badge not found", async () => {
      const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/badges/100`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: "Badge",
          description: "Description",
          points: 10,
          type: "type",
          requirement: 3,
        },
      });
      expect(response.status).toBe(404);
    }),
    test("Delete Badge", async () => {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/badges/1`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    });

  test("Delete Badge not found", async () => {
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/badges/100`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(404);
  });
});
