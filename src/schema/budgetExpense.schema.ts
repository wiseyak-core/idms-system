import * as yup from 'yup'
import { InferType } from 'yup'

export const budgetExpenseFormSchema = yup.object({
    cities: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one city')
        .required('City selection is required'),
    उपशीर्षक: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one उपशीर्षक')
        .required('उपशीर्षक selection is required'),
    months: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one month')
        .required('Month selection is required'),
})

export type BudgetExpenseFormSchemaType = InferType<
    typeof budgetExpenseFormSchema
>
