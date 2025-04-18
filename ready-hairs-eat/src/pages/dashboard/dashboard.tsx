import { Card, Col, Row, Statistic } from 'antd';
import { useList } from '@refinedev/core';
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { DataResponse, IUser, ListResponse } from '../../interfaces';
export const Dashboard = () => {
  const { data: usersData } = useList<ListResponse<IUser>>({
    resource: 'users',
  });

  const users = usersData?.data?.result || [];

  const total = {
    totalUsers: usersData?.data?.totalCount || 0,
    totalManagers:
      users.filter((user: IUser) => user.role === 'manager').length || 0,
    totalAdmins:
      users.filter((user: IUser) => user.role === 'admin').length || 0,
    totalCoaches:
      users.filter((user: IUser) => user.role === 'coach').length || 0,
    totalStudents:
      users.filter((user: IUser) => user.role === 'student').length || 0,
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8} lg={4.8}>
          <Card>
            <Statistic
              title="Total Users"
              value={total.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4.8}>
          <Card>
            <Statistic
              title="Admins"
              value={total.totalAdmins}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4.8}>
          <Card>
            <Statistic
              title="Managers"
              value={total.totalManagers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4.8}>
          <Card>
            <Statistic
              title="Coaches"
              value={total.totalCoaches}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4.8}>
          <Card>
            <Statistic
              title="Students"
              value={total.totalStudents}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card title="Recent Activities" style={{ height: '100%' }}>
            {/* Activity list will go here */}
            <p>No recent activities</p>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Quick Actions" style={{ height: '100%' }}>
            {/* Quick action buttons will go here */}
            <p>No quick actions available</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
