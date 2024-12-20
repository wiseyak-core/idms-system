import { BASE_URL } from '@/constant'
import {
    BudgetData,
    QuadrimesterExpenseData,
    QuadrimesterExpenseProps,
} from '@/model'
import axios, { AxiosResponse } from 'axios'

type GenericDataServiceProps = {
    topic: string
    city?: string
    year?: string
    quarter?: string
    उपशीर्षक?: string
    months?: string
}

export const getQuadrimesterExpenseService = ({
    cities,
    years,
    quarter,
    शीर्षक,
}: {
    cities: string[]
    years: string[]
    quarter: string[]
    शीर्षक: string[]
}): Promise<AxiosResponse<QuadrimesterExpenseData>> => {
    const quadrimester_expense_response = axios.get<QuadrimesterExpenseData>(
        BASE_URL + '/quadrimester_expense',
        {
            params: {
                cities,
                years,
                quarter,
                शीर्षक,
            },
            paramsSerializer: (params) => {
                return Object.keys(params)
                    .map((key) => {
                        const value = Array.isArray(params[key])
                            ? params[key]
                                  .map((v) => `${key}=${encodeURIComponent(v)}`)
                                  .join('&')
                            : `${key}=${encodeURIComponent(params[key])}`
                        return value
                    })
                    .join('&')
            },
        }
    )
    return quadrimester_expense_response
}

export const useGenericAPIQuery = (props: GenericDataServiceProps) => {
    const { topic, city, year, quarter, उपशीर्षक, months } = props

    switch (topic) {
        case 'quadrimester_expense':
            const quadrimester_expense_response =
                axios.get<QuadrimesterExpenseProps>(
                    BASE_URL + '/quadrimester_expense',
                    {
                        params: {
                            city: city,
                            year: year,
                            quarter: quarter,
                        },
                    }
                )
            return quadrimester_expense_response
        case 'budget_expense':
            const budget_expense_response = axios.get<QuadrimesterExpenseProps>(
                BASE_URL + '/budget_expense',
                {
                    params: {
                        city: city,
                        month: months,
                        उपशीर्षक: उपशीर्षक,
                    },
                }
            )
            return budget_expense_response
    }
}

export const getBudgetExpenseService = ({
    cities,
    months,
    उपशीर्षक,
}: {
    cities: string[]
    months: string[]
    उपशीर्षक: string[]
}): Promise<AxiosResponse<BudgetData>> => {
    const budget_expense_response = axios.get<BudgetData>(
        BASE_URL + '/budget_expense',
        {
            params: {
                cities,
                months,
                उपशीर्षक,
            },
            paramsSerializer: (params) => {
                return Object.keys(params)
                    .map((key) => {
                        const value = Array.isArray(params[key])
                            ? params[key]
                                  .map((v) => `${key}=${encodeURIComponent(v)}`)
                                  .join('&')
                            : `${key}=${encodeURIComponent(params[key])}`
                        return value
                    })
                    .join('&')
            },
        }
    )
    return budget_expense_response
}
