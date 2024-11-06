import { BASE_URL } from '@/constant'
import { QuadrimesterExpenseProps } from '@/model'
import axios, { AxiosResponse } from 'axios'
export const getGenericDataService = ({
    topics,
    cities,
    year,
    chart_type,
    title,
    quarter,
}: {
    topics: string
    cities: string
    year?: string
    title?: string
    quarter?: string
    chart_type?: string
}): Promise<AxiosResponse<QuadrimesterExpenseProps>> | null => {
    if (topics === 'quadrimester_expense') {
        const quadrimester_expense_response =
            axios.get<QuadrimesterExpenseProps>(
                BASE_URL + 'quadrimester_expense',
                {
                    params: {
                        city: cities,
                        year: year,
                        title: title,
                        quarter: quarter,
                        chart_type: chart_type,
                    },
                    paramsSerializer: (params) => {
                        return Object.keys(params)
                            .map((key) => {
                                const value = Array.isArray(params[key])
                                    ? params[key]
                                          .map(
                                              (v) =>
                                                  `${key}=${encodeURIComponent(v)}`
                                          )
                                          .join('&')
                                    : `${key}=${encodeURIComponent(params[key])}`
                                return value
                            })
                            .join('&')
                    },
                }
            )
        return quadrimester_expense_response
    } else {
        return null
    }

    // default:
    //     const response = axios.get<ApiResponse>(BASE_URL + 'api/', {
    //         params: {
    //             topics: topics,
    //             cities: cities,
    //         },
    //         paramsSerializer: (params) => {
    //             return Object.keys(params)
    //                 .map((key) => {
    //                     const value = Array.isArray(params[key])
    //                         ? params[key]
    //                               .map(
    //                                   (v) =>
    //                                       `${key}=${encodeURIComponent(v)}`
    //                               )
    //                               .join('&')
    //                         : `${key}=${encodeURIComponent(params[key])}`
    //                     return value
    //                 })
    //                 .join('&')
    //         },
    //     })
    //     return response
    // }
}

export const getQuadrimesterExpenseService = ({
    cities,
    year,
    title,
    chart_type,
    quarter,
}: {
    cities: string
    year: string
    title: string
    quarter: string
    chart_type: string
}): Promise<AxiosResponse<QuadrimesterExpenseProps>> => {
    const quadrimester_expense_response = axios.get<QuadrimesterExpenseProps>(
        BASE_URL + 'quadrimester_expense',
        {
            params: {
                city: cities,
                year: year,
                title: title,
                chart_type: chart_type,
                quarter: quarter,
            },
        }
    )
    return quadrimester_expense_response
}
