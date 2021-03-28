const express = require("express")
const router = express.Router()

const { getRandomProducts } = require("../controllers/homeScreen")

router.get("/getRandomProducts",getRandomProducts)

module.exports = router