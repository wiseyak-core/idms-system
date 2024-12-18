import { BudgetExpensekeys, BudgetExpenseProps } from '@/model'
import { SeriesOptionsType } from 'highcharts'
import convertToNepaliCurrency from './currencyConverter'
import { SUBTITLE } from '@/constant'
import convertToHeatMapFormat from './convertToHeatMap'
import Highcharts from 'highcharts'

// Bar Chart
export const budgetExpenseBarChart = (data: BudgetExpenseProps[]) => {
    const isSmallChart = data.length <= 5
    const categories = data.map((item) => item['बजेट उपशीर्षक नाम'])

    // Define consistent colors for better visual grouping
    const colorPalette = {
        current: ['#7ed69c', '#1a7741'],
        total: ['#7cb9e8', '#195a8c'],
        capital: ['#ff8b83', '#a82113'],
    }

    const series: SeriesOptionsType[] = [
        {
            name: 'खर्च चालु',
            type: 'column',
            data: data.map((item) => item['खर्च चालु']),
            color: colorPalette.current[0],
            grouping: true,
            visible: false,
        },
        {
            name: 'बजेट चालु',
            type: 'column',
            data: data.map((item) => item['बजेट चालु']),
            color: colorPalette.current[1],
            grouping: true,
            visible: false,
        },
        {
            name: 'खर्च जम्मा',
            type: 'column',
            data: data.map((item) => item['खर्च जम्मा']),
            color: colorPalette.total[0],
            grouping: true,
        },
        {
            name: 'बजेट जम्मा',
            type: 'column',
            data: data.map((item) => item['बजेट जम्मा']),
            color: colorPalette.total[1],
            grouping: true,
        },
        {
            name: 'खर्च पूंजीगत',
            type: 'column',
            data: data.map((item) => item['खर्च पूंजीगत']),
            color: colorPalette.capital[0],
            grouping: true,
            visible: false,
        },
        {
            name: 'बजेट पूंजीगत',
            type: 'column',
            data: data.map((item) => item['बजेट पूंजीगत']),
            color: colorPalette.capital[1],
            grouping: true,
            visible: false,
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
            style: {
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
            },
            spacing: [10, 10, 15, 10], // [top, right, bottom, left]
        },
        title: {
            text: 'बजेट / खर्च विवरण',
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        subtitle: {
            text: 'स्रोत: बजेट तथा खर्च प्रणाली',
            style: {
                fontSize: '12px',
                color: '#666',
            },
        },
        credits: {
            enabled: false,
        },

        xAxis: {
            categories: categories,
            startOnTick: false,
            endOnTick: false,
            labels: {
                style: {
                    fontSize: '12px',
                },
                autoRotation: [-45],
            },
            title: {
                text: 'बजेट उपशीर्षक',
                style: {
                    fontSize: '14px',
                },
            },
        },
        yAxis: {
            title: {
                text: 'बजेट/खर्च रुपैयाँ',
                style: {
                    fontSize: '14px',
                },
            },
            labels: {
                formatter: function () {
                    return 'रु ' + convertToNepaliCurrency(this.value as number)
                },
                style: {
                    fontSize: '12px',
                },
            },
            gridLineWidth: 0.5,
            gridLineColor: '#E0E0E0',
        },
        tooltip: {
            shared: true,
            useHTML: true,
            formatter: function () {
                if (!this.points) return ''

                let s = `<b>${this.x}</b><br/>`
                this.points.forEach((point) => {
                    s += `${point.series.name}: रु ${convertToNepaliCurrency(point.y || 0)}<br/>`
                })
                return s
            },
        },
        plotOptions: {
            column: {
                grouping: true,
                groupPadding: 0.1,
                pointPadding: 0.05,
                borderWidth: 0,
                shadow: false,
                states: {
                    hover: {
                        brightness: 0.1,
                    },
                },
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
        series: series,
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
                        yAxis: {
                            labels: {
                                align: 'left',
                            },
                        },
                    },
                },
            ],
        },
    }

    return highChartOptions
}

// Pie Chart

