import httpStatus from 'http-status'
import ApiError from '../../../error/ApiError'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../Helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filterData } = filters

  // const academicSemesterSearchableFields = ['title', 'code', 'year'] contant
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
}
