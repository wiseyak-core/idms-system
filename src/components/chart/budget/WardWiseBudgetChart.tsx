import { BudgetExpenseProps } from '@/model'
import { wardWiseBudget } from '@/utils/budgetHighChartConverter'
import { Card } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import exporting from 'highcharts/modules/exporting'

exporting(Highcharts)

const WardWiseBudgetChart = ({
    coreData,
}: {
    coreData: BudgetExpenseProps[]
}) => {
    const wardWiseData = wardWiseBudget(coreData)
    return (
        <Card title="वडागत बजेट चार्ट" style={{ width: '100%' }}>
            <HighchartsReact
                id="chart"
                highcharts={Highcharts}
                options={wardWiseData || {}}
                style={{ width: '30%' }}
                immutable={true}
                export
            />
        </Card>
    )
}

export default WardWiseBudgetChart
