import { Layout } from 'antd'

const { Header } = Layout

export const Navbar = () => {
    return (
        <Header
            style={{
                padding: 0,
                background: '#fff',
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'end',
                paddingRight: 24,
            }}
        />
    )
}
