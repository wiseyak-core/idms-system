import { QuadrimesterExpenseType } from '@/model'

type QuadrimesterExpenseKeys =
    | 'प्रथम चौमासिक बजेट'
    | 'प्रथम चौमासिक खर्च'
    | 'दोश्रो चौमासिक	बजेट'
    | 'दोश्रो चौमासिक खर्च'
    | 'तेस्रो चौमासिक	बजेट'
    | 'तेस्रो चौमासिक खर्च'
    | 'बजेट जम्मा'
    | 'खर्च जम्मा'

export const quadrimesterSortData = (
    data: QuadrimesterExpenseType[],
    sort: string | undefined,
    quarter: string[] | null
) => {
    let budgetKey = '' as QuadrimesterExpenseKeys
    let expenseKey = '' as QuadrimesterExpenseKeys

    switch (quarter && quarter[0]) {
        case 'first':
            budgetKey = 'प्रथम चौमासिक बजेट'
            expenseKey = 'प्रथम चौमासिक खर्च'
            break
        case 'second':
            budgetKey = 'दोश्रो चौमासिक	बजेट'
            expenseKey = 'दोश्रो चौमासिक खर्च'
            break
        case 'third':
            budgetKey = 'तेस्रो चौमासिक	बजेट'
            expenseKey = 'तेस्रो चौमासिक खर्च'
            break
        case 'total':
            budgetKey = 'बजेट जम्मा'
            expenseKey = 'खर्च जम्मा'
            break
        default:
            budgetKey = 'बजेट जम्मा'
            expenseKey = 'खर्च जम्मा'
    }

    let sortedData = []
    switch (sort) {
        case 'BUDGET(H TO L)':
            sortedData = data.sort(
                (a, b) => parseFloat(b[budgetKey]) - parseFloat(a[budgetKey])
            )
            return sortedData
        case 'BUDGET(L TO H)':
            sortedData = data.sort(
                (a, b) => parseFloat(a[budgetKey]) - parseFloat(b[budgetKey])
            )
            return sortedData
        case 'EXPENSE(H TO L)':
            sortedData = data.sort(
                (a, b) => parseFloat(b[expenseKey]) - parseFloat(a[expenseKey])
            )
            return sortedData
        case 'EXPENSE(L TO H)':
            sortedData = data.sort(
                (a, b) => parseFloat(a[expenseKey]) - parseFloat(b[expenseKey])
            )
            return sortedData
        default:
            return data
    }
}
