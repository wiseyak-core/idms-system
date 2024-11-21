import { useEffect, useRef } from 'react'
import DG from '@highcharts/dashboards/datagrid'
import '@highcharts/dashboards/css/datagrid.css'
export default function DataGrid(props: { config: DG.Options }) {
    const { config } = props
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (containerRef.current) {
            DG.dataGrid(containerRef.current, config)
        }
    }, [config])
    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '80vh',
                overflow: 'auto',
            }}
        />
    )
}
