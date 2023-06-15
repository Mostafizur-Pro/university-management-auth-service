import { Request, RequestHandler, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../share/catchAsync'

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    res.status(400).json({
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    })
  }
)

export const AcademicSemesterController = { createSemester }
