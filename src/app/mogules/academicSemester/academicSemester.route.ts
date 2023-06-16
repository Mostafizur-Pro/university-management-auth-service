import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

router.get('/:id', AcademicSemesterController.getAllSemesters)
router.patch('/:id', AcademicSemesterController.updateSemester)
router.get('/', AcademicSemesterController.getSingleSemesters)

export const AcademicSemesterRoute = router
