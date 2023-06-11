import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  //   errorMessage: {
  //     path: string
  //     message: string
  //   }[]
  errorMessage: IGenericErrorMessage[]
}

// export type IGenericErrorMessage = {
//     path: string
//     message: string
//   }
