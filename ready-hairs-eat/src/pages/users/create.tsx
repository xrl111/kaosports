import { UploadOutlined } from '@ant-design/icons';
import { Create, useForm } from '@refinedev/antd';
import { Button, Form, Input, Select, Upload } from 'antd';

interface UserCreateProps {
  userType: 'users';
}

export const UserCreate = ({ userType }: UserCreateProps) => {
  const { formProps, saveButtonProps } = useForm({
    resource: userType,
  });

  return (
    <Create saveButtonProps={saveButtonProps} title={'Tạo người dùng'}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={['email']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name={['password']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item label="Avatar" name={['url']} rules={[]}>
          <Upload
            beforeUpload={(file) => {
              // Get the file name and set it as the form value
              formProps.form?.setFieldValue('url', file.name);
              return false; // Prevent automatic upload
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Gender" name={['gender']} rules={[]}>
          <Select
            options={[
              { label: 'Male', value: true },
              { label: 'Female', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name={['phone']}
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
        <Form.Item label="Address" name={['address']} rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item label="type" name={['type']} rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item label="Status" name={['status']} rules={[]}>
          <Select
            options={[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
