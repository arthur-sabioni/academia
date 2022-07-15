const router = require("express").Router();
const cors = require("cors");
const { HelloController } = require("../controllers");

const corsoptions = {
  origin: "*",
  methods: ['GET'],
  allowedHeaders: ['Content-Type','Authorization', 'Content-Length','X-Requested-With'],
  optionsSuccessStatus: 200
}

router.get("/", cors(corsoptions), HelloController.hello);
module.exports.hello = router;