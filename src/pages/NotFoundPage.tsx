import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    const returnHome = () => {
        navigate('/')
    }

    return (
        <Flex
            justify="center"
            align="center"
            vertical
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <Typography.Title level={4}>
                Page Not Found . You seem to be lost{' '}
            </Typography.Title>
            <Button variant="solid" color="primary" onClick={returnHome}>
                Return Home
            </Button>
        </Flex>
    )
}

export default NotFoundPage
