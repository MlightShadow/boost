const demo = require("../src/lib/demo");

const expect = require("chai").expect;

describe("test demo", function () {
    it("demo return false", function () {
        expect(demo()).to.be.equal(false);
    });
});
