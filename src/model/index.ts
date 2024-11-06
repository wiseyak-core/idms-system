export type DatasetTableProps = {
    id: string
    name: string
    url: string
    uploadedAt: string
}

export type ApiResponse = IDMSArray[]

export interface IDMSArray {
    idms: string
    topic: string
    data: Daum[]
}

export interface Daum {
    year: string
    data: Data
}

export interface Data {
    metadata: string
    data: QuadrimesterExpenseType[]
}

export interface QuadrimesterExpenseType {
    'क्र.सं.': string
    'खर्च शीर्षक संकेत': string
    शीर्षक: string
    'प्रथम चौमासिक बजेट': string
    'प्रथम चौमासिक खर्च': string
    'दोश्रो चौमासिक	बजेट': string
    'दोश्रो चौमासिक खर्च': string
    'तेस्रो चौमासिक	बजेट': string
    'तेस्रो चौमासिक खर्च': string
    'बजेट जम्मा': string
    'खर्च जम्मा': string
    'जम्मा खर्च(%)': string
    'मौज्दात जम्मा': string
}

export interface QuadrimesterExpenseProps {
    city: string
    year: string
    quarter: string
    data: QuadrimesterExpenseType[]
}