export const budgetExpensePieChart = (
    data: BudgetExpenseProps[],
    pieState: BudgetExpensekeys | undefined
) => {
    // Filter out total row and calculate sums
    const remainingData = data?.filter((item) => item['क्र.सं.'] !== 'जम्मा')
    const totalData = remainingData?.reduce(
        (acc, item) => {
            acc['बजेट चालु'] += item['बजेट चालु']
            acc['बजेट पूंजीगत'] += item['बजेट पूंजीगत']
            acc['बजेट जम्मा'] += item['बजेट जम्मा']
            acc['खर्च चालु'] += item['खर्च चालु']
            acc['खर्च पूंजीगत'] += item['खर्च पूंजीगत']
            acc['खर्च जम्मा'] += item['खर्च जम्मा']
            return acc
        },
        {
            'बजेट चालु': 0,
            'बजेट पूंजीगत': 0,
            'बजेट जम्मा': 0,
            'खर्च चालु': 0,
            'खर्च पूंजीगत': 0,
            'खर्च जम्मा': 0,
        }
    )

    // Determine which data to show based on pieState
    const selectedKey = pieState || 'बजेट'
    const isExpense = selectedKey === 'खर्च'

    const currentTotal = isExpense
        ? totalData['खर्च जम्मा']
        : totalData['बजेट जम्मा']
    const currentData = [
        {
            name: isExpense ? 'खर्च चालु' : 'बजेट चालु',
            y: isExpense ? totalData['खर्च चालु'] : totalData['बजेट चालु'],
            color: '#2563eb', // Blue
        },
        {
            name: isExpense ? 'खर्च पूंजीगत' : 'बजेट पूंजीगत',
            y: isExpense
                ? totalData['खर्च पूंजीगत']
                : totalData['बजेट पूंजीगत'],
            color: '#16a34a', // Green
        },
    ]

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
            height: 500,
            marginBottom: 100,
            style: {
                fontFamily: 'Arial, sans-serif',
            },
        },
        title: {
            text: `${selectedKey} विवरण`,
            style: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        subtitle: {
            text: `कुल ${selectedKey}: रु ${new Intl.NumberFormat('ne-NP').format(currentTotal)}`,
            style: {
                fontSize: '14px',
            },
        },
        tooltip: {
            pointFormat:
                '<b>{point.name}</b><br/>' +
                'रकम: रु {point.y:,.0f}<br/>' +
                'प्रतिशत: {point.percentage:.1f}%<br/>' +
                'कुल रकमको हिस्सा: {point.percentage:.1f}%',
            style: {
                fontSize: '12px',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>रु {point.y:,.0f}<br>{point.percentage:.1f}%',
                    style: {
                        fontSize: '12px',
                        fontWeight: 'normal',
                        textOutline: '1px contrast',
                    },
                    connectorColor: 'silver',
                },
                showInLegend: true,
                center: ['50%', '50%'],
                size: '80%',
            },
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                fontSize: '12px',
            },
            itemMarginTop: 10,
        },
        credits: {
            enabled: false,
        },
        series: [
            {
                type: 'pie',
                name: selectedKey,
                data: currentData,
            },
        ],
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
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    distance: 15,
                                    style: {
                                        fontSize: '10px',
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },
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
            type: 'bar',
            height: 500,
            marginRight: 100,
        },
        title: {
            text: 'बजेट / खर्च',
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
                grouping: true, // Enable grouping
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
                name: 'बजेट चालु',
                data: data.map((item) => item['बजेट चालु']) || [],
                type: 'bar',
                color: '#2ecc71',
            },
            {
                name: 'खर्च चालु',
                data: data.map((item) => item['खर्च चालु']) || [],
                type: 'bar',
                color: '#27ae60',
            },
            {
                name: 'बजेट पूंजीगत',
                data: data.map((item) => item['बजेट पूंजीगत']) || [],
                type: 'bar',
                color: '#3498db',
                visible: false,
            },
            {
                name: 'खर्च पूंजीगत',
                data: data.map((item) => item['खर्च पूंजीगत']) || [],
                type: 'bar',
                color: '#2980b9',
                visible: false,
            },
            {
                name: 'बजेट जम्मा',
                data: data.map((item) => item['बजेट जम्मा']) || [],
                type: 'bar',
                color: '#e74c3c',
                visible: false,
            },
            {
                name: 'खर्च जम्मा',
                data: data.map((item) => item['खर्च जम्मा']) || [],
                type: 'bar',
                color: '#c0392b',
                visible: false,
            },
        ],
        credits: {
            enabled: false,
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

export const budgetExpenseAreaChart = (
    data: BudgetExpenseProps[],
    months: string[]
) => {
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'area',
        },
        title: {
            text: 'बजेट / खर्च',
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
                visible: false,
            },
            {
                name: 'खर्च चालु',
                data: data.map((item) => item['खर्च चालु']),
                type: 'area',
                visible: false,
            },
            {
                name: 'बजेट पूंजीगत',
                data: data.map((item) => item['बजेट पूंजीगत']),
                type: 'area',
                visible: false,
            },
            {
                name: 'खर्च पूंजीगत',
                data: data.map((item) => item['खर्च पूंजीगत']),
                type: 'area',
                visible: false,
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
        title: {
            text: 'बजेट / खर्च',
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
                visible: false,
            },
            {
                name: 'खर्च चालु',
                data: data.map((item) => item['खर्च चालु']),
                type: 'line',
                visible: false,
            },
            {
                name: 'बजेट पूंजीगत',
                data: data.map((item) => item['बजेट पूंजीगत']),
                type: 'line',
                visible: false,
            },
            {
                name: 'खर्च पूंजीगत',
                data: data.map((item) => item['खर्च पूंजीगत']),
                type: 'line',
                visible: false,
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

export const budgetExpenseHeatMap = (data: BudgetExpenseProps[]) => {
    const remainingData = data.filter((item) => item['क्र.सं.'] !== 'जम्मा')
    const heatMapData = convertToHeatMapFormat(remainingData)

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'heatmap',
            scrollablePlotArea: {
                scrollPositionX: 1,
            },
            zooming: {
                type: 'xy',
            },
        },
        title: {
            text: 'बजेट / खर्च',
        },
        xAxis: {
            categories: SUBTITLE,
            scrollbar: {
                enabled: true,
            },
        },
        yAxis: {
            categories: [
                'बजेट चालु',
                'बजेट पूंजीगत',
                'बजेट जम्मा',
                'खर्च चालु',
                'खर्च पूंजीगत',
                'खर्च जम्मा',
            ],
            scrollbar: {
                enabled: true,
            },
            startOnTick: false,
            endOnTick: false,
        },
        plotOptions: {
            series: {
                dataLabels: {
                    overflow: 'justify',
                    crop: true,
                },
            },
        },
        colorAxis: {
            stops: [
                [0, '#ffffff'],
                [0.1, '#B7EFC5'],
                [0.2, '#92E6A7'],
                [0.3, '#6EDE8A'],
                [0.4, '#4AD66D'],
                [0.5, '#2DC653'],
                [0.6, '#25A244'],
                [0.7, '#208B3A'],
                [0.8, '#155D27'],
                [0.9, '#10451D'],
            ],
            // min: -10,
            // max: 20,
        },
        series: [
            {
                name: 'Budget vs Expense per Category',
                data: heatMapData,
                type: 'heatmap',
            },
        ],
    }
    return highChartOptions
}

export const wardWiseBudget = (data: BudgetExpenseProps[]) => {
    const wards = [
        ...new Set(
            data.map((item) =>
                item['बजेट उपशीर्षक नाम'].includes('नगरपालिकावडा नं.')
                    ? item['बजेट उपशीर्षक नाम']
                    : null
            )
        ),
    ].filter(Boolean)

    const wardData = wards.map((ward) => {
        // Find the specific item for this ward
        const wardItem = data.find((item) => item['बजेट उपशीर्षक नाम'] === ward)

        return {
            ward,
            'बजेट चालु': wardItem?.['बजेट चालु'] || 0,
            'बजेट पूंजीगत': wardItem?.['बजेट पूंजीगत'] || 0,
            'बजेट जम्मा': wardItem?.['बजेट जम्मा'] || 0,
            'खर्च चालु': wardItem?.['खर्च चालु'] || 0,
            'खर्च पूंजीगत': wardItem?.['खर्च पूंजीगत'] || 0,
            'खर्च जम्मा': wardItem?.['खर्च जम्मा'] || 0,
        }
    })

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            height: 500,
            marginRight: 100,
        },
        title: {
            text: 'वडा अनुसार बजेट / खर्च',
        },
        xAxis: {
            categories: wards as string[],
            title: {
                text: 'वडा',
            },
        },
        yAxis: {
            title: {
                text: 'रुपैयाँ',
            },
            labels: {
                formatter: function () {
                    return 'Rs ' + convertToNepaliCurrency(this.value as number)
                },
            },
        },
        plotOptions: {
            column: {
                grouping: true,
                shadow: false,
            },
        },
        series: [
            {
                name: 'बजेट चालु',
                data: wardData.map((item) => item['बजेट चालु']),
                type: 'column',
            },
            {
                name: 'खर्च चालु',
                data: wardData.map((item) => item['खर्च चालु']),
                type: 'column',
            },
            {
                name: 'बजेट पूंजीगत',
                data: wardData.map((item) => item['बजेट पूंजीगत']),
                type: 'column',
            },
            {
                name: 'खर्च पूंजीगत',
                data: wardData.map((item) => item['खर्च पूंजीगत']),
                type: 'column',
            },
        ],
    }
    return highChartOptions
}

