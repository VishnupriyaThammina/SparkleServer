

let server = require('../index');
const connDb = require("../config/db.js")
const uri = 'mongodb+srv://vishnupriyat20:vish@cluster0.vy04mxk.mongodb.net/';

//Require the dev-dependencies


    
    //Our parent block
    
       
      /*
      * Test the /GET route
      */
    
     describe('/POST register', () => {
        before(connDb)
       
        it('it should register a new user', async(done) => {
          let chai = await import("chai")
          let chaiHttp = await import("chai-http")
          let should = chai.should();
          await chai.use(chaiHttp);
          chai.request(server)
            .post('/users/register')
            .send({
              username: 'testuser',
              password: 'testpassword',
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('token');
              res.body.should.have.property('user');
              res.body.message.should.eql('User registration sparkled!');
            });
            done();
        }).timeout(10000)
      });
    


// let chaiHttp = require('chai-http');
// let should = chai.should();
// chai.use(chaiHttp);

// //Our parent block
// describe('Books', () => {
   
// /*
//   * Test the /GET route
//   */
//   describe('/POST register', () => {
//     it('it should register a new user', (done) => {
//       chai.request(server)
//         .post('/users/register')
//         .send({
//           username: 'testuser',
//           password: 'testpassword',
//         })
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           res.body.should.have.property('token');
//           res.body.should.have.property('user');
//           res.body.message.should.eql('User registration sparkled!');
//           done();
//         });
//     });
//   });
// });

