import httpStatus from 'http-status'
import ApiError from '../../../error/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // summer 02 !== 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

// type IPaginationOptions = {
//   page: number
//   limit: number
//   sortBy: string
//   sortOrder: string
// }

const getAllSemesters = (paginationOptions: IPaginationOptions) => {}

export const AcademicSemesterService = {
  createSemester,
  IPaginationOptions,
}
