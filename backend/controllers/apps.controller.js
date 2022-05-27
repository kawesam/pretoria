const db = require("../models")
const App = db.app;

//create and save a new app
exports.addApp = (req,res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "App name can not be empty!"
        });
        return;
    }
    if (!req.body.description) {
        res.status(400).send({
            message: "App description can not be empty!"
        });
        return;
    }
    // Create an app
    const app = {
        name: req.body.name,
        description: req.body.description
    };

    App.create(app)
        .then(data => {
            res.send(data);
        }).catch(err =>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the App."
        });
    });
};

//fetch all apps saved in the db
exports.fetchApps = (req,res) =>{
    App.findAll()
        .then(data => {
            res.send(data)
        }).catch(err =>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

//update an app based on ID
exports.updateApp = (req,res) => {
    const id = req.params.id;

    App.update(req.body,{
        where: {id : id}
    }).then(num => {
            if (num == 1) {
                res.send({
                    message: "App  was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update App with id=${id}. Maybe App was not found or req.body is empty!`
                });
            }
        }).catch(err =>{
        res.status(500).send({
            message: "Error updating App with id=" + id
        });
    });
};

//delete app based on the id passed
exports.deleteApps = (req,res) => {
    const ids = req.body.ids;

    App.destroy({
        where: { id: ids }
    }).then(nums => {
        console.log(nums);
        if (nums >= 1) {
            res.send({
                message: "Apps were deleted successfully!"
            });
        } else {
            res.send({
                message: `Could not  delete Apps. Maybe Apps were not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Apps with ids=" + ids
        });

    });

};
//get app by id

exports.getAppById = (req,res) => {

    App.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            res.send(data)
        }).catch(err =>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        });
    });

};
