const router = require("express").Router();
const cors = require("cors");
const { DoctorController } = require("../controllers");
const { isAuthorized } = require("../middlewares");

const corsoptions = {
  origin: "*",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})

router.use(isAuthorized)

router.post("/", cors(corsoptions), DoctorController.newExam);

module.exports.doctor = router;