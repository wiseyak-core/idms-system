import { BudgetExpenseProps } from '@/model'

type BudgetExpensekeys =
    | 'बजेट चालु'
    | 'बजेट पूंजीगत'
    | 'बजेट जम्मा'
    | 'खर्च चालु'
    | 'खर्च पूंजीगत'
    | 'खर्च जम्मा'

export const budgetSortData = (
    data: BudgetExpenseProps[],
    sort: string | undefined,
    state: string | undefined
) => {
    let budgetKey = '' as BudgetExpensekeys
    let expenseKey = '' as BudgetExpensekeys

    switch (state) {
        case 'चालु':
            budgetKey = 'बजेट चालु'
            expenseKey = 'खर्च चालु'
            break
        case 'जम्मा':
            budgetKey = 'बजेट जम्मा'
            expenseKey = 'खर्च जम्मा'
            break
        default:
            budgetKey = 'बजेट चालु'
            expenseKey = 'खर्च चालु'
    }

    let sortedData = []
    switch (sort) {
        case 'BUDGET(H TO L)':
            sortedData = data.sort((a, b) => b[budgetKey] - a[budgetKey])
            return sortedData
        case 'BUDGET(L TO H)':
            sortedData = data.sort((a, b) => a[budgetKey] - b[budgetKey])
            return sortedData
        case 'EXPENSE(H TO L)':
            sortedData = data.sort((a, b) => b[expenseKey] - a[expenseKey])
            return sortedData
        case 'EXPENSE(L TO H)':
            sortedData = data.sort((a, b) => a[expenseKey] - b[expenseKey])
            return sortedData

        default:
            return data
    }
}
