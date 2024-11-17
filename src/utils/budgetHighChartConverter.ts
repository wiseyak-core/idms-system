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
        current: ['#2ecc71', '#27ae60'], // Green shades for चालु
        total: ['#3498db', '#2980b9'], // Blue shades for जम्मा
        capital: ['#e74c3c', '#c0392b'], // Red shades for पूंजीगत
    }

    const series: SeriesOptionsType[] = [
        {
            name: 'खर्च चालु',
            type: 'column',
            data: data.map((item) => item['खर्च चालु']),
            color: colorPalette.current[0],
            grouping: true,
        },
        {
            name: 'बजेट चालु',
            type: 'column',
            data: data.map((item) => item['बजेट चालु']),
            color: colorPalette.current[1],
            grouping: true,
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
        },
        {
            name: 'बजेट पूंजीगत',
            type: 'column',
            data: data.map((item) => item['बजेट पूंजीगत']),
            color: colorPalette.capital[1],
            grouping: true,
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
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadPDF', 'downloadCSV'],
                },
            },
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
    const remainingData = data.filter((item) => item['क्र.सं.'] !== 'जम्मा')
    const totalData = remainingData.reduce(
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
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadPDF', 'downloadCSV'],
                },
            },
            filename: `${selectedKey}_विवरण_${new Date().toLocaleDateString('ne-NP')}`,
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
                item['बजेट उपशीर्षक नाम'].includes('लेकवेशी नगरपालिकावडा नं.')
                    ? item['बजेट उपशीर्षक नाम']
                    : null
            )
        ),
    ].filter(Boolean)
    const wardData = wards.map((city) => {
        const cityItems = data.filter((item) =>
            item['बजेट उपशीर्षक नाम'].includes('लेकवेशी नगरपालिकावडा नं.')
        )
        return {
            city,
            'बजेट चालु': cityItems.reduce(
                (sum, item) => sum + item['बजेट चालु'],
                0
            ),
            'बजेट पूंजीगत': cityItems.reduce(
                (sum, item) => sum + item['बजेट पूंजीगत'],
                0
            ),
            'बजेट जम्मा': cityItems.reduce(
                (sum, item) => sum + item['बजेट जम्मा'],
                0
            ),
            'खर्च चालु': cityItems.reduce(
                (sum, item) => sum + item['खर्च चालु'],
                0
            ),
            'खर्च पूंजीगत': cityItems.reduce(
                (sum, item) => sum + item['खर्च पूंजीगत'],
                0
            ),
            'खर्च जम्मा': cityItems.reduce(
                (sum, item) => sum + item['खर्च जम्मा'],
                0
            ),
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
            {
                name: 'बजेट जम्मा',
                data: wardData.map((item) => item['बजेट जम्मा']),
                type: 'column',
            },
            {
                name: 'खर्च जम्मा',
                data: wardData.map((item) => item['खर्च जम्मा']),
                type: 'column',
            },
        ],
    }
    return highChartOptions
}

export const sectorWiseBudget = (
    data: BudgetExpenseProps[],
    matches: boolean
) => {
    // Define sectors and their corresponding budget items
    const sectors = [
        {
            name: 'प्रशासनिक तथा कार्यालय',
            pattern: [
                'लेकवेशी नगरपालिका$',
                'प्रशासन शाखा',
                'सूचना प्रविधी शाखा',
            ],
        },
        {
            name: 'शिक्षा',
            pattern: ['शिक्षा'],
        },
        {
            name: 'स्वास्थ्य',
            pattern: ['स्वास्थ्य', 'नागरिक आरोग्य'],
        },
        {
            name: 'कृषि तथा पशु विकास',
            pattern: ['पशु सेवा', 'कृषि विकाश'],
        },
        {
            name: 'सामाजिक विकास',
            pattern: [
                'महिला तथा बालबालिका',
                'सहकारी',
                'न्यायिक समिती',
                'उद्योग तथा उपभोत्ता',
            ],
        },
        {
            name: 'वडा कार्यालयहरू',
            pattern: ['वडा नं'],
        },
        {
            name: 'विशेष कार्यक्रमहरू',
            pattern: ['शसर्त अनुदान', 'विषेश अनुदान'],
        },
        {
            name: 'वातावरण तथा विपद',
            pattern: ['वन वातावरण तथा विपद'],
        },
    ]

    const sectorData = sectors.map((sector) => {
        const sectorItems = data.filter((item) =>
            sector.pattern.some((pattern) =>
                new RegExp(pattern).test(item['बजेट उपशीर्षक नाम'])
            )
        )

        const totalBudget = sectorItems.reduce(
            (sum, item) => sum + item['बजेट जम्मा'],
            0
        )
        const totalExpense = sectorItems.reduce(
            (sum, item) => sum + item['खर्च जम्मा'],
            0
        )

        return {
            name: sector.name,
            y: totalBudget,
            expense: totalExpense,
            percentage: (totalExpense / totalBudget) * 100 || 0,
        }
    })

    sectorData.sort((a, b) => b.y - a.y)

    const totalBudget = sectorData.reduce((sum, item) => sum + item.y, 0)

    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
            height: 500,
        },
        title: {
            text: 'क्षेत्रगत बजेट विश्लेषण',
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
                },
                showInLegend: matches ? true : false,
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                fontSize: '11px',
            },
        },
        series: [
            {
                type: 'pie',
                name: 'क्षेत्रगत बजेट',
                data: sectorData,
            },
        ],
        colors: [
            '#2563eb', // प्रशासनिक
            '#16a34a', // शिक्षा
            '#dc2626', // स्वास्थ्य
            '#ea580c', // कृषि
            '#7c3aed', // सामाजिक
            '#0891b2', // वडा
            '#be185d', // विशेष
            '#854d0e', // वातावरण
        ],
    }

    return highChartOptions
}
