const router = require("express").Router();
const cors = require("cors");
const { SecretaryController } = require("../controllers");
const { isAuthorized } = require("../middlewares");

const corsoptions = {
  origin: "*",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/exam", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/user", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/classes", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/registration", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})

router.use(isAuthorized)

router.post("/exam", cors(corsoptions), SecretaryController.getExam);
router.post("/user", cors(corsoptions), SecretaryController.newUser);
router.get("/classes", cors(corsoptions), SecretaryController.getClasses);
router.post("/registration", cors(corsoptions), SecretaryController.newRegistration);

module.exports.secretary = router;