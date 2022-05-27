const db = require("../models");
const config  = require("../config/auth.config");
const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//sign up a user using username and password
exports.signup = (req, res) => {

    //save User to db
    User.create({
        userName : req.body.username,
        password : bcrypt.hashSync(req.body.password,8)
    }).then(user =>{
        res.send({
            message :"User was successfully registered"
        });
    }).catch(err => {
        res.status(500).send({message: err.message});
    })

};

//login user using username and password
exports.login = (req,res) => {
    User.findOne({
        where:{
            userName: req.body.username
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({ message: "User Not found." });
        }
        var validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!validPassword){
            //password is invalid or incorrect
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({
            id: user.id
        },config.secret,{
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            username: user.userName,
            accessToken: token
        })
    })
}

