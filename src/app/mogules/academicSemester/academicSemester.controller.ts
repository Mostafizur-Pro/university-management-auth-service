import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../share/catchAsync'
import sendResponse from '../../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../share/pick'
import { paginationFields } from '../../../constants/pagination'

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse(res, {
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
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // }
    const paginationOptions = pick(req.query, paginationFields)
    // console.log(paginationOptions)
    // const result = await AcademicSemesterService.getAllSemesters(
    //   paginationOptions
    // )
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semesters retirieved successfully',
    //   data: result,
    // })
    // next()
  }
)

export const AcademicSemesterController = { createSemester, getAllSemesters }
