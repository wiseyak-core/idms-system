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

    const totalBudget =
        totalData['प्रथम चौमासिक बजेट'] +
        totalData['दोश्रो चौमासिक बजेट'] +
        totalData['तेस्रो चौमासिक बजेट']

    const totalExpense =
        totalData['प्रथम चौमासिक खर्च'] +
        totalData['दोश्रो चौमासिक खर्च'] +
        totalData['तेस्रो चौमासिक खर्च']

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
    const highChartOptions: Highcharts.Options = {
        chart: {
            type: 'area',
        },
        title: {
            text: 'बजेट / खर्च',
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

export const quarterlyBudgetAnalysis = (
    data: any[],
    quarter: string,
    analysisType: string = 'budget'
): Highcharts.Options => {
    const sectors = [
        {
            name: 'कर्मचारी तथा प्रशासनिक खर्च',
            pattern: [
                'पारिश्रमिक कर्मचारी',
                'पारिश्रमिक पदाधिकारी',
                'पोशाक',
                'महंगी भत्ता',
                'फिल्ड भत्ता',
                'कर्मचारीको बैठक भत्ता',
                'कर्मचारी प्रोत्साहन',
                'पदाधिकारी बैठक भत्ता',
                'करार सेवा शुल्क',
            ],
        },
        {
            name: 'पूर्वाधार विकास',
            pattern: [
                'सडक तथा पूल निर्माण',
                'विद्युत संरचना निर्माण',
                'तटबन्ध तथा बाँधनिर्माण',
                'सिंचाई संरचना निर्माण',
                'खानेपानी संरचना निर्माण',
                'गैर आवासीय भवन निर्माण',
                'अन्य सार्वजनिक निर्माण',
            ],
        },
        {
            name: 'कार्यालय सञ्चालन',
            pattern: [
                'मसलन्द तथा कार्यालय सामाग्री',
                'इन्धन',
                'सवारी साधन मर्मत',
                'संचार महसुल',
                'विविध खर्च',
                'भ्रमण खर्च',
                'पानी तथा बिजुली',
            ],
        },
        {
            name: 'सामाजिक विकास',
            pattern: [
                'शैक्षिक संस्थाहरूलाई सहायता',
                'छात्रवृत्ति',
                'उद्दार, राहत तथा पुनर्स्थापना',
                'औषधीखरिद खर्च',
                'अन्य सामाजिक सहायता',
                'सीप विकास तथा जनचेतना',
            ],
        },
        {
            name: 'कृषि तथा पशु विकास',
            pattern: ['पशुधन तथा बागवानी विकास'],
        },
    ]

    const quarterConfig = {
        first: {
            budgetField: 'प्रथम चौमासिक बजेट',
            expenseField: 'प्रथम चौमासिक खर्च',
            title: 'प्रथम चौमासिक',
        },
        second: {
            budgetField: 'दोश्रो चौमासिक\tबजेट',
            expenseField: 'दोश्रो चौमासिक खर्च',
            title: 'दोश्रो चौमासिक',
        },
        third: {
            budgetField: 'तेस्रो चौमासिक\tबजेट',
            expenseField: 'तेस्रो चौमासिक खर्च',
            title: 'तेस्रो चौमासिक',
        },
        total: {
            budgetField: 'बजेट जम्मा',
            expenseField: 'खर्च जम्मा',
            title: 'वार्षिक',
        },
    }

    const { budgetField, expenseField, title } =
        quarterConfig[quarter as 'first' | 'second' | 'third' | 'total']
    const fieldToUse = analysisType === 'budget' ? budgetField : expenseField

    const sectorData = sectors.map((sector) => {
        const sectorItems = data.filter((item) =>
            sector.pattern.some((pattern) =>
                item.शीर्षक?.toLowerCase().includes(pattern.toLowerCase())
            )
        )

        const value = sectorItems.reduce(
            (sum, item) => sum + parseFloat(item[fieldToUse] || '0'),
            0
        )

        return {
            name: sector.name,
            y: value,
        }
    })

    const filteredSectorData = sectorData
        .filter((sector) => sector.y > 0)
        .sort((a, b) => b.y - a.y)

    const total = filteredSectorData.reduce((sum, item) => sum + item.y, 0)

    return {
        chart: {
            type: 'pie',
            height: 500,
        },
        title: {
            text: `${title} क्षेत्रगत ${analysisType === 'budget' ? 'बजेट' : 'खर्च'} विश्लेषण`,
            style: {
                fontSize: '18px',
            },
        },
        subtitle: {
            text: `कुल ${analysisType === 'budget' ? 'बजेट' : 'खर्च'}: रु ${new Intl.NumberFormat('ne-NP').format(total)}`,
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
            },
        },
        tooltip: {
            headerFormat: '',
            pointFormat:
                '<b>{point.name}</b><br>' +
                `${analysisType === 'budget' ? 'बजेट' : 'खर्च'}: रु {point.y:,.0f}<br>` +
                'प्रतिशत: {point.percentage:.1f}%',
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
                name: analysisType === 'budget' ? 'बजेट' : 'खर्च',
                data: filteredSectorData,
                type: 'pie',
            },
        ],
        colors: ['#2563eb', '#16a34a', '#dc2626', '#ea580c', '#7c3aed'],
    }
}
