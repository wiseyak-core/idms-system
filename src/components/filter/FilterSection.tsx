import { QuadrimesterFilter } from './QuadrimesterFilter'
import { BudgetFilter } from './BudgetFilter'
import useTopicSelect from '@/hooks/useTopicSelect'

const FilterSection = ({ onClose }: { onClose?: () => void }) => {
    const { topic } = useTopicSelect()

    switch (topic) {
        case 'quadrimester_expense':
            return <QuadrimesterFilter />
        case 'budget_expense':
            return <BudgetFilter onClose={onClose} />
        default:
            return <QuadrimesterFilter />
    }
}

export default FilterSection
