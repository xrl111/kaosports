import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';

import { Space, Table, Tag, Avatar, Image } from 'antd';

export const UserList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps}>
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column
          title={'Name'}
          render={(_, record: BaseRecord) => (
            <span>{`${record.firstName} ${record.lastName}`}</span>
          )}
        />
        <Table.Column dataIndex="email" title={'Email'} />
        <Table.Column
          dataIndex="skills"
          title={'Skills'}
          render={(_, record: BaseRecord) => (
            <Space>
              {record.skills.map((skill: string) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </Space>
          )}
        />
        <Table.Column
          dataIndex="avatar"
          title={'Avatar'}
          render={(_, record: BaseRecord) =>
            record?.url ? (
              <Image src={record?.url} width={50} height={50} />
            ) : (
              <Image src="https://i.pravatar.cc/300" width={50} height={50} />
            )
          }
        />
        <Table.Column dataIndex="birthday" title={'birthday'} />
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
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
