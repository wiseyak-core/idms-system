import * as yup from 'yup'
import { InferType } from 'yup'

export const filterFormSchema = yup.object({
    topics: yup.array(yup.string()).required(),
    cities: yup.array(yup.string()).required(),
    years: yup.array(yup.number()).optional(),
    months: yup.array(yup.number()).optional(),
})

export type FilterFormSchemaType = InferType<typeof filterFormSchema>
