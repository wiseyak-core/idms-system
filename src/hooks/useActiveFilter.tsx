import { createContext, PropsWithChildren, useState, useContext } from 'react'

export interface IActiveFiltersContext {
    activeFilters: string[]
    setActiveFilters: (filters: string[]) => void
}

const ActiveFiltersContext = createContext<IActiveFiltersContext>({
    activeFilters: [],
    setActiveFilters: () => {},
})

export const ActiveFiltersProvider = ({ children }: PropsWithChildren) => {
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    return (
        <ActiveFiltersContext.Provider
            value={{
                activeFilters,
                setActiveFilters,
            }}
        >
            {children}
        </ActiveFiltersContext.Provider>
    )
}

const useActiveOptions = () => {
    const context = useContext(ActiveFiltersContext)
    if (context === undefined) {
        throw new Error(
            'useActiveFilters must be used within an ActiveFiltersProvider'
        )
    }
    return context
}

export default useActiveOptions
