import { BudgetExpenseProps } from '@/model'

function convertToHeatMapFormat(data: BudgetExpenseProps[]) {
    const categories = [
        'बजेट चालु',
        'बजेट पूंजीगत',
        'बजेट जम्मा',
        'खर्च चालु',
        'खर्च पूंजीगत',
        'खर्च जम्मा',
    ]

    return data
        .map((item, index) => {
            return categories.map((category, categoryIndex) => {
                const value = item[category as keyof BudgetExpenseProps]
                return [index, categoryIndex, value]
            })
        })
        .flat()
}

export default convertToHeatMapFormat
