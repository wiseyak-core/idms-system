import { Card, Col, Flex, Row, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
export const DashboardPage = () => {
    // const { data } = useGraphStore()

    // const inventoryValues = data?.reduce(
    //     (acc, currentValue) =>
    //         currentValue.Data_Category === 'Inventory'
    //             ? acc + Number(currentValue.Value)
    //             : acc,
    //     0
    // )

    // const financeValues = data?.reduce(
    //     (acc, currentValue) =>
    //         currentValue.Data_Category === 'Finance'
    //             ? acc + Number(currentValue.Value)
    //             : acc,
    //     0
    // )

    // const optionData = [
    //     {
    //         name: 'Inventory',
    //         y: inventoryValues,
    //     },
    //     {
    //         name: 'Finance',
    //         y: financeValues,
    //     },
    // ]

    // const options: Highcharts.Options = {
    //     title: {
    //         text: 'Pie Chart',
    //     },
    //     series: [
    //         {
    //             type: 'pie',
    //             name: 'percentage',
    //             data: optionData,
    //         },
    //     ],
    // }

    return (
        <Flex
            vertical
            style={{
                width: '100%',
            }}
            gap={12}
        >
            <Row
                style={{
                    width: '100%',
                }}
                gutter={12}
            >
                <Col span={6}>
                    <Card title="Total Municipality">
                        <Flex align="center" justify="space-between">
                            <Typography.Title>12</Typography.Title>
                            <HomeOutlined
                                size={128}
                                style={{
                                    fontSize: '2rem',
                                }}
                            />
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Municipality">
                        <Flex align="center" justify="space-between">
                            <Typography.Title>12</Typography.Title>
                            <HomeOutlined
                                size={128}
                                style={{
                                    fontSize: '2rem',
                                }}
                            />
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Municipality">
                        <Flex align="center" justify="space-between">
                            <Typography.Title>12</Typography.Title>
                            <HomeOutlined
                                size={128}
                                style={{
                                    fontSize: '2rem',
                                }}
                            />
                        </Flex>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Municipality">
                        <Flex align="center" justify="space-between">
                            <Typography.Title>12</Typography.Title>
                            <HomeOutlined
                                size={128}
                                style={{
                                    fontSize: '2rem',
                                }}
                            />
                        </Flex>
                    </Card>
                </Col>
            </Row>
            <Row
                gutter={12}
                style={{
                    width: '100%',
                }}
            >
                <Col span={18}>
                    <Card title="Graph">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{}}
                            export
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Recent Datasets"></Card>
                </Col>
            </Row>
        </Flex>
    )
}
