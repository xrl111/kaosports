import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { IUser, ListResponse } from '../../interfaces';
import { Space, Table, Tag, Avatar } from 'antd';

export const UserList = () => {
  const { tableProps } = useTable<ListResponse<IUser>>({
    syncWithLocation: true,
    resource: 'users',
  });
  const users = tableProps?.dataSource?.result || [];
  const newTableProps = {
    ...tableProps,
    dataSource: users,
  };

  return (
    <List title={'Người dùng'}>
      <Table {...newTableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column
          dataIndex={'username'}
          title={'Name'}
          render={(_, record: BaseRecord) => (
            <Space>
              {record?.avatar ? (
                <Avatar src={record.avatar} />
              ) : (
                <Avatar src="https://i.pravatar.cc/300" />
              )}
              {record.name}
            </Space>
          )}
        />
        <Table.Column dataIndex="email" title={'Email'} />
        <Table.Column dataIndex="address" title={'Address'} />
        <Table.Column
          dataIndex="status"
          title={'Status'}
          render={(value: boolean) => (
            <Tag color={value ? 'green' : 'red'}>
              {value ? 'Active' : 'Inactive'}
            </Tag>
          )}
        />
        <Table.Column
          title={'Actions'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
              {record.status === true ? (
                <DeleteButton hideText size="small" recordItemId={record.id} />
              ) : (
                <DeleteButton
                  hideText
                  size="small"
                  disabled
                  recordItemId={record.id}
                />
              )}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
