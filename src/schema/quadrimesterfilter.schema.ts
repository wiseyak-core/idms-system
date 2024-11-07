import * as yup from 'yup'
import { InferType } from 'yup'

export const quadrimesterFilterFormSchema = yup.object({
    city: yup.string().required(),
    year: yup.string().optional(),
    quarter: yup.string().optional(),
})

export type QuadrimesterFilterFormSchemaType = InferType<
    typeof quadrimesterFilterFormSchema
>
