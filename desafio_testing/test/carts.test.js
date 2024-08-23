/* import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing carts API", () => {
  let userCookie;
  let cartId = "66c682a50ccaaa01696edfb1";
  let productId = "66c7cd9e944c424e4776678c";

  before(async () => {
    userCookie = {
      name: "connect.sid",
      value:
        "s%3AOxpH1kVMbxOdoueTosY82rNxAEdceuDZ.3Z2LYQiskKMgqRF6JJW3PjyZBDS7PDFGxZUnIf46S2c",
    };
  });

  it("El endpoint POST /api/carts/:cid/products/:pid debe añadir un producto al carrito", async () => {
    const result = await requester
      .post(`/api/carts/${cartId}/products/${productId}`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`)
      .send();

    expect(result.statusCode).to.equal(200);
    expect(result.body.payload.products).to.be.an("array").that.is.not.empty;
  });

  it("El endpoint DELETE /api/carts/:cid/product/:pid debe eliminar un producto del carrito", async () => {
    const result = await requester
      .delete(`/api/carts/${cartId}/products/${productId}`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`);

    expect(result.statusCode).to.equal(200);
    expect(result.body.payload.products).to.not.include(productId);
  });

  it("El endpoint DELETE /api/carts/:cid debe vaciar el carrito", async () => {
    const result = await requester
      .delete(`/api/carts/${cartId}`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`);

    expect(result.statusCode).to.equal(200);
    expect(result.body.payload.products).to.be.an("array").that.is.empty;
  });

  it("El endpoint POST /api/carts/:cid/purchase debe permitir realizar una compra", async () => {
    const result = await requester
      .post(`/api/carts/${cartId}/purchase`)
      .set("Cookie", `${userCookie.name}=${userCookie.value}`);

    expect(result.statusCode).to.equal(200);
    expect(result.body.payload).to.have.property("receipt");
  });
});
 */