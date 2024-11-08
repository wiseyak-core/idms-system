import * as yup from 'yup'
import { InferType } from 'yup'

export const budgetExpenseFormSchema = yup.object({
    cities: yup.array().of(yup.string()).required(),
    उपशीर्षक: yup.array().of(yup.string()).required(),
    months: yup.array().of(yup.string()).optional(),
})

export type BudgetExpenseFormSchemaType = InferType<
    typeof budgetExpenseFormSchema
>
