import * as yup from 'yup'
import { InferType } from 'yup'

export const quadrimesterFilterFormSchema = yup.object({
    cities: yup.array().of(yup.string()).optional(),
    years: yup.array().of(yup.string()).optional(),
    quarter: yup.array().of(yup.string()).optional(),
    शीर्षक: yup.array().of(yup.string()).optional(),
})

export type QuadrimesterFilterFormSchemaType = InferType<
    typeof quadrimesterFilterFormSchema
>
