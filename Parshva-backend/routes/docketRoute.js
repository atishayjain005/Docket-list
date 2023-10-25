const router = require("express").Router();
const docketModel = require("../models/docketModel");

//POST Request

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newDocket = new docketModel(data);
    await newDocket.save().then(() => {
      res.status(200).json({ message: "Docket created Successfully" });
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/get", async (req, res) => {
    try {
      const dockets = await docketModel.find(); 
      if (!dockets) {
        return res.status(404).json({ message: "No dockets found" });
      }
      res.status(200).json(dockets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
