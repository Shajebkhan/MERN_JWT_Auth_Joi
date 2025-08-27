const { signup, login } = require("../controlllers/AuthController");
const { signupValidation, loginValidation } = require("../middleware/AuthValidation");

// import router from express
const express = require("express");
const router = express.Router();


// const router = express.Router();

// router.post('/login', (req, res) => {
//     res.send('login success')
// });

router.post('/login', loginValidation, login)
//                     first validation, controller
router.post('/signup', signupValidation, signup);

// exports router
module.exports = router;
