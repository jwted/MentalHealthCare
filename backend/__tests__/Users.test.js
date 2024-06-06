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

describe("User by ID", () => {
  describe("Get User", () => {
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
      try {
        let userId = 999;
        const response = await axios({
          method: "get",
          url: `${API_BASE_URL}/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });
  describe("Edit Profile", () => {
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
      try {
        let userId = 3;
        const response = await axios({
          method: "put",
          url: `${API_BASE_URL}/users/${userId}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });
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
    try {
      let userId = 90;
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/users/${userId}/objectives`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Delete Objective from User", async () => {
    let userId = 1;
    let objectiveId = 2;
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/users/${userId}/objectives/${objectiveId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(204);
  });

  test("Delete Objective from User - User not found", async () => {
    try {
      let userId = 90;
      let objectiveId = 2;
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/users/${userId}/objectives/${objectiveId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Delete Objective from User - Objective not found", async () => {
    try {
      let userId = 1;
      let objectiveId = 90;
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/users/${userId}/objectives/${objectiveId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Add Objective to User", async () => {
    let userId = 1;
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/users/${userId}/objectives`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        objectiveId: 1,
      },
    });
    expect(response.status).toBe(201);
  });

  test("Add Objective to User - User not found", async () => {
    try {
      let userId = 90;
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/${userId}/objectives`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          objectiveId: 1,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Add Objective to User - Invalid Data", async () => {
    try {
      let userId = 1;
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/${userId}/objectives`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          objectiveId: 90,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("User Badges", () => {
  test("Get User Badges", async () => {
    let userId = 1;
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users/${userId}/badges`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Get User Badges - User not found", async () => {
    try {
      let userId = 90;
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/users/${userId}/badges`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Add Badge to User", async () => {
    let userId = 1;
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/users/badges`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        badgeId: 1,
      },
    });
    expect(response.status).toBe(201);
  });

  test("Add Badge to User - User not found", async () => {
    try {
      let userId = 90;
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/badges`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          badgeId: 1,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Add Badge to User - Invalid Data", async () => {
    try {
      let userId = 1;
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/badges`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          badgeId: 90,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});

describe("User Diary", () => {
  test("Get User Diaries", async () => {
    let userId = 1;
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/users/${userId}/diary`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  });

  test("Get User Diaries - User not found", async () => {
    try {
      let userId = 90;
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/users/${userId}/diary`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Create Diary", async () => {
    let userId = 1;
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/users/${userId}/diary`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        pensamentos: "Teste",
        sentimentos: "Teste",
        conquistas: "Teste",
        outrasObservacoes: "Teste",
      },
    });
    expect(response.status).toBe(201);
  });

  test("Create Diary - User not found", async () => {
    try {
      let userId = 90;
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/${userId}/diary`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          pensamentos: "Teste",
          sentimentos: "Teste",
          conquistas: "Teste",
          outrasObservacoes: "Teste",
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Create Diary - Invalid Data", async () => {
    try {
      let userId = 1;
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/${userId}/diary`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          pensamentos: "",
          sentimentos: "",
          conquistas: "",
          outrasObservacoes: "",
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Delete Diary", async () => {
    let userId = 1;
    let diaryId = 1;
    const response = await axios({
      method: "delete",
      url: `${API_BASE_URL}/users/${userId}/diary/${diaryId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(204);
  });
});