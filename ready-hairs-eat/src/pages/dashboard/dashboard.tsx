import { Card, Col, Row, Statistic } from 'antd';
import { useList } from '@refinedev/core';
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  BookOutlined,
} from '@ant-design/icons';

export const Dashboard = () => {
  const { data: usersData } = useList({
    resource: 'users',
  });

  const totalUsers = usersData?.total || 0;

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Internal Staff"
              value={totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Coaches"
              value={0}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Students"
              value={0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#faad14' }}
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
