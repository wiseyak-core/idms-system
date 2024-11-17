import useTopicSelect from '@/hooks/useTopicSelect'

import QuadrimesterChart from './chart/QuadrimesterChart'
import BudgetChart from './chart/budget/BudgetChart'

const ChartSection = () => {
    const { topic } = useTopicSelect()

    switch (topic) {
        case 'quadrimester_expense':
            return <QuadrimesterChart />
        case 'budget_expense':
            return <BudgetChart />
        case 'local_activities':
            return <QuadrimesterChart />
        default:
            return <QuadrimesterChart />
    }
}

export default ChartSection
