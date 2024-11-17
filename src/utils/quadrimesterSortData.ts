import { QuadrimesterExpenseType } from '@/model'

export const quadrimesterSortData = (
    data: QuadrimesterExpenseType[],
    sort: string | undefined
) => {
    let sortedData = []
    switch (sort) {
        case 'BUDGET(H TO L)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        b['तेस्रो चौमासिक	बजेट'] ||
                            b['दोश्रो चौमासिक	बजेट'] ||
                            b['प्रथम चौमासिक बजेट']
                    ) -
                    parseFloat(
                        a['तेस्रो चौमासिक	बजेट'] ||
                            a['दोश्रो चौमासिक	बजेट'] ||
                            a['प्रथम चौमासिक बजेट']
                    )
            )
            return sortedData
        case 'BUDGET(L TO H)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        a['तेस्रो चौमासिक	बजेट'] ||
                            a['दोश्रो चौमासिक	बजेट'] ||
                            a['प्रथम चौमासिक बजेट']
                    ) -
                    parseFloat(
                        b['तेस्रो चौमासिक	बजेट'] ||
                            b['दोश्रो चौमासिक	बजेट'] ||
                            b['प्रथम चौमासिक बजेट']
                    )
            )
            return sortedData
        case 'EXPENSE(H TO L)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        b['तेस्रो चौमासिक खर्च'] ||
                            b['दोश्रो चौमासिक खर्च'] ||
                            b['प्रथम चौमासिक खर्च']
                    ) -
                    parseFloat(
                        a['तेस्रो चौमासिक खर्च'] ||
                            a['दोश्रो चौमासिक खर्च'] ||
                            a['प्रथम चौमासिक खर्च']
                    )
            )
            return sortedData
        case 'EXPENSE(L TO H)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        a['तेस्रो चौमासिक खर्च'] ||
                            a['दोश्रो चौमासिक खर्च'] ||
                            a['प्रथम चौमासिक खर्च']
                    ) -
                    parseFloat(
                        b['तेस्रो चौमासिक खर्च'] ||
                            b['दोश्रो चौमासिक खर्च'] ||
                            b['प्रथम चौमासिक खर्च']
                    )
            )
            return sortedData
        default:
            return data
    }
}
