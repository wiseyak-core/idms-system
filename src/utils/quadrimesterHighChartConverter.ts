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
                        item['तेस्रो चौमासिक	बजेट'] ||
                        item['बजेट जम्मा']
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
                        item['तेस्रो चौमासिक खर्च'] ||
                        item['बजेट जम्मा']
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
): Highcharts.Options => {
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
            acc['बजेट जम्मा'] += parseFloat(
                item['बजेट जम्मा']?.toString() || '0'
            )
            acc['खर्च जम्मा'] += parseFloat(
                item['खर्च जम्मा']?.toString() || '0'
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
            'बजेट जम्मा': 0,
            'खर्च जम्मा': 0,
        }
    )

    const totalBudget =
        totalData['प्रथम चौमासिक बजेट'] +
            totalData['दोश्रो चौमासिक बजेट'] +
            totalData['तेस्रो चौमासिक बजेट'] || totalData['बजेट जम्मा']

    const totalExpense =
        totalData['प्रथम चौमासिक खर्च'] +
            totalData['दोश्रो चौमासिक खर्च'] +
            totalData['तेस्रो चौमासिक खर्च'] || totalData['खर्च जम्मा']

    return {
        chart: {
            type: 'pie',
            height: 500,
            marginBottom: 100,
            backgroundColor: '#ffffff',
        },
        title: {
            text: 'बजेट / खर्च विश्लेषण',
        },
        subtitle: {
            text: 'कुल बजेट र खर्चको तुलनात्मक विवरण',
        },
        tooltip: {
            pointFormat:
                '{series.name}: <b>{point.y:,.2f}</b> ({point.percentage:.1f}%)',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                colors: ['#2ecc71', '#e74c3c'],
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        fontSize: '14px',
                    },
                },
            },
        },
        series: [
            {
                type: 'pie',
                name: 'बजेट / खर्च',
                data: [
                    {
                        name: 'चौमासिक बजेट',
                        y: totalBudget,
                        sliced: true,
                        selected: true,
                    },
                    {
                        name: 'चौमासिक खर्च',
                        y: totalExpense,
                    },
                ],
            },
        ],
        credits: {
            enabled: false,
        },
        legend: {
            enabled: true,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: 'vertical',
                        },
                    },
                },
            ],
        },
    } as Highcharts.Options
}

export const quadrimesterExpenseAreaChart = (
    data: QuadrimesterExpenseType[],
    quarter?: string[],
    years?: string[]
) => {
    const category = quarter && quarter?.length > 1 ? quarter : years

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'area',
        },
        title: {
            text: 'बजेट / खर्च',
        },
        xAxis: {
            categories: category || [],
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
                data: data.map((item) => {
                    const value = parseFloat(
                        item['प्रथम चौमासिक खर्च']?.toString() ||
                            item['दोश्रो चौमासिक खर्च']?.toString() ||
                            item['तेस्रो चौमासिक खर्च']?.toString() ||
                            '0'
                    )
                    return value
                }),
                type: 'area',
            },
            {
                name: 'चौमासिक बजेट',
                data: data.map((item) => {
                    const value = parseFloat(
                        item['प्रथम चौमासिक बजेट']?.toString() ||
                            item['दोश्रो चौमासिक\tबजेट']?.toString() ||
                            item['तेस्रो चौमासिक\tबजेट']?.toString() ||
                            '0'
                    )
                    return value
                }),
                type: 'area',
            },
        ],
        plotOptions: {
            area: {
                fillOpacity: 0.5,
                marker: {
                    enabled: true,
                    radius: 4,
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 2,
                    },
                },
            },
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}</b><br/>
                        ${this.x}: Rs ${convertToNepaliCurrency(this.y as number)}`
            },
        },
    }
    return highChartOptions
}

export const quadrimesterExpenseLineChart = (
    data: QuadrimesterExpenseType[],
    quarter?: string[],
    years?: string[]
) => {
    const category = quarter && quarter?.length > 1 ? quarter : years

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'बजेट / खर्च',
        },
        xAxis: {
            categories: category || [],
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
                data: data.map((item) => {
                    const value = parseFloat(
                        item['प्रथम चौमासिक खर्च']?.toString() ||
                            item['दोश्रो चौमासिक खर्च']?.toString() ||
                            item['तेस्रो चौमासिक खर्च']?.toString() ||
                            '0'
                    )
                    return value
                }),
                type: 'line',
                marker: {
                    enabled: true,
                },
            },
            {
                name: 'चौमासिक बजेट',
                data: data.map((item) => {
                    const value = parseFloat(
                        item['प्रथम चौमासिक बजेट']?.toString() ||
                            item['दोश्रो चौमासिक\tबजेट']?.toString() ||
                            item['तेस्रो चौमासिक\tबजेट']?.toString() ||
                            '0'
                    )
                    return value
                }),
                type: 'line',
                marker: {
                    enabled: true,
                },
            },
        ],
        plotOptions: {
            line: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 3,
                    },
                },
            },
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.series.name}</b><br/>
                        ${this.x}: Rs ${convertToNepaliCurrency(this.y as number)}`
            },
        },
    }
    return highChartOptions
}

