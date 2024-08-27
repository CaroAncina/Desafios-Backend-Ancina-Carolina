/* import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing carts API", () => {
  let userCookie;
  let cartId = "66c682a50ccaaa01696edfb1";
  let productId = "66ccfad2de703e4277fb67de";

  before(async () => {
    // Autenticar el "user"
    const loginResponse = await requester.post("/api/sessions/login").send({
      email: "coderuser@mail.com",
      password: "pass1234",
    });

    const cookieResult = loginResponse.headers["set-cookie"];
    userCookie = {
      name: cookieResult[0].split("=")[0],
      value: cookieResult[0].split("=")[1].split(";")[0],
    };

    expect(userCookie.name).to.be.ok.and.eql("connect.sid");
    expect(userCookie.value).to.be.ok;
  });

  it("El endpoint POST /api/carts/product/:pid debe añadir un producto al carrito", async () => {
    const result = await requester
      .post(`/api/carts/product/${productId}`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`)
      .send({ quantity: 1 });

    expect(result.statusCode).to.equal(200);
    expect(result.body.message).to.equal(
      "Producto agregado al carrito con éxito"
    );
    expect(result.body).to.have.property("cart");

    // Verifica que el producto fue añadido correctamente
    const productExists = result.body.cart.products.some(
      (p) => p.product.toString() === productId
    );
    expect(productExists).to.be.true;
  });

  it("El endpoint GET /api/carts/:cid debe obtener el carrito de un usuario", async () => {
    const result = await requester
      .get(`/api/carts/${cartId}`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`)
      .send();

    expect(result.status).to.equal(200);
    expect(result.body).to.have.property("_id").eql(cartId);
    expect(result.body).to.have.property("products").that.is.an("array");
  });

  it("El endpoint DELETE /api/carts/:cid/products/:pid debe eliminar un producto del carrito", async () => {
    const result = await requester
      .delete(`/api/carts/${cartId}/products/${productId}`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`);

    expect(result.statusCode).to.equal(200);
    expect(result.body.result).to.equal("success");
    expect(result.body.message).to.equal("Producto eliminado del carrito");
  });
});
 */