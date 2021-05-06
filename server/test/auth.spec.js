const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/api/conversations no auth test", () => {
  it("should return 401 unauthorized", (done) => {
    chai
      .request(app)
      .get(`/api/conversations`)
      .end((err, res) => {
        res.should.have.status(401);
        res.text.should.to.eql("Unauthorized");
        done();
      });
  });
});
