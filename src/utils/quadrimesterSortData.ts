import { QuadrimesterExpenseType } from '@/model'

export const quadrimesterSortData = (
    data: QuadrimesterExpenseType[],
    sort: string | undefined
) => {
    let sortedData = []
    switch (sort) {
        case 'BUDGET(H TO L)':
            sortedData = data.sort((a, b) => {
                // Calculate total budget for item b
                const bTotal =
                    parseFloat(b['तेस्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(b['दोश्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(b['प्रथम चौमासिक बजेट'] || '0') +
                    parseFloat(b['बजेट जम्मा'] || '0')

                // Calculate total budget for item a
                const aTotal =
                    parseFloat(a['तेस्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(a['दोश्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(a['प्रथम चौमासिक बजेट'] || '0') +
                    parseFloat(a['बजेट जम्मा'] || '0')

                return bTotal - aTotal
            })
            return sortedData
        case 'BUDGET(L TO H)':
            sortedData = data.sort((a, b) => {
                const aTotal =
                    parseFloat(a['तेस्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(a['दोश्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(a['प्रथम चौमासिक बजेट'] || '0') +
                    parseFloat(a['बजेट जम्मा'] || '0')

                const bTotal =
                    parseFloat(b['तेस्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(b['दोश्रो चौमासिक	बजेट'] || '0') +
                    parseFloat(b['प्रथम चौमासिक बजेट'] || '0') +
                    parseFloat(b['बजेट जम्मा'] || '0')

                return aTotal - bTotal
            })
            return sortedData

        case 'EXPENSE(H TO L)':
            sortedData = data.sort((a, b) => {
                const bTotal =
                    parseFloat(b['तेस्रो चौमासिक खर्च'] || '0') +
                    parseFloat(b['दोश्रो चौमासिक खर्च'] || '0') +
                    parseFloat(b['प्रथम चौमासिक खर्च'] || '0') +
                    parseFloat(b['खर्च जम्मा'] || '0')

                const aTotal =
                    parseFloat(a['तेस्रो चौमासिक खर्च'] || '0') +
                    parseFloat(a['दोश्रो चौमासिक खर्च'] || '0') +
                    parseFloat(a['प्रथम चौमासिक खर्च'] || '0') +
                    parseFloat(a['खर्च जम्मा'] || '0')

                return bTotal - aTotal
            })
            return sortedData

        case 'EXPENSE(L TO H)':
            sortedData = data.sort((a, b) => {
                const aTotal =
                    parseFloat(a['तेस्रो चौमासिक खर्च'] || '0') +
                    parseFloat(a['दोश्रो चौमासिक खर्च'] || '0') +
                    parseFloat(a['प्रथम चौमासिक खर्च'] || '0') +
                    parseFloat(a['खर्च जम्मा'] || '0')

                const bTotal =
                    parseFloat(b['तेस्रो चौमासिक खर्च'] || '0') +
                    parseFloat(b['दोश्रो चौमासिक खर्च'] || '0') +
                    parseFloat(b['प्रथम चौमासिक खर्च'] || '0') +
                    parseFloat(b['खर्च जम्मा'] || '0')

                return aTotal - bTotal
            })
            return sortedData
        default:
            return data
    }
}
