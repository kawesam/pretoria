const db = require("../models");

const User = db.user;

//validate that the user name is not already used
checkDuplicateUserName = (req,res,next) => {
    User.findOne({
        where: {
            userName: req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: "Username is already in use!",
                error: true
            });
            return;
        }
        next();
    });
};


const verifySignUp = {
    checkDuplicateUserName : checkDuplicateUserName
};

module.exports = verifySignUp;
