import { QuadrimesterFilter } from './QuadrimesterFilter'
import { BudgetFilter } from './BudgetFilter'
import { LocalActivitiesFilter } from './LocalActivitiesFilter'
import useTopicSelect from '@/hooks/useTopicSelect'

const FilterSection = ({ onClose }: { onClose?: () => void }) => {
    const { topic } = useTopicSelect()

    switch (topic) {
        case 'quadrimester_expense':
            return <QuadrimesterFilter />
        case 'budget_expense':
            return <BudgetFilter onClose={onClose} />
        case 'local_activities':
            return <LocalActivitiesFilter />
        default:
            return <QuadrimesterFilter />
    }
}

export default FilterSection
