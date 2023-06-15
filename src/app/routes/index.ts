import express from 'express'
import { UserRoute } from '../mogules/users/user.route'
import { AcademicSemesterRoute } from '../mogules/academicSemester/academicSemester.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

// router.use('/users/', UserRoute)
// router.use('/academic-semesters', AcademicSemesterRoute)

export default router
