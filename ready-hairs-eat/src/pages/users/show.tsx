// import { Show } from '@refinedev/antd';
// import { useShow } from '@refinedev/core';
// import { Table } from 'antd';
// import React from 'react';

// const columns = [
//   { title: 'Name', dataIndex: 'name' },
//   { title: 'Email', dataIndex: 'email' },
//   { title: 'Phone', dataIndex: 'phone' },
//   { title: 'Status', dataIndex: 'status' },
// ];

// export const UserShow = () => {
//   const { queryResult } = useShow({
//     resource: 'users',
//     queryOptions: {
//       enabled: true,
//     },
//     liveMode: 'manual',
//   });
//   const { data } = queryResult || {};
//   const record = data?.data;

//   return (
//     <Show>
//       <Form>
//         <Form.Item label="Name" name="name">
//           <Input />
//         </Form.Item>
//       </Form>
//     </Show>
//   );
// };
