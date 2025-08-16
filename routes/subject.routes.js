const express = require("express")
const router = express.Router()
const subjectController = require("../controllers/subject.controller")

router.post("/",subjectController.createSubject)
router.get("/",subjectController.getAllSubjects)
router.get("/:id",subjectController.getSubjectById)
router.put("/:id",subjectController.updateSubject)
router.delete("/:id",subjectController.deleteSubject)
router.patch("/:id/restore",subjectController.restoreSubject)
module.exports=router