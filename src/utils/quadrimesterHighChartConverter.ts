import { QuadrimesterExpenseType } from '@/model'
import { SeriesOptionsType } from 'highcharts'
import convertToNepaliCurrency from './currencyConverter'

//Bar Chart
export const quadrimesterExpenseBarChart = (
    data: QuadrimesterExpenseType[]
) => {
    const isSmallChart = data.length < 5

    const categories = data.map((item) => item['शीर्षक'])

    let series: SeriesOptionsType[] = []

    series = [
        {
            name: 'चौमासिक बजेट',
            type: 'column',
            data: data.map((item) =>
                parseFloat(
                    item['प्रथम चौमासिक बजेट'] ||
                        item['दोश्रो चौमासिक	बजेट'] ||
                        item['तेस्रो चौमासिक	बजेट']
                )
            ),
        },
        {
            name: 'चौमासिक खर्च',
            type: 'column',
            data: data.map((item) =>
                parseFloat(
                    item['प्रथम चौमासिक खर्च'] ||
                        item['दोश्रो चौमासिक खर्च'] ||
                        item['तेस्रो चौमासिक खर्च']
                )
            ),
        },
    ]

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            scrollablePlotArea: {
                minHeight: isSmallChart ? 500 : 3000,
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
            labels: {
                formatter: function () {
                    return 'Rs ' + convertToNepaliCurrency(this.value as number)
                },
            },
        },
        series: series,
    }
    return highChartOptions
}

// Pie Chart

export const quadrimesterExpensePieChart = (
    data: QuadrimesterExpenseType[]
) => {
    const totalData = data.reduce(
        (acc, item) => {
            acc['प्रथम चौमासिक बजेट'] += parseFloat(
                item['प्रथम चौमासिक बजेट'] || '0'
            )
            acc['दोश्रो चौमासिक बजेट'] += parseFloat(
                item['दोश्रो चौमासिक	बजेट'] || '0'
            )
            acc['तेस्रो चौमासिक बजेट'] += parseFloat(
                item['तेस्रो चौमासिक	बजेट'] || '0'
            )
            acc['प्रथम चौमासिक खर्च'] += parseFloat(
                item['प्रथम चौमासिक खर्च'] || '0'
            )
            acc['दोश्रो चौमासिक खर्च'] += parseFloat(
                item['दोश्रो चौमासिक खर्च'] || '0'
            )
            acc['तेस्रो चौमासिक खर्च'] += parseFloat(
                item['तेस्रो चौमासिक खर्च'] || '0'
            )
            return acc
        },
        {
            'प्रथम चौमासिक बजेट': 0,
            'दोश्रो चौमासिक बजेट': 0,
            'तेस्रो चौमासिक बजेट': 0,
            'प्रथम चौमासिक खर्च': 0,
            'दोश्रो चौमासिक खर्च': 0,
            'तेस्रो चौमासिक खर्च': 0,
        }
    )
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
            height: 500,
            marginBottom: 100,
        },
        title: {
            text: 'बजेट / खर्च',
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20,
                    } as Highcharts.PlotSeriesDataLabelsOptions,
                    {
                        enabled: true,
                        distance: -60,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7,
                            color: 'black',
                        },
                    } as Highcharts.PlotSeriesDataLabelsOptions,
                ],
            },
        },
        series: [
            {
                type: 'pie',
                name: 'बजेट / खर्च',
                data: [
                    {
                        name: 'चौमासिक बजेट',
                        y:
                            totalData['प्रथम चौमासिक बजेट'] ||
                            totalData['दोश्रो चौमासिक बजेट'] ||
                            totalData['तेस्रो चौमासिक बजेट'],
                    },
                    {
                        name: 'चौमासिक खर्च',
                        y:
                            totalData['प्रथम चौमासिक खर्च'] ||
                            totalData['दोश्रो चौमासिक खर्च'] ||
                            totalData['तेस्रो चौमासिक खर्च'],
                    },
                ],
            },
        ],
    }
    return highChartOptions
}

export const quadrimesterExpenseAreaChart = (
    data: QuadrimesterExpenseType[],
    quarter?: string[],
    years?: string[]
) => {
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'area',
        },
        xAxis: {
            categories: quarter || years || [],
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return 'Rs ' + convertToNepaliCurrency(this.value as number)
                },
            },
        },
        series: [
            {
                name: 'चौमासिक खर्च',
                data: data.map(
                    (item) =>
                        item['प्रथम चौमासिक खर्च'] ||
                        item['दोश्रो चौमासिक खर्च'] ||
                        item['तेस्रो चौमासिक खर्च']
                ),
                type: 'area',
            },
            {
                name: 'चौमासिक बजेट',
                data: data.map(
                    (item) =>
                        item['प्रथम चौमासिक बजेट'] ||
                        item['दोश्रो चौमासिक	बजेट'] ||
                        item['तेस्रो चौमासिक	बजेट']
                ),
                type: 'area',
            },
        ],
    }
    return highChartOptions
}
