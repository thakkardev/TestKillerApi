const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin.controller")
router.get("/dashboardstats",adminController.getDashboardStats)
router.post("/add-student",adminController.addStudent)
router.put("/students/:id",adminController.updateStudent)
router.put("/update-role/:id",adminController.updateRole)
module.exports=router