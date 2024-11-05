import { QuadrimesterExpenseType } from '@/model'
import { SeriesOptionsType } from 'highcharts'

export const quadrimesterExpenseChart = (
    data: QuadrimesterExpenseType[],
    quarter: string | null
) => {
    const totalLength = data.length
    const categories = data.map((item) => item['शीर्षक'])

    let series: SeriesOptionsType[] = []

    switch (quarter) {
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
            marginRight: 100,
            zooming: {
                type: 'y',
                mouseWheel: {
                    enabled: true,
                },
            },
            events: {
                click: function (e) {
                    console.log(e)
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
            min: 0,
            max: totalLength - 2,
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
