import * as yup from 'yup'
import { InferType } from 'yup'

export const budgetExpenseFormSchema = yup.object({
    cities: yup.array().of(yup.string()).optional(),
    उपशीर्षक: yup.array().of(yup.string()).optional(),
    months: yup.array().of(yup.string()).optional(),
})

export type BudgetExpenseFormSchemaType = InferType<
    typeof budgetExpenseFormSchema
>