export const quarterlyBudgetAnalysis = (
    data: any[],
    analysisType: string = 'budget'
): Highcharts.Options => {
    const filteredData = data.filter((item) => item['क्र.सं.'] !== 'कुल जम्मा')

    const allFields = [
        {
            budgetField: 'प्रथम चौमासिक बजेट',
            expenseField: 'प्रथम चौमासिक खर्च',
            title: 'प्रथम चौमासिक',
        },
        {
            budgetField: 'दोश्रो चौमासिक\tबजेट',
            expenseField: 'दोश्रो चौमासिक खर्च',
            title: 'दोश्रो चौमासिक',
        },
        {
            budgetField: 'तेस्रो चौमासिक\tबजेट',
            expenseField: 'तेस्रो चौमासिक खर्च',
            title: 'तेस्रो चौमासिक',
        },
        {
            budgetField: 'बजेट जम्मा',
            expenseField: 'खर्च जम्मा',
            title: 'वार्षिक',
        },
    ]

    const seriesData = allFields.map(({ budgetField, expenseField, title }) => {
        const fieldToUse =
            analysisType === 'budget' ? budgetField : expenseField

        const chartData = filteredData
            .map((item) => ({
                name: item['शीर्षक'],
                y: parseFloat(item[fieldToUse] || '0'),
            }))
            .filter((item) => item.y > 0)
            .sort((a, b) => b.y - a.y)

        return {
            name: title,
            data: chartData,
        }
    })

    const totalSum = seriesData.reduce(
        (sum, series) =>
            sum +
            series.data.reduce((seriesSum, item) => seriesSum + item.y, 0),
        0
    )

    return {
        chart: {
            type: 'pie',
            height: 800,
        },
        title: {
            text: `${analysisType === 'budget' ? 'बजेट' : 'खर्च'} विश्लेषण`,
            style: {
                fontSize: '18px',
            },
        },
        subtitle: {
            text: `कुल ${analysisType === 'budget' ? 'बजेट' : 'खर्च'}: रु ${new Intl.NumberFormat('ne-NP').format(totalSum)}`,
            style: {
                fontSize: '14px',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                    style: {
                        fontSize: '11px',
                    },
                },
                showInLegend: true,

                size: '75%',
            },
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat:
                '<b>{point.name}</b><br>' +
                `${analysisType === 'budget' ? 'बजेट' : 'खर्च'}: रु {point.y:,.0f}<br>` +
                'प्रतिशत: {point.percentage:.1f}%',
        },

        series: seriesData.map((series) => ({
            name: series.name,
            type: 'pie',
            data: series.data,
        })),
        colors: [
            '#2563eb',
            '#16a34a',
            '#dc2626',
            '#ea580c',
            '#7c3aed',
            '#059669',
            '#d97706',
            '#7c2d12',
            '#4338ca',
            '#be185d',
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        chart: {
                            height: 1600,
                        },
                        plotOptions: {
                            pie: {
                                size: '50%',
                            },
                        },
                    },
                },
            ],
        },
    }
}

