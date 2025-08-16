const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")

router.post("/auth/login",authController.login)
router.post("/auth/signup",authController.signup)
router.get("/users/all",authController.getAllUsers)
router.get("/users/student",authController.getAllStudents)
router.get("/users/faculty",authController.getAllFaculty)

module.exports=router