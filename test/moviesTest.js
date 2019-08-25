const expect = require("chai").expect;
const app = require("../routes/Movies");
var request = require("request");

describe("Movies", () => {
  describe("Movies List", () => {
    it("return status 200", () => {
      let url = "http://localhost/";
      request(url, function(error, response, body) {
        console.log(response);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Movies Cast Details", () => {
    it("return status 200", () => {
      let url = "http://localhost/movies/cast/17";
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
