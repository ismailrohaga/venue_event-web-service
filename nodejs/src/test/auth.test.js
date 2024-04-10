const request = require("supertest");
const app = require("../../app");

const loginCredential = {
  email: "azh.zhafir@gmail.com",
  password: "password",
};

//login
describe("GET /api/auth/login", () => {
  let token;
  afterAll(async () => {
    await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);
  });
  test("should return 200", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(loginCredential);
    token = response.body.accessToken;
    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("azh.zhafir@gmail.com");
  });
});

// get profile
describe("GET /api/auth/profile", () => {
  let token;
  beforeAll(async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(loginCredential);
    token = response.body.accessToken;
  });
  afterAll(async () => {
    await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${token}`);
  });
  test("should return 200", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
  test("should return user", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.user.email).toBe("azh.zhafir@gmail.com");
  });
});