export const quadrimesterExpenseQuarterlyTable = (
    data: any[],
    selectedQuarters: string[]
) => {
    const uniqueTitles = [
        ...new Set(
            data.filter((item) => item.शीर्षक !== '').map((item) => item.शीर्षक)
        ),
    ]
    const years = [...new Set(data.map((item) => item.year))]

    const quarterConfig = {
        first: {
            budgetField: 'प्रथम चौमासिक बजेट',
            expenseField: 'प्रथम चौमासिक खर्च',
            budgetKey: 'firstQuarterBudget',
            expenseKey: 'firstQuarterExpense',
            format: 'First Quarter',
        },
        second: {
            budgetField: 'दोश्रो चौमासिक\tबजेट',
            expenseField: 'दोश्रो चौमासिक खर्च',
            budgetKey: 'secondQuarterBudget',
            expenseKey: 'secondQuarterExpense',
            format: 'Second Quarter',
        },
        third: {
            budgetField: 'तेस्रो चौमासिक\tबजेट',
            expenseField: 'तेस्रो चौमासिक खर्च',
            budgetKey: 'thirdQuarterBudget',
            expenseKey: 'thirdQuarterExpense',
            format: 'Third Quarter',
        },
        total: {
            budgetField: 'बजेट जम्मा',
            expenseField: 'खर्च जम्मा',
            balanceField: 'मौज्दात जम्मा',
            budgetKey: 'totalBudget',
            expenseKey: 'totalExpense',
            balanceKey: 'totalBalance',
            format: 'Total',
        },
    }

    // Group data by title and year
    const dataMap = new Map()
    data.forEach((item) => {
        const key = `${item.शीर्षक}_${item.year}`
        if (!dataMap.has(key)) {
            dataMap.set(key, {})
        }

        selectedQuarters.forEach((quarter) => {
            const config = quarterConfig[quarter as keyof typeof quarterConfig]
            if (config) {
                if (quarter === 'total') {
                    // Set total values only if total is selected
                    dataMap.get(key)[config.budgetKey] =
                        parseFloat(item[config.budgetField]) || 0
                    dataMap.get(key)[config.expenseKey] =
                        parseFloat(item[config.expenseField]) || 0
                } else {
                    // Set quarter values
                    if (item[config.budgetField]) {
                        dataMap.get(key)[`${quarter}_budget`] = parseFloat(
                            item[config.budgetField]
                        )
                    }
                    if (item[config.expenseField]) {
                        dataMap.get(key)[`${quarter}_expense`] = parseFloat(
                            item[config.expenseField]
                        )
                    }
                }
            }
        })
    })

    // Create columns data structure
    const columns: Record<string, any[]> = {
        title: uniqueTitles,
    }

    // Generate columns for each year and selected quarters
    years.forEach((year) => {
        selectedQuarters.forEach((quarter) => {
            const config = quarterConfig[quarter as keyof typeof quarterConfig]
            if (config) {
                if (quarter === 'total') {
                    // Add total columns only if total is selected
                    columns[`${config.budgetKey}_${year}`] = uniqueTitles.map(
                        (title) => {
                            const key = `${title}_${year}`
                            return dataMap.get(key)?.[config.budgetKey] || 0
                        }
                    )
                    columns[`${config.expenseKey}_${year}`] = uniqueTitles.map(
                        (title) => {
                            const key = `${title}_${year}`
                            return dataMap.get(key)?.[config.expenseKey] || 0
                        }
                    )
                } else {
                    // Add quarter columns
                    columns[`${config.budgetKey}_${year}`] = uniqueTitles.map(
                        (title) => {
                            const key = `${title}_${year}`
                            return dataMap.get(key)?.[`${quarter}_budget`] || 0
                        }
                    )
                    columns[`${config.expenseKey}_${year}`] = uniqueTitles.map(
                        (title) => {
                            const key = `${title}_${year}`
                            return dataMap.get(key)?.[`${quarter}_expense`] || 0
                        }
                    )
                }
            }
        })
    })

    return {
        dataTable: {
            columns: columns,
        },
        header: [
            'title',
            ...years.map((year) => ({
                format: year,
                columns: selectedQuarters.map((quarter) => {
                    const config =
                        quarterConfig[quarter as keyof typeof quarterConfig]
                    if (quarter === 'total') {
                        return {
                            format: 'Total',
                            columns: [
                                {
                                    columnId: `${config.budgetKey}_${year}`,
                                    format: 'Budget',
                                },
                                {
                                    columnId: `${config.expenseKey}_${year}`,
                                    format: 'Expense',
                                },
                            ],
                        }
                    } else {
                        return {
                            format: config.format,
                            columns: [
                                {
                                    columnId: `${config.budgetKey}_${year}`,
                                    format: 'Budget',
                                },
                                {
                                    columnId: `${config.expenseKey}_${year}`,
                                    format: 'Expense',
                                },
                            ],
                        }
                    }
                }),
            })),
        ],
        columns: [
            {
                id: 'title',
                header: {
                    format: 'Budget Title',
                },
            },
        ],
    }
}

