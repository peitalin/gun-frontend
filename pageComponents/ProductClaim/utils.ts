
import { FormikErrors } from "formik"
import {
	FormikFieldsLogIn,
	FormikFieldsSignUp,
} from "./LoginPageClaimProduct"


export const printValidationErrorsClaims = (
  errors: FormikErrors<FormikFieldsLogIn|FormikFieldsSignUp>
): string => {

  const errorMsg = Object.keys(errors).join(", ")
  return `Please check: ${errorMsg}`
}