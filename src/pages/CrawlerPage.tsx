import { BASE_URL } from '@/constant'
import { Button, Flex, Typography, message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'

const CrawlerPage = () => {
    const [seconds, setSeconds] = useState(60)
    const [isActive, setActive] = useState(false)
    const { mutateAsync } = useMutation({
        mutationFn: async () => await axios.post(BASE_URL + '/trigger_crawl'),
        onSuccess: () => {
            message.success(
                'Crawling have successfully started.It might take about 5 - 10 mins to complete.'
            )
            setActive(true)
        },
        onError: () => {
            message.error('Failed to Crawl IDMS server')
        },
    })

    const handleCrawlClick = () => {
        mutateAsync()
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1)
            })
        } else if (seconds === 0) {
            setActive(false)
            setSeconds(60)
        }

        return () => clearInterval(interval)
    })

    return (
        <Flex vertical gap={16} style={{ width: '100%', height: '100%' }}>
            <Flex
                align="center"
                justify="center"
                style={{
                    margin: '1rem',
                    height: '85vh',
                    background: 'white',
                    borderRadius: '1rem',
                }}
            >
                <Flex vertical gap="10px" justify="center" align="center">
                    <Typography.Title level={4}>
                        Click the button inorder to get the latest data from the
                        IDMS data portal.
                    </Typography.Title>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={handleCrawlClick}
                        style={{
                            width: 'fit-content',
                        }}
                        disabled={isActive}
                    >
                        {isActive ? seconds.toString() : 'Crawl Data'}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default CrawlerPage