export const quadrimesterExpenseCityTable = (
    data: any[],
    selectedCities: string[]
) => {
    const uniqueTitles = [
        ...new Set(
            data.filter((item) => item.शीर्षक !== '').map((item) => item.शीर्षक)
        ),
    ]
    const years = [...new Set(data.map((item) => item.year))]

    // Group data by title, city and year
    const dataMap = new Map()
    data.forEach((item) => {
        if (selectedCities.includes(item.city)) {
            const key = `${item.शीर्षक}_${item.city}_${item.year}`
            if (!dataMap.has(key)) {
                dataMap.set(key, {})
            }

            // Set budget and expense values
            dataMap.get(key)['budget'] =
                parseFloat(item['प्रथम चौमासिक बजेट']) || 0
            dataMap.get(key)['expense'] =
                parseFloat(item['प्रथम चौमासिक खर्च']) || 0
        }
    })

    // Create columns data structure
    const columns: Record<string, any[]> = {
        title: uniqueTitles,
    }

    // Generate columns for each city and year
    years.forEach((year) => {
        selectedCities.forEach((city) => {
            columns[`budget_${city}_${year}`] = uniqueTitles.map((title) => {
                const key = `${title}_${city}_${year}`
                return dataMap.get(key)?.['budget'] || 0
            })
            columns[`expense_${city}_${year}`] = uniqueTitles.map((title) => {
                const key = `${title}_${city}_${year}`
                return dataMap.get(key)?.['expense'] || 0
            })
        })
    })

    return {
        dataTable: {
            columns: columns,
        },
        header: [
            'title',
            ...years.map((year) => ({
                format: year,
                columns: selectedCities.map((city) => ({
                    format: city,
                    columns: [
                        {
                            columnId: `budget_${city}_${year}`,
                            format: 'Budget',
                        },
                        {
                            columnId: `expense_${city}_${year}`,
                            format: 'Expense',
                        },
                    ],
                })),
            })),
        ],
        columns: [
            {
                id: 'title',
                header: {
                    format: 'Budget Title',
                },
            },
        ],
    }
}

