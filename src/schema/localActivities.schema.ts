import * as yup from 'yup'
import { InferType } from 'yup'

export const localActivitiesFilterFormSchema = yup.object({
    topic: yup.string().required(),
    city: yup.string().required(),
    year: yup.string().optional(),
    quarter: yup.string().optional(),
})

export type LocalActivitiesFilterFormSchemaType = InferType<
    typeof localActivitiesFilterFormSchema
>
