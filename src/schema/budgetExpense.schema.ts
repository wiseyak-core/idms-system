import * as yup from 'yup'
import { InferType } from 'yup'

export const budgetExpenseFormSchema = yup.object({
    city: yup.string().required(),
    उपशीर्षक: yup.string().required(),
    months: yup.string().optional(),
})

export type BudgetExpenseFormSchemaType = InferType<
    typeof budgetExpenseFormSchema
>
