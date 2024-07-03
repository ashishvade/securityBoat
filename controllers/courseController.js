// const courseModel = require("../models/courseModel");
// const apiResponse = require("../helpers/apiResponse");

// class clsCourse {

//     async addCourse(req, res) {

//         try {

//             let {
//                 title,
//                 description,
//                 shortDescription,
//                 titleHeader,
//                 imageURL,
//                 videoURL,
//                 priorityNo,
//                 category,
//                 keyConcepts,
//                 themeColor,
//                 rating
//             } = req.body;

//             let titleKey = String(title).toUpperCase().replace(/ /gi, "").trim();

//             let courseFound = await courseModel.findOne({ titleKey, isDelete: false }).lean();

//             if (courseFound) {

//                 return apiResponse.alreadyExist(res, "Course already exists", "", "", "");

//             }
//             else {

//                 let courseId = "COURSE_" + new Date().getTime();

//                 let coursePost = new courseModel({
//                     courseId,
//                     title,
//                     titleKey,
//                     description,
//                     shortDescription,
//                     titleHeader,
//                     imageURL,
//                     videoURL,
//                     priorityNo,
//                     category,
//                     keyConcepts,
//                     themeColor,
//                     rating
//                 });

//                 let courseRes = await coursePost.save();

//                 return apiResponse.successResponse(res, "Course added successfully", courseRes, "", "");

//             }

//         } catch (error) {

//             console.log(error);

//             return apiResponse.errorResponse(res, error.message, "", "", error);

//         }

//     }

//     async updateCourse(req, res) {
//         try {
//             if (Object.keys(req.body).length) {
//                 let {
//                     title,
//                     description,
//                     shortDescription,
//                     titleHeader,
//                     imageURL,
//                     videoURL,
//                     priorityNo,
//                     category,
//                     courseId,
//                     keyConcepts,
//                     themeColor,
//                     rating
//                 } = req.body;

//                 const updatedCourse = await courseModel.findOneAndUpdate(
//                     { courseId, isDelete: false },
//                     {
//                         $set: {
//                             title: String(title).trim(),
//                             description: String(description).trim(),
//                             shortDescription: String(shortDescription).trim(),
//                             titleHeader: String(titleHeader).trim(),
//                             rating: String(rating).trim(),
//                             imageURL,
//                             videoURL,
//                             priorityNo,
//                             category,
//                             keyConcepts,
//                             themeColor: String(themeColor).trim(),
//                         }
//                     },
//                     { new: true });

//                 if (updatedCourse) {

//                     return apiResponse.successResponse(res, "Updated Successfully", updatedCourse, "", "");
//                 }
//                 else {

//                     return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
//                 }
//             }
//             else {
//                 return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")
//             }
//         } catch (error) {

//             return apiResponse.errorResponse(res, error.message, "", "", error)
//         }
//     }

//     async getAllCourseDashboard(req, res) {

//         try {

//             if (Object.keys(req.body).length) {

//                 let {

//                     documentsPerPage = 10,
//                     page = 1

//                 } = req.body

//                 let query = {

//                     isDelete: false
//                 }

//                 const docPerPage = parseInt(documentsPerPage);
//                 let pageNo = parseInt(page);
//                 const skipDocs = (pageNo - 1) * docPerPage;

//                 let [CourseData, CourseCount] = await Promise.all(
//                     [
//                         courseModel
//                             .find(query)
//                             .skip(skipDocs)
//                             .limit(docPerPage)
//                             .sort({ priorityNo: 1 })
//                             .lean(),
//                         courseModel.countDocuments(query)
//                     ]
//                 );

//                 if (CourseData.length > 0) {

//                     let responses = {
//                         data: CourseData,
//                         count: CourseCount,
//                         noOfPages: Math.ceil(CourseCount / docPerPage),
//                     };

//                     return apiResponse.paginateResponse(res, "Get all Course Data with Pagination", responses, "", "");
//                 }
//                 else {
//                     return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
//                 }
//             }
//             else {
//                 return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")
//             }
//         } catch (error) {

//             return apiResponse.errorResponse(res, error.message, "", "", error)
//         }
//     }

//     async getCourseById(req, res) {
//         try {
//             if (Object.keys(req.body).length) {

//                 const Course = await courseModel.findOne({ courseId: req.body.courseId, isDelete: false });

//                 if (Course) {

//                     return apiResponse.successResponse(res, "Get Course", Course, "", "");

//                 } else {

//                     return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
//                 }
//             } else {

//                 return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")
//             }


//         } catch (error) {

//             return apiResponse.errorResponse(res, error.message, "", "", error)
//         }
//     }

//     async getAllCourse(req, res) {

//         try {
//             let query = {
//                 isDelete: false
//             }
//             let CourseData = await courseModel.find(query).sort({ priorityNo: 1 }).lean()

//             if (CourseData.length > 0) {

//                 let responses = {

//                     data: CourseData,

//                     count: CourseData.length,
//                 };

//                 return apiResponse.successResponse(res, "Get All Course", responses, "", "");
//             }
//             else {
//                 return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
//             }
//         } catch (error) {

//             return apiResponse.errorResponse(res, error.message, "", "", error)

//         }
//     }

//     async deleteCourse(req, res) {
//         try {

//             if (Object.keys(req.body).length) {

//                 const deletedCourseModel = await courseModel.findOneAndUpdate(

//                     { courseId: req.body.courseId, isDelete: false },

//                     { $set: { isDelete: true } },

//                     { new: true });

//                 if (deletedCourseModel) {

//                     return apiResponse.successResponse(res, "Data deleted succussfully", "", "", "");

//                 } else {

//                     return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
//                 }
//             }
//             else {

//                 return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")

//             }
//         } catch (error) {

//             return apiResponse.errorResponse(res, error.message, "", "", error)

//         }
//     }

// }

// module.exports = new clsCourse();