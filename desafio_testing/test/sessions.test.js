import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing sessions API", () => {
  let premiumCookie;
  let userCookie;

  it("El endpoint POST /api/sessions/register debe registrar un usuario premium correctamente", async () => {
    const mockUserPremium = {
      first_name: "Premium",
      last_name: "User",
      email: "coderpremium@mail.com",
      password: "passpremium",
      age: 30,
      role: "premium",
    };

    const result = await requester
      .post("/api/sessions/register")
      .send(mockUserPremium);

    expect(result.statusCode).to.equal(302);
  });

  it("El endpoint POST /api/sessions/register debe registrar un usuario con rol user correctamente", async () => {
    const mockUser = {
      first_name: "Regular",
      last_name: "User",
      email: "coderuser@mail.com",
      password: "pass1234",
      age: 28,
    };

    const result = await requester
      .post("/api/sessions/register")
      .send(mockUser);

    expect(result.statusCode).to.equal(302);
  });

  it("El endpoint POST /api/sessions/login debe loguear correctamente al usuario premium y verificar que no tenga un carrito asignado", async () => {
    const mockUserPremium = {
      email: "coderpremium@mail.com",
      password: "passpremium",
    };

    const result = await requester
      .post("/api/sessions/login")
      .send(mockUserPremium);

    expect(result.statusCode).to.equal(302);

    const cookieResult = result.headers["set-cookie"];
    expect(cookieResult).to.be.ok;

    premiumCookie = {
      name: cookieResult[0].split("=")[0],
      value: cookieResult[0].split("=")[1],
    };

    expect(premiumCookie.name).to.be.ok.and.eql("connect.sid");
    expect(premiumCookie.value).to.be.ok;

    const { body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", `${premiumCookie.name}=${premiumCookie.value}`);

    expect(body.email).to.be.eql("coderpremium@mail.com");
    expect(body.cart).to.be.undefined;
  });

  it("El endpoint POST /api/sessions/login debe loguear correctamente al usuario con rol user y verificar que tenga un carrito asignado", async () => {
    const mockUser = {
      email: "coderuser@mail.com",
      password: "pass1234",
    };

    const result = await requester.post("/api/sessions/login").send(mockUser);

    expect(result.statusCode).to.equal(302);

    const cookieResult = result.headers["set-cookie"];
    expect(cookieResult).to.be.ok;

    userCookie = {
      name: cookieResult[0].split("=")[0],
      value: cookieResult[0].split("=")[1],
    };

    expect(userCookie.name).to.be.ok.and.eql("connect.sid");
    expect(userCookie.value).to.be.ok;

    const { body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", `${userCookie.name}=${userCookie.value}`);

    expect(body.email).to.be.eql("coderuser@mail.com");
  });
});
