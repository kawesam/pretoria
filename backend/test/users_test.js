process.env.NODE_ENV = 'test';

let user = require('../models/user');
let apps = require('../models/app');

//require the dev dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


const server = 'http://localhost:8080';

chai.use(chaiHttp);

//our parent block
describe('HomePage', () => {

    let currentResponse = null;

    afterEach(function() {
        const errorBody = currentResponse && currentResponse.body;

        if (this.currentTest.state === 'failed' && errorBody) {
            console.log("Here");
        }

        currentResponse = null;
    });
    /*
      * Test the /GET route if API is up
      */
    describe('/GET home page', () => {
        it('test if home page is fine', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    done();
                });
        });
    });
});

//test user creation

describe('Authentication to APP', () => {
    it('it should not POST a user without username field', (done) => {
        let user = {
            username: "Samuel",
            password: "password"
        }
        chai.request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
            });
    });
    //test to store a new user if username is not already used by another user
    it('it should POST a new USER ', (done) => {
        let generateUserName = Math.random().toString(36).substring(2,7);
        let user = {
            username: generateUserName,
            password: "mysecurepassword"
        }
        chai.request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('User was successfully registered');
                done();
            });
    });

});

// should return a 403 if the user is not authenticating when editing an app
describe('APP APIS', () => {
    //should return a list of all apps
    it('should return array of apps', (done) => {
        chai.request(server)
            .get('/api/app/list')
            .end((err, res) => {
                res.should.be.json;
                res.should.have.status(200);
                // res.body.should.be.an('array');
                res.should.to.be.json;

                done();
            });
    });


    it('should update a throw a 403 when updating an up and not logged in ', function(done) {
        chai.request(server)
            .get('/api/app/list')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/app/update/'+8)
                    .send({'name': 'Spideeer','description':'my other new description is here '})
                    .end(function(error, response){
                        response.should.have.status(403);
                        response.should.be.json;

                        done();
                    });
            });
    });

    //test for user who is signed in and tries updating the app
    it('should  login user, check token and update an app since the user is logged in', function(done) {
        chai.request(server)
            .post('/api/auth/signin')
            // send user login details
            .send({
                'username': 'Samuel',
                'password': 'password'
            })
            .end((err, res) => {
                res.body.should.have.property('accessToken');
                var token = res.body.accessToken;

                chai.request(server)
                    .get('/api/app/list')
                    .end(function(err, res) {
                        chai.request(server)
                            .put('/api/app/update/'+8)
                            .send({'name': 'JWT','description':'an authentication technique used in web applications'})

                            // we set the auth header with our token
                            .set('x-access-token',  token)
                            .end(function(error, resonse) {
                                resonse.should.have.status(200);
                                resonse.body.should.have.property('message');
                                resonse.body.should.have.property('message').eql('App  was updated successfully.');
                                done();
                            });
                    })
            })
    })


    //test for user creates an app when logged in
    it('should  login user and create an new app', function(done) {
        chai.request(server)
            .post('/api/auth/signin')
            // send user login details
            .send({
                'username': 'Samuel',
                'password': 'password'
            })
            .end((err, res) => {
                res.body.should.have.property('accessToken');
                var token = res.body.accessToken;
                let newApp = {
                    name: "Fantastic App",
                    description: "My new life changing app in steath mode ."
                }
                chai.request(server)
                    .post('/api/app/create')
                    .send(newApp)
                            // we set the auth header with our token
                    .set('x-access-token',  token)
                    .end(function(error, resonse) {
                        resonse.should.have.status(200);
                        resonse.body.should.have.property('id');
                        done();
                    });
            })
    })

    //test for user deletes an app when logged in
    it('should  login user and delete an new app', function(done) {
        chai.request(server)
            .post('/api/auth/signin')
            // send user login details
            .send({
                'username': 'Samuel',
                'password': 'password'
            })
            .end((err, res) => {
                res.body.should.have.property('accessToken');
                var token = res.body.accessToken;

                let IDS = {
                    ids: [9,10],
                }
                chai.request(server)
                    .post('/api/app/delete')
                    .send(IDS)
                    // we set the auth header with our token
                    .set('x-access-token',  token)
                    .end(function(error, resonse) {
                        resonse.should.have.status(200);
                        resonse.body.should.have.property('message');
                        resonse.body.should.have.property('message').eql('Apps were deleted successfully!');

                        done();
                    });
            })
    })



});



