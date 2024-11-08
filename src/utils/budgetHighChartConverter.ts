import { BudgetExpenseProps } from '@/model'
import { SeriesOptionsType } from 'highcharts'

export const budgetExpenseBarChart = (
    data: BudgetExpenseProps[],
    state: string | undefined
) => {
    const isSmallChart = data.length < 5
    const categories = data.map((item) => item['बजेट उपशीर्षक नाम'])

    let series: SeriesOptionsType[] = []
    switch (state) {
        case 'चालु':
            series = [
                {
                    name: 'खर्च चालु',
                    type: 'column',
                    data: data.map((item) => item['खर्च चालु']),
                },
                {
                    name: 'बजेट चालु',
                    type: 'column',
                    data: data.map((item) => item['बजेट चालु']),
                },
            ]
            break
        case 'जम्मा':
            series = [
                {
                    name: 'खर्च जम्मा',
                    type: 'column',
                    data: data.map((item) => item['खर्च जम्मा']),
                },
                {
                    name: 'बजेट जम्मा',
                    type: 'column',
                    data: data.map((item) => item['बजेट जम्मा']),
                },
            ]
            break

        default:
            series = [
                {
                    name: 'खर्च चालु',
                    type: 'column',
                    data: data.map((item) => item['खर्च चालु']),
                },
                {
                    name: 'बजेट चालु',
                    type: 'column',
                    data: data.map((item) => item['बजेट चालु']),
                },
            ]
    }

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            scrollablePlotArea: {
                minHeight: isSmallChart ? 100 : 1500,
                scrollPositionY: 1,
            },
            marginRight: 100,
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

export const budgetExpensePieChart = (data: BudgetExpenseProps[]) => {
    const totalData =
        data.filter((item) => item['क्र.सं.'] === 'जम्मा')[0] || data[0]
    console.log('totalData', totalData)

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
                        name: 'बजेट जम्मा',
                        y: totalData['बजेट जम्मा'],
                    },
                    {
                        name: 'बजेट चालु',
                        y: totalData['बजेट चालु'],
                    },
                    {
                        name: 'बजेट पूंजीगत',
                        y: totalData['बजेट पूंजीगत'],
                    },
                ],
            },
        ],
    }
    return highChartOptions
}
