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
});
