const Router = require("express");
const router = Router();
const handlebars = require("express-handlebars");
router.engine("handlebars", handlebars.engine());
router.set("views", __dirname + "/../views");
router.set("view engine", "handlebars");



module.exports = router;