const router = require("express").Router();
const cors = require("cors");
const { TeacherController } = require("../controllers");
const { isAuthorized } = require("../middlewares");

const corsoptions = {
  origin: "*",
  methods: ['GET'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.options("/exercises", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/training", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})

router.use(isAuthorized)

router.get("/exercises", cors(corsoptions), TeacherController.getExercises);
router.post("/training", cors(corsoptions), TeacherController.newTraining);

module.exports.teacher = router;