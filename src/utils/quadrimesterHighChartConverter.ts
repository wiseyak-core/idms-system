import { QuadrimesterExpenseType } from '@/model'
import { SeriesOptionsType } from 'highcharts'

export const quadrimesterExpenseBarChart = (
    data: QuadrimesterExpenseType[],
    quarter: string[] | null
) => {
    const categories = data.map((item) => item['शीर्षक'])

    let series: SeriesOptionsType[] = []

    switch (quarter && quarter[0]) {
        case 'first':
            series = [
                {
                    name: 'प्रथम चौमासिक बजेट',
                    type: 'column',
                    data: data.map((item) =>
                        parseFloat(item['प्रथम चौमासिक बजेट'])
                    ),
                },
                {
                    name: 'प्रथम चौमासिक खर्च',
                    type: 'column',
                    data: data.map((item) =>
                        parseFloat(item['प्रथम चौमासिक खर्च'])
                    ),
                },
            ]
            break
        case 'second':
            series = [
                {
                    name: 'दोश्रो चौमासिक	बजेट',
                    type: 'column',
                    data: data.map((item) =>
                        parseFloat(item['दोश्रो चौमासिक	बजेट'])
                    ),
                },
                {
                    name: 'दोश्रो चौमासिक खर्च',
                    type: 'column',
                    data: data.map((item) =>
                        parseFloat(item['दोश्रो चौमासिक खर्च'])
                    ),
                },
            ]
            break
        case 'third':
            series = [
                {
                    name: 'तेस्रो चौमासिक	बजेट',
                    type: 'column',
                    data: data.map((item) =>
                        parseFloat(item['तेस्रो चौमासिक	बजेट'])
                    ),
                },
                {
                    name: 'तेस्रो चौमासिक खर्च',
                    type: 'column',
                    data: data.map((item) =>
                        parseFloat(item['तेस्रो चौमासिक खर्च'])
                    ),
                },
            ]
            break
        default:
            series = [
                {
                    name: 'चौमासिक बजेट',
                    type: 'column',
                    data: data.map((item) => parseFloat(item['बजेट जम्मा'])),
                },
                {
                    name: 'चौमासिक खर्च',
                    type: 'column',
                    data: data.map((item) => parseFloat(item['खर्च जम्मा'])),
                },
            ]
    }

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            scrollablePlotArea: {
                minHeight: 2500,
                scrollPositionY: 1,
            },
            zooming: {
                type: 'y',
                mouseWheel: {
                    enabled: true,
                },
            },
        },
        title: {
            text: 'बजेट / खर्च',
        },
        exporting: {
            enabled: true,
        },

        xAxis: {
            categories: categories,
            startOnTick: false,
            endOnTick: false,
        },
        yAxis: {
            title: {
                text: 'बजेट/खर्च रुपैयाँ',
            },
        },
        series: series,
    }
    return highChartOptions
}
