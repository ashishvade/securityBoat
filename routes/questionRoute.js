const router = require("express").Router()
const question = require("../controllers/questionController")
const authJwt = require("../middleware/token");

router.post("/addQuestion", authJwt.verifyToken, question.addQuestion);
router.get("/getQuestionTypes", authJwt.verifyToken, question.getQuestionTypes);
router.post("/updateQuestion", authJwt.verifyToken, question.updateQuestion);
router.post("/deleteQuestion", authJwt.verifyToken, question.deleteQuestion);
router.post("/getCourseQuestions", authJwt.verifyToken, question.getCourseQuestions);
router.post("/getOrderQuestions", authJwt.verifyToken, question.getOrderQuestions);
router.post("/getUnOrderQuestions", authJwt.verifyToken, question.getUnOrderQuestions);

module.exports = router;