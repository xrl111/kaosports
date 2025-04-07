import { UploadOutlined } from '@ant-design/icons';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd';

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: roleSelectProps } = useSelect({
    resource: 'roles',
  });
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="First Name"
          name={['firstName']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name={['lastName']}
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
          <Input />
        </Form.Item>
        <Form.Item label="Role" name={['roleId']} rules={[]}>
          <Select {...roleSelectProps} />
        </Form.Item>
        <Form.Item label="Avatar" name={['avatar']} rules={[]}>
          <Upload
            customRequest={({ onSuccess }) => {
              // Immediately call onSuccess to simulate a successful upload
              // without actually uploading anything
              setTimeout(() => {
                onSuccess?.('ok');
              }, 0);
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Birthday" name={['birthday']} rules={[]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Status" name={['status']} rules={[]}>
          <Select
            options={[
              { label: 'Active', value: true },
              { label: 'Inactive', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item label="Skills" name={['skills']} rules={[]}>
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label="Address" name={['address']} rules={[]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