export const sectorWiseBudget = (data: BudgetExpenseProps[]) => {
    const filterdData = data.filter((item) => item['क्र.सं.'] !== 'जम्मा')
    const budgetData = filterdData.map((item) => ({
        name: item['बजेट उपशीर्षक नाम'],
        y: item['बजेट जम्मा'],
        expense: item['खर्च जम्मा'],
        percentage: (item['खर्च जम्मा'] / item['बजेट जम्मा']) * 100 || 0,
    }))

    // Sort by budget amount
    budgetData.sort((a, b) => b.y - a.y)

    const totalBudget = budgetData.reduce((sum, item) => sum + item.y, 0)

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
            height: 800,
        },
        title: {
            text: 'बजेट विश्लेषण',
        },
        subtitle: {
            text:
                'कुल बजेट: रु ' +
                new Intl.NumberFormat('ne-NP').format(totalBudget),
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
                    distance: 30,
                },
                showInLegend: true,
                size: '80%',
            },
        },
        tooltip: {
            headerFormat: '',
            pointFormat:
                '<span style="color:{point.color}">\u25CF</span> <b>{point.name}</b><br/>' +
                'बजेट: रु {point.y:,.0f}<br/>' +
                'खर्च: रु {point.expense:,.0f}<br/>' +
                'खर्च प्रतिशत: {point.percentage:.1f}%',
        },

        series: [
            {
                type: 'pie',
                name: 'बजेट',
                data: budgetData,
            },
        ],
        colors: [
            '#2563eb',
            '#16a34a',
            '#dc2626',
            '#ea580c',
            '#7c3aed',
            '#0891b2',
            '#be185d',
            '#854d0e',
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

    return highChartOptions
}

