/* import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing products API", () => {
  let productId;
  let premiumCookie;

  before(async () => {
    // Autenticar el usuario premium
    const loginResponse = await requester.post("/api/sessions/login").send({
      email: "coderpremium@mail.com",
      password: "passpremium",
    });

    const cookieResult = loginResponse.headers["set-cookie"];
    premiumCookie = {
      name: cookieResult[0].split("=")[0],
      value: cookieResult[0].split("=")[1],
    };

    expect(premiumCookie.name).to.be.ok.and.eql("connect.sid");
    expect(premiumCookie.value).to.be.ok;
  });

  it("El endpoint POST /api/products debe permitir crear un nuevo producto", async () => {
    const productData = {
      title: "Producto Premium",
      description: "Descripción del producto premium",
      price: 500,
      code: "PREM001",
      stock: 100,
      category: "Categoría Premium",
    };

    const result = await requester
      .post("/api/products")
      .set("Cookie", `${premiumCookie.name}=${premiumCookie.value}`)
      .send(productData);

    expect(result.status).to.equal(201);
    expect(result.body.result).to.equal("success");
    expect(result.body.payload).to.have.property("_id");

    // Guardar el ID del producto creado
    productId = result.body.payload._id;
    expect(productId).to.be.ok;
    console.log("Product ID after creation:", productId);
  });

  it("El endpoint PUT /api/products/:id debe permitir actualizar un producto", async () => {
    const updatedData = {
      title: "Producto Premium Actualizado",
      description: "Descripción actualizada del producto premium",
      price: 600,
      stock: 80,
    };

    const result = await requester
      .put(`/api/products/${productId}`)
      .set("Cookie", `${premiumCookie.name}=${premiumCookie.value}`)
      .send(updatedData);

    expect(result.status).to.equal(200);
    expect(result.body.result).to.equal("success");

    expect(result.body.payload.matchedCount).to.equal(1);
    expect(result.body.payload.modifiedCount).to.equal(1);
  });

  it("El endpoint DELETE /api/products/:id debe permitir eliminar un producto", async () => {
    const result = await requester
      .delete(`/api/products/${productId}`)
      .set("Cookie", `${premiumCookie.name}=${premiumCookie.value}`);

    expect(result.status).to.equal(200);
    expect(result.body.result).to.equal("success");

    expect(result.body.payload.deletedCount).to.equal(1);
  });
});
 */