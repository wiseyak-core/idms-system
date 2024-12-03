import * as yup from 'yup'
import { InferType } from 'yup'

export const uploadDataSetSchema = yup.object({
    city: yup.string().required('City is required'),
    category: yup.string().required('Category is required'),
    year: yup.string().nullable(),
    month: yup.string().nullable(),
})

export type UploadDatasetSetSchemaType = InferType<typeof uploadDataSetSchema>
