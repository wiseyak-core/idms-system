import { Card } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const ChartSection = () => {
    // const { data } = useGraphStore()

    // const inventoryValues = data?.reduce(
    //     (acc, currentValue) =>
    //         currentValue.Data_Category === 'Inventory'
    //             ? acc + Number(currentValue.Value)
    //             : acc,
    //     0
    // )

    // const financeValues = data?.reduce(
    //     (acc, currentValue) =>
    //         currentValue.Data_Category === 'Finance'
    //             ? acc + Number(currentValue.Value)
    //             : acc,
    //     0
    // )

    // const optionData = [
    //     {
    //         name: 'Inventory',
    //         y: inventoryValues,
    //     },
    //     {
    //         name: 'Finance',
    //         y: financeValues,
    //     },
    // ]

    // const options: Highcharts.Options = {
    //     title: {
    //         text: 'Pie Chart',
    //     },
    //     series: [
    //         {
    //             type: 'pie',
    //             name: 'percentage',
    //             data: optionData,
    //         },
    //     ],
    // }
    return (
        <Card
            title="Charts"
            style={{
                flexGrow: 1,
            }}
        >
            <HighchartsReact highcharts={Highcharts} options={{}} export />
        </Card>
    )
}

export default ChartSection
