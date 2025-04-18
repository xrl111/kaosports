import { UploadOutlined } from '@ant-design/icons';
import { Edit, useForm } from '@refinedev/antd';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useEffect } from 'react';
import { UserProps } from '../../interfaces';

export const UserEdit = ({ userType }: UserProps) => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: userType,
    queryOptions: {
      enabled: true,
    },
    liveMode: 'manual',
  });

  const { data } = queryResult || {};
  const record = data?.data?.data;

  useEffect(() => {
    if (record) {
      formProps.form?.setFieldsValue({
        name: record.name,
        email: record.email,
        password: 'Đọc cái db mấy thằng ngu',
        url: record.url ? record.url : 'unknown.png',
        gender: record.gender,
        phone: record.phone,
        address: record.address,
        type: record.type,
        status: record.status,
      });
    }
  }, [record, formProps.form]);

  if (!record) return <div>Loading...</div>;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={record}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" disabled />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: false }]}
        >
          <Input
            type="password"
            placeholder="Leave empty to keep current password"
            disabled
          />
        </Form.Item>

        <Form.Item label="Avatar" name="url">
          <Upload
            beforeUpload={(file) => {
              formProps.form?.setFieldValue('url', file.name);
              return false;
            }}
            maxCount={1}
            defaultFileList={
              record.url
                ? [
                    {
                      uid: '-1',
                      name: record.url,
                      status: 'done',
                      url: record.url,
                    },
                  ]
                : []
            }
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select
            options={[
              { label: 'Male', value: true },
              { label: 'Female', value: false },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            {
              pattern: /^[0-9]{10,11}$/,
              message: 'Please enter a valid phone number (10-11 digits)',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
