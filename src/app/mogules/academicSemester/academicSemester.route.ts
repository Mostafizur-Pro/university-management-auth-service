import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'
import { academicSemesterCodes } from './academicSemester.constant'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

router.get('/:id', AcademicSemesterController.getAllSemesters)
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)
router.delete('/:id', AcademicSemesterController.deleteSemester)

router.get('/', AcademicSemesterController.getSingleSemesters)

export const AcademicSemesterRoute = router
