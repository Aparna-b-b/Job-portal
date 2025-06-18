import express from 'express'
import { ChangeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyPostedJobs, getCompsnyJobApplicants, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router=express.Router()

//Register a company
router.post('/register',upload.single('image'), registerCompany)

//Company login
router.post('/login',loginCompany)

//Get company data
router.get('/company',protectCompany, getCompanyData)

//Post a job
router.post('/post-job', protectCompany,postJob)

//Get Applicants Data of Company
router.get('/applicants',protectCompany,getCompsnyJobApplicants)

//Get Company Job list
router.get('/list-jobs', protectCompany,getCompanyPostedJobs)

//Change Application Status
router.post('/change-status',protectCompany,ChangeJobApplicationStatus)

//change Applications visibility
router.post('/change-visibility',protectCompany,changeJobVisibility)

export default router
