const router = require("express").Router();
const cors = require("cors");
const { CommonController } = require("../controllers");
const { isAuthorized } = require("../middlewares");

const corsoptions = {
  origin: "*",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/schemes", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/login", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/user", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})

router.get("/schemes", cors(corsoptions), CommonController.getschemes);
router.post("/login", cors(corsoptions), CommonController.login);

router.use(isAuthorized)

router.get("/user", cors(corsoptions), CommonController.getUser);

module.exports.common = router;