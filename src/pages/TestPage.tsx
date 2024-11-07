import { GraphicWalker } from '@kanaries/graphic-walker'
import { useEffect, useState } from 'react'

export const TestPage = () => {
    const [data, setData] = useState<any>()
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(
                'https://pub-2422ed4100b443659f588f2382cfc7b1.r2.dev/datasets/ds-students-service.json'
            )
            const data = await response.json()
            setData(data)
        }
        getData()
    })

    const fields = data.fields || []
    const dataSource = data.dataSource || []

    return <GraphicWalker data={dataSource} fields={fields} />
}
