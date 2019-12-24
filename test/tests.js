var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000/api/v1");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  it("login API works fine",function(done){

    // calling home page api
    server
    .post("/login")
    .send({username: 'u1', password: 'p1'})
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.data.id.should.equal(1);
      done();
    });
  });

  it("login API works fine with incorrect username or password",function(done){

    // calling home page api
    server
    .post("/login")
    .send({username: 'u2', password: 'p1'})
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(function(err, res){
      if(err) {
        console.log('xxxxxx');
      } else {
        res.status.should.equal(200);
        res.body.data.should.equal(false);
      }
      
      done();
    });
  });


});