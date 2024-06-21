const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTcxODk4MDg1OX0.IAGB_pE49Xq6KzX2w8bgX5CX98wB_ENGz9IP9iPw1v8"
let userId=31
let objectiveId = 3;
let badgeId = 14;

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
        const response = await axios({
          method: "get",
          url: `${API_BASE_URL}/users/1000`,
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
      const response = await axios({
        method: "put",
        url: `${API_BASE_URL}/users/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: "Test User",
          password: "teste",
          bio: "This is a test user",
        },
      });
      expect(response.status).toBe(200);
    });

    test("Edit Profile - No Data", async () => {
      try {
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

  test("Add Objective to User", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/users/${userId}/objectives`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        objectiveId: objectiveId,
        endDate:"23/06/2024",
        beginningDate:"27/06/2024"
      },
    });
    expect(response.status).toBe(201);
  });

  test("Add Objective to User - User not found", async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/1000/objectives`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          objectiveId: objectiveId,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("Add Objective to User - Invalid Data", async () => {
    try {
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

  test("Delete Objective from User", async () => {
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
      let objectiveId = 2;
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/users/1000/objectives/${objectiveId}`,
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
    diaryId = response.data.content.id;
    expect(response.status).toBe(201);
  });

  test("Create Diary - User not found", async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/users/1000/diary`,
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