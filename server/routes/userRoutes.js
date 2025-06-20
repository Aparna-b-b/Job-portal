import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { protectUser } from '../middlewares/authMiddleware.js';


const router=express.Router()
//Get user data
router.get('/user',protectUser,getUserData)

//Apply for a job
router.post('/apply',protectUser,applyForJob)

//Get applied job data
router.get('/applications',protectUser,getUserJobApplications)

//update user profile(resume)a
router.post('/upload',upload.single('resume'),updateUserResume)

export default router;
