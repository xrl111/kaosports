import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
  FilterDropdown,
} from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { IUser, ListResponse } from '../../interfaces';
import { Space, Table, Tag, Avatar, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const UserList = () => {
  const { tableProps, filters, setFilters } = useTable<ListResponse<IUser>>({
    syncWithLocation: true,
    resource: 'users',
    filters: {
      permanent: [
        {
          field: 'status',
          operator: 'eq',
          value: true,
        },
      ],
    },
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
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Search name"
                value={filters.find((f) => f.field === 'username')?.value}
                onChange={(e) =>
                  setFilters([
                    ...filters.filter((f) => f.field !== 'username'),
                    {
                      field: 'username',
                      operator: 'contains',
                      value: e.target.value,
                    },
                  ])
                }
                style={{ width: 200 }}
              />
            </FilterDropdown>
          )}
          filterIcon={<SearchOutlined />}
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
        <Table.Column
          dataIndex="email"
          title={'Email'}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Search email"
                value={filters.find((f) => f.field === 'email')?.value}
                onChange={(e) =>
                  setFilters([
                    ...filters.filter((f) => f.field !== 'email'),
                    {
                      field: 'email',
                      operator: 'contains',
                      value: e.target.value,
                    },
                  ])
                }
                style={{ width: 200 }}
              />
            </FilterDropdown>
          )}
          filterIcon={<SearchOutlined />}
        />
        <Table.Column dataIndex="address" title={'Address'} />
        <Table.Column
          dataIndex="status"
          title={'Status'}
          filters={[
            { text: 'Active', value: true },
            { text: 'Inactive', value: false },
          ]}
          onFilter={(value, record) => record.status === value}
          render={(value: boolean) => (
            <Tag color={value ? 'green' : 'red'}>
              {value ? 'Active' : 'Inactive'}
            </Tag>
          )}
        />
        <Table.Column
          dataIndex="role"
          title={'Role'}
          filters={[
            { text: 'Admin', value: 'admin' },
            { text: 'Manager', value: 'manager' },
            { text: 'Coach', value: 'coach' },
            { text: 'Student', value: 'student' },
          ]}
          onFilter={(value, record) => record.role === value}
          render={(value: string) => (
            <Tag
              color={
                value === 'admin'
                  ? 'red'
                  : value === 'manager'
                  ? 'blue'
                  : value === 'coach'
                  ? 'green'
                  : 'orange'
              }
            >
              {value}
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