export const quadrimesterYearTable = (data: any[], selectedYears: string[]) => {
    const uniqueTitles = [
        ...new Set(
            data.filter((item) => item.शीर्षक !== '').map((item) => item.शीर्षक)
        ),
    ]

    // Group data by title and year
    const dataMap = new Map()
    data.forEach((item) => {
        if (selectedYears.includes(item.year)) {
            const key = `${item.शीर्षक}_${item.year}`
            if (!dataMap.has(key)) {
                dataMap.set(key, {})
            }

            // Set budget and expense values
            dataMap.get(key)['budget'] =
                parseFloat(item['प्रथम चौमासिक बजेट']) || 0
            dataMap.get(key)['expense'] =
                parseFloat(item['प्रथम चौमासिक खर्च']) || 0
        }
    })

    // Create columns data structure
    const columns: Record<string, any[]> = {
        title: uniqueTitles,
    }

    // Generate columns for each selected year
    selectedYears.forEach((year) => {
        columns[`budget_${year}`] = uniqueTitles.map((title) => {
            const key = `${title}_${year}`
            return dataMap.get(key)?.['budget'] || 0
        })
        columns[`expense_${year}`] = uniqueTitles.map((title) => {
            const key = `${title}_${year}`
            return dataMap.get(key)?.['expense'] || 0
        })
    })

    return {
        dataTable: {
            columns: columns,
        },
        header: [
            'title',
            ...selectedYears.map((year) => ({
                format: year,
                columns: [
                    {
                        format: 'Budget Details',
                        columns: [
                            {
                                columnId: `budget_${year}`,
                                format: 'Budget',
                            },
                            {
                                columnId: `expense_${year}`,
                                format: 'Expense',
                            },
                        ],
                    },
                ],
            })),
        ],
        columns: [
            {
                id: 'title',
                header: {
                    format: 'Budget Title',
                },
            },
        ],
    }
}

export const quadrimesterBudgetExpenseChartMultipleCity = (
    data: any[],
    cities?: string[]
) => {
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'bar',
            height: 500,
            marginRight: 100,
        },
        title: {
            text: 'चौमासिक बजेट / खर्च',
        },
        xAxis: {
            categories: cities || [],
            labels: {
                style: {
                    fontSize: '12px',
                },
            },
        },
        yAxis: {
            title: {
                text: 'रुपैयाँ',
            },
            labels: {
                formatter: function () {
                    return 'रु ' + convertToNepaliCurrency(this.value as number)
                },
                style: {
                    fontSize: '12px',
                },
            },
        },
        plotOptions: {
            bar: {
                grouping: true,
                groupPadding: 0.1,
                pointPadding: 0.05,
                borderWidth: 0,
            },
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            symbolRadius: 2,
            itemStyle: {
                fontSize: '12px',
            },
        },
        tooltip: {
            shared: true,
            formatter: function () {
                if (!this.points) return ''
                let s = `<b>${this.x}</b><br/>`
                this.points.forEach((point) => {
                    s += `${point.series.name}: रु ${convertToNepaliCurrency(point.y || 0)}<br/>`
                })
                return s
            },
        },
        series: [
            {
                name: 'प्रथम चौमासिक बजेट',
                data: data.map((item) => item['प्रथम चौमासिक बजेट']) || [],
                type: 'bar',
                color: '#2ecc71',
            },
            {
                name: 'प्रथम चौमासिक खर्च',
                data: data.map((item) => item['प्रथम चौमासिक खर्च']) || [],
                type: 'bar',
                color: '#27ae60',
            },
            {
                name: 'दोश्रो चौमासिक बजेट',
                data: data.map((item) => item['दोश्रो चौमासिक\tबजेट']) || [],
                type: 'bar',
                color: '#3498db',
                visible: false,
            },
            {
                name: 'दोश्रो चौमासिक खर्च',
                data: data.map((item) => item['दोश्रो चौमासिक खर्च']) || [],
                type: 'bar',
                color: '#2980b9',
                visible: false,
            },
            {
                name: 'तेस्रो चौमासिक बजेट',
                data: data.map((item) => item['तेस्रो चौमासिक\tबजेट']) || [],
                type: 'bar',
                color: '#e74c3c',
                visible: false,
            },
            {
                name: 'तेस्रो चौमासिक खर्च',
                data: data.map((item) => item['तेस्रो चौमासिक खर्च']) || [],
                type: 'bar',
                color: '#c0392b',
                visible: false,
            },
        ],
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadPDF', 'downloadCSV'],
                },
            },
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal',
                        },
                    },
                },
            ],
        },
    }
    return highChartOptions
}
