/* import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing products API", () => {
  let productId;
  let sessionCookie;

  before(async () => {
    // Autenticación como premium user para poder crear productos
    const loginResponse = await requester.post("/api/sessions/login").send({
      email: "testuser@example.com",
      password: "password",
    });

    const cookieResult = loginResponse.headers["set-cookie"];
    sessionCookie = cookieResult && cookieResult[0];

    expect(sessionCookie).to.include("connect.sid");
  });

  it("El endpoint POST /api/products debe crear un producto correctamente", async () => {
    const productMock = {
      title: "Producto de Prueba",
      description: "Descripción del producto de prueba",
      price: 150,
      code: "TEST001",
      stock: 20,
      category: "Categoría de prueba",
    };

    const { statusCode, body } = await requester
      .post("/api/products")
      .set("Cookie", sessionCookie)
      .send(productMock);

    expect(statusCode).to.equal(201);
    expect(body.payload).to.have.property("_id");
    expect(body.payload.title).to.equal(productMock.title);

    productId = body.payload._id;
  });

  it("El endpoint GET /api/products debe obtener todos los productos", async () => {
    const { statusCode, body } = await requester
      .get("/api/products")
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(200);
    expect(body.payload).to.be.an("array");
  });

  it("El endpoint GET /api/products/:id debe obtener un producto por ID", async () => {
    const { statusCode, body } = await requester
      .get(`/api/products/${productId}`)
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(200);
    expect(body.payload).to.have.property("_id", productId);
  });

  it("El endpoint PUT /api/products/:id debe actualizar un producto correctamente", async () => {
    const updatedData = {
      title: "Producto Actualizado",
      price: 200,
    };

    const { statusCode, body } = await requester
      .put(`/api/products/${productId}`)
      .set("Cookie", sessionCookie)
      .send(updatedData);

    expect(statusCode).to.equal(200);
    expect(body.payload.title).to.equal(updatedData.title);
    expect(body.payload.price).to.equal(updatedData.price);
  });

  it("El endpoint DELETE /api/products/:id debe eliminar un producto correctamente", async () => {
    const { statusCode, body } = await requester
      .delete(`/api/products/${productId}`)
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(200);
    expect(body.payload).to.have.property("_id", productId);
  });

  it("El producto eliminado no debe estar disponible después de la eliminación", async () => {
    const { statusCode, body } = await requester
      .get(`/api/products/${productId}`)
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(404);
  });
});
 */