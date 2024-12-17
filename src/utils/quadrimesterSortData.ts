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
                            b['प्रथम चौमासिक बजेट'] ||
                            b['बजेट जम्मा']
                    ) -
                    parseFloat(
                        a['तेस्रो चौमासिक	बजेट'] ||
                            a['दोश्रो चौमासिक	बजेट'] ||
                            a['प्रथम चौमासिक बजेट'] ||
                            a['बजेट जम्मा']
                    )
            )
            return sortedData
        case 'BUDGET(L TO H)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        a['तेस्रो चौमासिक	बजेट'] ||
                            a['दोश्रो चौमासिक	बजेट'] ||
                            a['प्रथम चौमासिक बजेट'] ||
                            a['बजेट जम्मा']
                    ) -
                    parseFloat(
                        b['तेस्रो चौमासिक	बजेट'] ||
                            b['दोश्रो चौमासिक	बजेट'] ||
                            b['प्रथम चौमासिक बजेट'] ||
                            b['बजेट जम्मा']
                    )
            )
            return sortedData
        case 'EXPENSE(H TO L)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        b['तेस्रो चौमासिक खर्च'] ||
                            b['दोश्रो चौमासिक खर्च'] ||
                            b['प्रथम चौमासिक खर्च'] ||
                            b['खर्च जम्मा']
                    ) -
                    parseFloat(
                        a['तेस्रो चौमासिक खर्च'] ||
                            a['दोश्रो चौमासिक खर्च'] ||
                            a['प्रथम चौमासिक खर्च'] ||
                            a['खर्च जम्मा']
                    )
            )
            return sortedData
        case 'EXPENSE(L TO H)':
            sortedData = data.sort(
                (a, b) =>
                    parseFloat(
                        a['तेस्रो चौमासिक खर्च'] ||
                            a['दोश्रो चौमासिक खर्च'] ||
                            a['प्रथम चौमासिक खर्च'] ||
                            a['खर्च जम्मा']
                    ) -
                    parseFloat(
                        b['तेस्रो चौमासिक खर्च'] ||
                            b['दोश्रो चौमासिक खर्च'] ||
                            b['प्रथम चौमासिक खर्च'] ||
                            b['खर्च जम्मा']
                    )
            )
            return sortedData
        default:
            return data
    }
}
