

// import router from express
const express = require("express");
const ensuredAuthenticated = require("../middleware/Auth");
const router = express.Router();



//                     first validation, controller
router.get('/', ensuredAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
});

// exports router
module.exports = router;
