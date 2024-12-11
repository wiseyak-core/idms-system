import { queryClient } from '@/App'
import { BASE_URL } from '@/constant'
import { CITIES } from '@/constant/cities'
import { TOPICS } from '@/constant/topics'
import {
    uploadDataSetSchema,
    UploadDatasetSetSchemaType,
} from '@/schema/uploadDataset.schema'
import { UploadOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Select,
    Upload,
    UploadFile,
} from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

interface UploadData extends UploadDatasetSetSchemaType {
    file: File
}

const UploadDataSetModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<UploadDatasetSetSchemaType>({
        resolver: yupResolver(uploadDataSetSchema),
        defaultValues: {
            city: '',
            category: '',
            year: null,
            month: null,
        },
    })

    // Watch the category field
    const category = watch('category')

    const handleOpen = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        reset()
        clearUpload()
    }

    const clearUpload = () => {
        setFile(null)
    }

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (data: UploadData) => {
            const formData = new FormData()
            formData.append('file', data.file)

            return axios.post(BASE_URL + '/api/dataset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    city: data.city,
                    category: data.category,
                    year: data.year,
                    month: data.month,
                },
            })
        },
        onSuccess: () => {
            message.success('Dataset uploaded successfully')
            queryClient.invalidateQueries({ queryKey: ['dataset'] })
            setIsModalOpen(false)
            reset()
            clearUpload()
        },
        onError: (error) => {
            console.error('Upload error:', error)
            message.error('Unable to upload dataset')
        },
    })

    const onSubmit = (data: UploadDatasetSetSchemaType) => {
        try {
            if (!file) {
                message.open({
                    type: 'error',
                    content: 'File is required',
                })
                return
            }
            const payload = {
                ...data,
                file: file,
            }
            mutateAsync(payload)
        } catch (error) {
            message.error('Failed to upload dataset')
        }
    }

    return (
        <>
            <Button type="primary" onClick={handleOpen}>
                Upload Dataset
            </Button>
            <Modal
                title="Upload Dataset"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="back"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                    >
                        Upload
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item
                        label="City"
                        validateStatus={errors.city ? 'error' : ''}
                        help={errors.city?.message}
                    >
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select a city"
                                    style={{
                                        width: '100%',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {CITIES.map((value) => (
                                        <Select.Option
                                            key={value}
                                            value={value}
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        validateStatus={errors.category ? 'error' : ''}
                        help={errors.category?.message}
                    >
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select a category"
                                    style={{
                                        width: '100%',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {TOPICS.map((item) => (
                                        <Select.Option
                                            key={item}
                                            value={item}
                                            style={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {item}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </Form.Item>

                    {category === 'quadrimester_expense' && (
                        <Form.Item
                            label="Year"
                            validateStatus={errors.year ? 'error' : ''}
                            help={errors.year?.message}
                        >
                            <Controller
                                name="year"
                                control={control}
                                render={({ field, formState: { errors } }) => (
                                    <>
                                        <Input
                                            {...field}
                                            placeholder="Enter year"
                                            value={field.value ?? ''}
                                        />
                                        {errors.year && (
                                            <div
                                                style={{
                                                    color: 'red',
                                                    fontSize: '12px',
                                                }}
                                            >
                                                {errors.year.message}
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </Form.Item>
                    )}

                    {category === 'budget_expense' && (
                        <Form.Item
                            label="Month"
                            validateStatus={errors.month ? 'error' : ''}
                            help={errors.month?.message}
                        >
                            <Controller
                                name="month"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Enter month"
                                        value={field.value ?? ''}
                                    />
                                )}
                            />
                        </Form.Item>
                    )}

                    <Form.Item label="File">
                        <Upload
                            accept=".csv, .xlsx"
                            beforeUpload={(file) => {
                                setFile(file)
                                return false
                            }}
                            maxCount={1}
                            fileList={
                                file ? [file as unknown as UploadFile] : []
                            }
                            showUploadList={{
                                showRemoveIcon: true,
                            }}
                            onRemove={() => setFile(null)}
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UploadDataSetModal
