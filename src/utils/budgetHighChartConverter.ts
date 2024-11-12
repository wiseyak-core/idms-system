import { BudgetExpensekeys, BudgetExpenseProps } from '@/model'
import { SeriesOptionsType } from 'highcharts'
import convertToNepaliCurrency from './currencyConverter'

// Bar Chart
export const budgetExpenseBarChart = (data: BudgetExpenseProps[]) => {
    const isSmallChart = data.length <= 5
    const categories = data.map((item) => item['बजेट उपशीर्षक नाम'])

    const series: SeriesOptionsType[] = [
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

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            scrollablePlotArea: {
                minHeight: isSmallChart ? 500 : 3000,
                scrollPositionY: 1,
                opacity: 0.5,
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

export const budgetExpensePieChart = (
    data: BudgetExpenseProps[],
    pieState: BudgetExpensekeys | undefined
) => {
    const selectedKey = pieState as BudgetExpensekeys
    const remainingData = data.filter((item) => item['क्र.सं.'] !== 'जम्मा')
    const totalData = remainingData.reduce(
        (acc, item) => {
            acc['बजेट चालु'] += item['बजेट चालु']
            acc['बजेट पूंजीगत'] += item['बजेट पूंजीगत']
            acc['खर्च चालु'] += item['खर्च चालु']
            acc['खर्च पूंजीगत'] += item['खर्च पूंजीगत']
            return acc
        },
        {
            'बजेट चालु': 0,
            'बजेट पूंजीगत': 0,
            'खर्च चालु': 0,
            'खर्च पूंजीगत': 0,
        }
    )

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
            height: 500,
            marginBottom: 100,
        },
        title: {
            text: selectedKey || 'बजेट / खर्च',
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
                        name:
                            selectedKey === 'खर्च' ? 'खर्च चालु' : 'बजेट चालु',
                        y:
                            selectedKey === 'खर्च'
                                ? totalData['खर्च चालु']
                                : totalData['बजेट चालु'],
                    },
                    {
                        name:
                            selectedKey === 'खर्च'
                                ? 'खर्च पूंजीगत'
                                : 'बजेट पूंजीगत',
                        y:
                            selectedKey === 'खर्च'
                                ? totalData['खर्च पूंजीगत']
                                : totalData['बजेट पूंजीगत'],
                    },
                ],
            },
        ],
    }
    return highChartOptions
}

// Stacked Chart

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
                name: 'बजेट पूंजीगत',
                data: data.map((item) => item['बजेट पूंजीगत']),
                type: 'column',
            },
            {
                name: 'खर्च पूंजीगत',
                data: data.map((item) => item['खर्च पूंजीगत']),
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

export const budgetExpenseAreaChart = (
    data: BudgetExpenseProps[],
    months: string[]
) => {
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
                name: 'बजेट पूंजीगत',
                data: data.map((item) => item['बजेट पूंजीगत']),
                type: 'area',
            },
            {
                name: 'खर्च पूंजीगत',
                data: data.map((item) => item['खर्च पूंजीगत']),
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

export const budgetExpenseLineChart = (
    data: BudgetExpenseProps[],
    months: string[]
) => {
    const highChartOptions: Highcharts.Options = {
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
                type: 'line',
            },
            {
                name: 'खर्च चालु',
                data: data.map((item) => item['खर्च चालु']),
                type: 'line',
            },
            {
                name: 'बजेट पूंजीगत',
                data: data.map((item) => item['बजेट पूंजीगत']),
                type: 'line',
            },
            {
                name: 'खर्च पूंजीगत',
                data: data.map((item) => item['खर्च पूंजीगत']),
                type: 'line',
            },
            {
                name: 'बजेट जम्मा',
                data: data.map((item) => item['बजेट जम्मा']),
                type: 'line',
            },
            {
                name: 'खर्च जम्मा',
                data: data.map((item) => item['खर्च जम्मा']),
                type: 'line',
            },
        ],
    }
    return highChartOptions
}
