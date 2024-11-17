import { BudgetExpenseProps } from '@/model'
import { sectorWiseBudget } from '@/utils/budgetHighChartConverter'
import { Card } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import exporting from 'highcharts/modules/exporting'

// Initialize exporting module
exporting(Highcharts)

const SectorWiseBudgetChart = ({
    coreData,
}: {
    coreData: BudgetExpenseProps[]
}) => {
    const sectorWiseData = sectorWiseBudget(coreData)

    return (
        <Card title="क्षेत्रगत बजेट विश्लेषण" style={{ width: '100%' }}>
            <div style={{ minHeight: '500px' }}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={sectorWiseData || {}}
                    immutable={true}
                />
            </div>
        </Card>
    )
}

export default SectorWiseBudgetChart
