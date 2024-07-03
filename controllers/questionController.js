// const questionModel = require("../models/questionModel");
// const apiResponse = require("../helpers/apiResponse");
// const courseModel = require("../models/courseModel");

// class clsTest {

//     async addQuestion(req, res) {

//         try {

//             let {
//                 courseId,
//                 question,
//                 questionType,
//                 options,
//                 rightAnswer,
//                 order
//             } = req.body;

//             let questionKey = String(question).toUpperCase().replace(/ /gi, "").trim();
//             let questionId = courseId + "_" + questionKey;

//             let questionFound = await questionModel.findOne({ questionId, isDelete: false });

//             if (questionFound) {

//                 return apiResponse.alreadyExist(res, "Question already exists", "", "", "");

//             }
//             else {

//                 let orders = await questionModel.distinct(
//                     "order",
//                     {
//                         courseId,
//                         isDelete: false
//                     }
//                 );

//                 if (orders.includes(Number(order))) {

//                     return apiResponse.alreadyExist(res, "Order already exists", "", "", "");

//                 }

//                 let courseData = await courseModel.findOne(
//                     {
//                         courseId,
//                         isDelete: false
//                     }
//                 ).select(
//                     {
//                         _id: 0,
//                         title: 1
//                     }
//                 ).lean();

//                 let questionPost = new questionModel({
//                     questionId,
//                     questionKey,
//                     courseId,
//                     courseTitle: courseData.title,
//                     question,
//                     questionType,
//                     options: questionType === "truefalse" ? ["True", "False"] : options,
//                     rightAnswer,
//                 });

//                 let questionRes = await questionPost.save();

//                 return apiResponse.successResponse(res, "Question added successfully", questionRes, "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async getQuestionTypes(req, res) {

//         try {

//             let questionTypes = [
//                 {
//                     value: "mcq",
//                     label: "MCQ"
//                 },
//                 {
//                     value: "truefalse",
//                     label: "True / False"
//                 }
//             ];

//             return apiResponse.successResponse(res, "Question Types", questionTypes, "", "");

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async updateQuestion(req, res) {

//         try {

//             let {
//                 questionId,
//                 question,
//                 questionType,
//                 options,
//                 rightAnswer,
//             } = req.body;

//             let questionKeyRes = String(question).toUpperCase().replace(/ /gi, "").trim();

//             let questionUpdate = await questionModel.findOneAndUpdate(
//                 {
//                     questionId,
//                     isDelete: false
//                 },
//                 {
//                     questionKey: questionKeyRes,
//                     courseId: String(courseId).trim(),
//                     courseTitle: String(courseTitle).trim(),
//                     question: String(question).trim(),
//                     questionType: String(questionType).trim(),
//                     options,
//                     rightAnswer: String(rightAnswer).trim(),
//                 },
//                 {
//                     new: true
//                 }
//             );

//             if (questionUpdate) {

//                 return apiResponse.successResponse(res, "Question successfully updated", questionUpdate, "", "");

//             }
//             else {

//                 return apiResponse.successNoContentResponse(res, "No data found", "", "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async deleteQuestion(req, res) {

//         try {

//             let { questionId } = req.body;

//             let deleteQuestion = await questionModel.findOneAndUpdate(
//                 {
//                     questionId,
//                     isDelete: false
//                 },
//                 {
//                     isDelete: true
//                 },
//                 {
//                     new: true
//                 }
//             );

//             if (deleteQuestion) {

//                 return apiResponse.successResponse(res, "Question successfully deleted", deleteQuestion, "", "");

//             }
//             else {

//                 return apiResponse.successNoContentResponse(res, "No data found", "", "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async getCourseQuestions(req, res) {

//         try {

//             let {
//                 courseId,
//                 documentsPerPage = 10,
//                 page = 1
//             } = req.body;

//             const docPerPage = parseInt(documentsPerPage);
//             let pageNo = parseInt(page);
//             const skipDocs = (pageNo - 1) * docPerPage;

//             let [questionData, questionCount] = await Promise.all(
//                 [
//                     questionModel.find(
//                         {
//                             courseId,
//                             isDelete: false
//                         }
//                     )
//                         .sort(
//                             {
//                                 order: 1
//                             }
//                         )
//                         .skip(skipDocs)
//                         .limit(docPerPage),
//                     questionModel.countDocuments(
//                         {
//                             courseId,
//                             isDelete: false
//                         }
//                     )
//                 ]
//             );

//             if (questionData.length > 0) {

//                 let responses = {
//                     questionData,
//                     questionCount,
//                     noOfPages: Math.ceil(questionCount / docPerPage)
//                 }

//                 return apiResponse.paginateResponse(res, "Question data", responses, "", "");

//             }
//             else {

//                 return apiResponse.successNoContentResponse(res, "No data found", "", "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async getOrderQuestions(req, res) {

//         try {

//             let { courseId } = req.body;

//             let questionData = await questionModel.find(
//                 {
//                     courseId,
//                     isDelete: false
//                 }
//             ).sort(
//                 {
//                     order: 1
//                 }
//             );

//             if (questionData.length > 0) {

//                 return apiResponse.successResponse(res, "Question data", questionData, "", "");

//             }
//             else {

//                 return apiResponse.successNoContentResponse(res, "No data found", "", "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async getUnOrderQuestions(req, res) {

//         try {

//             let { courseId } = req.body;

//             let questionData = await questionModel.find(
//                 {
//                     courseId,
//                     isDelete: false
//                 }
//             ).sort(
//                 {
//                     order: 1
//                 }
//             );

//             if (questionData.length > 0) {

//                 for (let i = questionData.length - 1; i > 0; i--) {

//                     let j = Math.floor(Math.random() * (i + 1))

//                     [questionData[i], questionData[j]] = [questionData[j], questionData[i]]

//                 }

//                 return apiResponse.successResponse(res, "Question data", questionData, "", "");

//             }
//             else {

//                 return apiResponse.successNoContentResponse(res, "No data found", "", "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

// }

// module.exports = new clsTest();