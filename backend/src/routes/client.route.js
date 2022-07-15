const router = require("express").Router();
const cors = require("cors");
const { ClientController } = require("../controllers");
const { isAuthorized } = require("../middlewares");

const corsoptions = {
    origin: "*",
    methods: ['GET'],
    allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
    optionsSuccessStatus: 200
}

router.options("/exam", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/registration", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})
router.options("/training", cors(corsoptions), async (req, res) =>{ return res.status(StatusCodes.OK)})

router.use(isAuthorized)

router.get("/exam", cors(corsoptions), ClientController.getExam);
router.get("/registration", cors(corsoptions), ClientController.getRegistrations);
router.get("/training", cors(corsoptions), ClientController.getTraining);

module.exports.client = router;