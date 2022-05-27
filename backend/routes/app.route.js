const controller = require("../controllers/apps.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/app/create",[authJwt.verifyToken],controller.addApp);

    app.get("/api/app/list",controller.fetchApps);

    app.put("/api/app/update/:id",[authJwt.verifyToken],controller.updateApp);

    app.post("/api/app/delete",[authJwt.verifyToken],controller.deleteApps);

    app.get("/api/app/fetch/:id",controller.getAppById)


}
