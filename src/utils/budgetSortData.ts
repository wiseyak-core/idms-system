import { BudgetExpenseProps } from '@/model'

// type BudgetExpensekeys =
//     | 'बजेट चालु'
//     | 'बजेट पूंजीगत'
//     | 'बजेट जम्मा'
//     | 'खर्च चालु'
//     | 'खर्च पूंजीगत'
//     | 'खर्च जम्मा'

export const budgetSortData = (
    data: BudgetExpenseProps[],
    sort: string | undefined
) => {
    let sortedData = []
    switch (sort) {
        case 'BUDGET(H TO L)':
            sortedData = data.sort((a, b) => b['बजेट जम्मा'] - a['बजेट जम्मा'])
            return sortedData
        case 'BUDGET(L TO H)':
            sortedData = data.sort((a, b) => a['बजेट जम्मा'] - b['बजेट जम्मा'])
            return sortedData
        case 'EXPENSE(H TO L)':
            sortedData = data.sort((a, b) => b['खर्च जम्मा'] - a['खर्च जम्मा'])
            return sortedData
        case 'EXPENSE(L TO H)':
            sortedData = data.sort((a, b) => a['खर्च जम्मा'] - b['खर्च जम्मा'])
            return sortedData

        default:
            return data
    }
}
