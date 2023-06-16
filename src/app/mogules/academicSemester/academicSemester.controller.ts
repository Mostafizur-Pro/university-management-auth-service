import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../share/catchAsync'
import sendResponse from '../../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../share/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is created successfully',
      data: result,
    })
    next()
  }
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)
    // console.log(paginationOptions)
    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions
    )
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retirieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

export const AcademicSemesterController = { createSemester, getAllSemesters }
