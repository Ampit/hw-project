const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");
const crypto = require("crypto");
const { expect } = require("chai");

/**
 * https://blog.abelotech.com/posts/generate-random-values-nodejs-javascript/
 * @param {*} len
 * @returns
 */
function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len); // return required number of characters
}

chai.should();
chai.use(chaiHttp);

const requester = chai.request.agent(app);
const rand = randomValueHex(2);

let loginDetails = {
  username: "testuser" + rand,
  password: "123456",
  email: "testuser" + rand + "@yopmail.com",
};

let registerDetails = (_csrf) => {
  return {
    username: "testuser" + rand,
    password: "123456",
    email: "testuser" + rand + "@yopmail.com",
    _csrf: _csrf,
  };
};

describe("/api/conversations no auth test", async () => {
  it("should return 401 unauthorized", async () => {
    const res = await requester.get(`/api/conversations`);
    res.should.have.status(401);
    res.text.should.to.eql("Unauthorized");
  });

  it("Create account and login", async () => {
    // get cookies and token
    const res = await requester.get("/auth/user");
    // make request to create a user
    const resRegister = await requester
      .post(`/auth/register`)
      .send(
        registerDetails(
          unescape(/x-csrf-token=(.*?);/.exec(res.headers["set-cookie"])[1])
        )
      );
    // login user check
    const resLogin = await requester.get("/auth/user");

    // assert
    res.should.have.status(200);
    resRegister.should.have.status(200);
    resLogin.should.have.status(200);
    resLogin.should.have.property("body").haveOwnProperty("email");
    resLogin.body.email.should.be.eql(loginDetails.email);

    // TODO: remove user (cleanup)
  });
});
