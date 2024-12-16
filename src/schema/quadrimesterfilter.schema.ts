import * as yup from 'yup'
import { InferType } from 'yup'

export const quadrimesterFilterFormSchema = yup.object({
    cities: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one city')
        .required('City selection is required'),
    years: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one year')
        .required('Year selection is required'),
    quarter: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one quarter')
        .required('Quarter selection is required'),
    शीर्षक: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one title')
        .required('Title selection is required'),
})

export type QuadrimesterFilterFormSchemaType = InferType<
    typeof quadrimesterFilterFormSchema
>
