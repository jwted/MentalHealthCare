const axios = require("axios");

const API_BASE_URL = "http://localhost:3000";
let token, userId,diaryId;
let objectiveId = 1;
let categoryId = 1;
let activityId = 1;

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

describe("Objective", () => {
  test("Create Objective", async () => {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/objectives`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name:"Reduce Stress",
        description:"The 'Reduce Stress' course is designed to equip participants with effective strategies and techniques to manage stress effectively. This comprehensive course delves into the root causes of stress, exploring various factors that contribute to its onset and the significant impact it can have on daily life",
        categoryId:`${categoryId}`,
        activityId:`${activityId}`,
      },
    });
    expect(response.status).toBe(201);
  }),
    test("Create Objective - Unauthorized", async () => {
      try {
        const response = await axios({
          method: "post",
          url: `${API_BASE_URL}/objectives`,
          data: {
            name: "Objective",
            description: "Description",
            categoryId: categoryId,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    }),
    test("Create Objective - Bad Request", async () => {
      try {
        const response = await axios({
          method: "post",
          url: `${API_BASE_URL}/objectives`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            name: "Objective",
            description: "Description",
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    }),
    test("Get All Objectives", async () => {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/objectives`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    }),
    test("Pagination - offset and length", async () => {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/objectives?offset=0&length=2`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    }),
    test("Filter by ids", async () => {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/objectives?objective=${objectiveId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(200);
    });

  test("Get Objectives - Not Found", async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_BASE_URL}/objectives/1000`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("Objective by Id", () => {
  test("Get Objective by Id", async () => {
    const response = await axios({
      method: "get",
      url: `${API_BASE_URL}/objectives/${objectiveId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status).toBe(200);
  }),
    test("Get Objective by Id - Not Found", async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${API_BASE_URL}/objectives/1000`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    }),
    test("Update Objective", async () => {
      const response = await axios({
        method: "patch",
        url: `${API_BASE_URL}/objectives/${objectiveId}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        data: {
          name: "Objective",
          description: "Description",
          categoryId: 1,
        },
      });
      expect(response.status).toBe(200);
    }),
    test("Update Objective - Not Found", async () => {
      try {
        const response = await axios({
          method: "patch",
          url: `${API_BASE_URL}/objectives/1000`,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          data: {
            name: "Objective",
            description: "Description",
            categoryId: 1,
          },
        });
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    }),
    test("Delete Objective", async () => {
      const response = await axios({
        method: "delete",
        url: `${API_BASE_URL}/objectives/${objectiveId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(response.status).toBe(204);
    }),
    test("Delete Objective - Not Found", async () => {
        try {
            const response = await axios({
                method: "delete",
                url: `${API_BASE_URL}/objectives/1000`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });   
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});
