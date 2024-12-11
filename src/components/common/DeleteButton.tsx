import { queryClient } from '@/App'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'

interface DeleteButtonProps {
    endpoint: string
    queryKey: string
}

export const DeleteButton = ({ endpoint, queryKey }: DeleteButtonProps) => {
    const [open, setOpen] = useState(false)

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (endpoint: string) => {
            return await axios.delete(endpoint).then((res) => res.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] })
            message.success('Deleted Successfully')
            setOpen(false)
        },
        onError: () => {
            message.error('Failed to delete')
            setOpen(false)
        },
    })

    const showModal = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        mutateAsync(endpoint)
    }

    return (
        <>
            <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={showModal}
                disabled={isLoading}
            />
            <Modal
                centered
                title="Delete Confirmation"
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="delete"
                        type="primary"
                        danger
                        onClick={handleDelete}
                        loading={isLoading}
                    >
                        Delete
                    </Button>,
                ]}
            >
                <p>
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                </p>
            </Modal>
        </>
    )
}
