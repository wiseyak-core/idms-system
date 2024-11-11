import { BudgetExpenseProps } from '@/model'
import { SeriesOptionsType } from 'highcharts'
import convertToNepaliCurrency from './currencyConverter'

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
                minHeight: isSmallChart ? 100 : 2500,
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
    const remainingData = data.filter((item) => item['क्र.सं.'] !== 'जम्मा')

    const totalData = remainingData.reduce(
        (acc, item) => {
            acc['बजेट जम्मा'] += item['बजेट जम्मा']
            acc['बजेट चालु'] += item['बजेट चालु']
            acc['बजेट पूंजीगत'] += item['बजेट पूंजीगत']

            return acc
        },
        {
            'बजेट जम्मा': 0,
            'बजेट चालु': 0,
            'बजेट पूंजीगत': 0,
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

export const budgetExpenseStackedChart = (
    data: BudgetExpenseProps[],
    cities?: string[]
) => {
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            height: 500,
        },
        title: {
            text: 'बजेट / खर्च',
        },
        xAxis: {
            categories: cities || [],
        },

        yAxis: {
            title: {
                text: 'रुपैयाँ',
            },
        },

        plotOptions: {
            column: {
                stacking: 'normal',
            },
        },

        series: [
            {
                name: 'बजेट चालु',
                data: data.map((item) => item['बजेट चालु']),
                type: 'column',
            },
            {
                name: 'खर्च चालु',
                data: data.map((item) => item['खर्च चालु']),
                type: 'column',
            },
            {
                name: 'बजेट जम्मा',
                data: data.map((item) => item['बजेट जम्मा']),
                type: 'column',
            },
            {
                name: 'खर्च जम्मा',
                data: data.map((item) => item['खर्च जम्मा']),
                type: 'column',
            },
        ],
    }
    return highChartOptions
}

export const budgetExpenseLineChart = (
    data: BudgetExpenseProps[],
    months: string[]
) => {
    console.log(months)
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'area',
        },
        xAxis: {
            categories: months,
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
                name: 'बजेट चालु',
                data: data.map((item) => item['बजेट चालु']),
                type: 'area',
            },
            {
                name: 'खर्च चालु',
                data: data.map((item) => item['खर्च चालु']),
                type: 'area',
            },
            {
                name: 'बजेट जम्मा',
                data: data.map((item) => item['बजेट जम्मा']),
                type: 'area',
            },
            {
                name: 'खर्च जम्मा',
                data: data.map((item) => item['खर्च जम्मा']),
                type: 'area',
            },
        ],
    }
    return highChartOptions
}
