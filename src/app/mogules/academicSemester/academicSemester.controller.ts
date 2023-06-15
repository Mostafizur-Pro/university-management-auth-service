import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    res.status(400).json({
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = { createSemester }
