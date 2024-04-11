const request = require("supertest");
const { faker } = require("@faker-js/faker");
const app = require("../../app");

// must research on mocking or seperate test env

const loginCredential = {
  email: "azh.zhafir@gmail.com",
  password: "password",
};

//register
describe("GET /api/auth/register", () => {
  let token;
  let email;
  let name;
  beforeAll(async () => {
    email = faker.internet.email();
    name = faker.person.firstName();
  });
  afterAll(async () => {
    await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);
  });
  test("should return 200", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: email,
      name: name,
      role: "USER",
      password: "password",
    });
    token = response.body.accessToken;
    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe(email);
  });
  test("should return 500", async () => {
    const response = await request(app).post("/api/auth/register");
    expect(response.statusCode).toBe(500);
  });
});

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
  test("should return 500", async () => {
    const response = await request(app).post("/api/auth/login");
    expect(response.statusCode).toBe(500);
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
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);
  });
  test("should return 200", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("azh.zhafir@gmail.com");
  });
  test("should return 401", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer eyJhbGci`);
    expect(response.statusCode).toBe(401);
  });
});
