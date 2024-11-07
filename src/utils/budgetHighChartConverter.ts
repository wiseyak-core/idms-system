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