export const budgetExpenseTableMonth = (data: BudgetExpenseProps[]) => {
    // Get unique budget titles and months
    const uniqueTitles = [
        ...new Set(data.map((item) => item['बजेट उपशीर्षक नाम'])),
    ]
    const months = [...new Set(data.map((item) => item.month))]

    // Create a mapping of title and month to their respective values
    const valueMap = new Map()
    data.forEach((item) => {
        const key = `${item['बजेट उपशीर्षक नाम']}_${item.month}`
        valueMap.set(key, {
            budget: item['बजेट जम्मा'],
            expense: item['खर्च जम्मा'],
            balance: item['मौज्दात जम्मा'],
        })
    })

    // Create columns data structure
    const columns: Record<string, any[]> = {
        title: uniqueTitles,
    }

    // Initialize and populate budget, expense, and balance columns for each month
    months.forEach((month) => {
        columns[`budget_${month}`] = uniqueTitles.map((title) => {
            const key = `${title}_${month}`
            return valueMap.get(key)?.budget ?? 0
        })

        columns[`expense_${month}`] = uniqueTitles.map((title) => {
            const key = `${title}_${month}`
            return valueMap.get(key)?.expense ?? 0
        })

        columns[`balance_${month}`] = uniqueTitles.map((title) => {
            const key = `${title}_${month}`
            return valueMap.get(key)?.balance ?? 0
        })
    })

    return {
        dataTable: {
            columns: columns,
        },
        header: [
            'title',
            ...months.map((month) => ({
                format: capitalizeFirstLetter(month),
                columns: [
                    {
                        format: 'Budget Details',
                        columns: [
                            {
                                columnId: `budget_${month}`,
                                format: 'Budget',
                            },
                            {
                                columnId: `expense_${month}`,
                                format: 'Expense',
                            },
                            {
                                columnId: `balance_${month}`,
                                format: 'Balance',
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

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const budgetExpenseCityTable = (data: BudgetExpenseProps[]) => {
    // Get unique budget titles and cities
    const uniqueTitles = [
        ...new Set(data.map((item) => item['बजेट उपशीर्षक नाम'])),
    ]
    const cities = [...new Set(data.map((item) => item.city))]

    // Create a mapping of title and city to their respective values
    const valueMap = new Map()
    data.forEach((item) => {
        const key = `${item['बजेट उपशीर्षक नाम']}_${item.city}`
        valueMap.set(key, {
            budget: item['बजेट जम्मा'],
            expense: item['खर्च जम्मा'],
            balance: item['मौज्दात जम्मा'],
        })
    })

    // Create columns data structure
    const columns: Record<string, any[]> = {
        title: uniqueTitles,
    }

    // Initialize and populate budget, expense, and balance columns for each city
    cities.forEach((city) => {
        columns[`budget_${city}`] = uniqueTitles.map((title) => {
            const key = `${title}_${city}`
            return valueMap.get(key)?.budget ?? 0
        })
        columns[`expense_${city}`] = uniqueTitles.map((title) => {
            const key = `${title}_${city}`
            return valueMap.get(key)?.expense ?? 0
        })
        columns[`balance_${city}`] = uniqueTitles.map((title) => {
            const key = `${title}_${city}`
            return valueMap.get(key)?.balance ?? 0
        })
    })

    return {
        dataTable: {
            columns: columns,
        },
        header: [
            'title',
            ...cities.map((city) => ({
                format: capitalizeFirstLetter(city),
                columns: [
                    {
                        format: 'Budget Details',
                        columns: [
                            {
                                columnId: `budget_${city}`,
                                format: 'Budget',
                            },
                            {
                                columnId: `expense_${city}`,
                                format: 'Expense',
                            },
                            {
                                columnId: `balance_${city}`,
                                format: 'Balance',
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
