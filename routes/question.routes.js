const express = require("express")
const router = express.Router()
const questionController = require("../controllers/question.controller")

router.post("/",questionController.createQuestion)
router.get("/",questionController.getAllQuestion)
router.get("/:id",questionController.getQuestionById)
router.put("/:id",questionController.updateQuestion)
router.delete("/:id",questionController.deleteQuestion)
router.patch("/:id/restore",questionController.restoreQuestion)
module.exports=router