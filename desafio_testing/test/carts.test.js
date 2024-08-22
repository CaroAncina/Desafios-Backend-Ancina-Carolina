/* import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing carts API", () => {
  let cartId;
  let productId;
  let sessionCookie;

  before(async () => {
    // Registra y autentica un usuario regular para las pruebas de carritos
    await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: "user@example.com",
      password: "password",
      age: 25,
      role: "user", // Usuario regular
    });

    const loginResponse = await requester.post("/api/sessions/login").send({
      email: "user@example.com",
      password: "password",
    });

    const cookieResult = loginResponse.headers["set-cookie"];
    sessionCookie = cookieResult && cookieResult[0];

    expect(sessionCookie).to.include("connect.sid");

    // Crear un producto para añadirlo al carrito
    const productResponse = await requester
      .post("/api/products")
      .set("Cookie", sessionCookie)
      .send({
        title: "Producto de Prueba",
        description: "Descripción del producto de prueba",
        price: 150,
        code: "TEST001",
        stock: 20,
        category: "Categoría de prueba",
      });

    productId = productResponse.body.payload._id;
  });

  it("El endpoint POST /api/carts debe crear un carrito correctamente", async () => {
    const { statusCode, body } = await requester
      .post("/api/carts")
      .set("Cookie", sessionCookie)
      .send();

    expect(statusCode).to.equal(201);
    expect(body.payload).to.have.property("_id");
    cartId = body.payload._id;
  });

  it("El endpoint POST /api/carts/:cid/product/:pid debe añadir un producto al carrito", async () => {
    const { statusCode, body } = await requester
      .post(`/api/carts/${cartId}/product/${productId}`)
      .set("Cookie", sessionCookie)
      .send();

    expect(statusCode).to.equal(200);
    expect(body.payload.products).to.be.an("array").that.is.not.empty;
  });

  it("El endpoint GET /api/carts/:cid debe obtener un carrito por ID", async () => {
    const { statusCode, body } = await requester
      .get(`/api/carts/${cartId}`)
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(200);
    expect(body.payload).to.have.property("_id", cartId);
  });

  it("El endpoint PUT /api/carts/:cid/product/:pid debe actualizar la cantidad de un producto en el carrito", async () => {
    const { statusCode, body } = await requester
      .put(`/api/carts/${cartId}/products/${productId}`)
      .set("Cookie", sessionCookie)
      .send({ quantity: 5 });

    expect(statusCode).to.equal(200);
    const updatedProduct = body.payload.products.find(
      (p) => p.product.toString() === productId
    );
    expect(updatedProduct.quantity).to.equal(5);
  });

  it("El endpoint DELETE /api/carts/:cid/product/:pid debe eliminar un producto del carrito", async () => {
    const { statusCode, body } = await requester
      .delete(`/api/carts/${cartId}/products/${productId}`)
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(200);
    const productInCart = body.payload.products.find(
      (p) => p.product.toString() === productId
    );
    expect(productInCart).to.be.undefined;
  });

  it("El endpoint DELETE /api/carts/:cid debe vaciar el carrito", async () => {
    const { statusCode, body } = await requester
      .delete(`/api/carts/${cartId}`)
      .set("Cookie", sessionCookie);

    expect(statusCode).to.equal(200);
    expect(body.payload.products).to.be.an("array").that.is.empty;
  });
});
 */