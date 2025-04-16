import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { dataProvider } from './providers/dataProvider';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { authProvider } from './providers/authProvider';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
import { ForgotPassword } from './pages/forgotPassword';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { UserList, UserCreate, UserEdit } from './pages/users';
import { Dashboard } from './pages/dashboard/dashboard';
import { Title } from './components/title';

const apiUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider url={apiUrl}>
              <Refine
                dataProvider={dataProvider(apiUrl)}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider(authUrl)}
                resources={[
                  {
                    name: 'dashboard',
                    list: '/',
                    meta: {
                      label: 'Dashboard',
                      icon: <DashboardOutlined />,
                    },
                  },
                  {
                    name: 'manager',
                    meta: {
                      label: 'Quản lý người dùng',
                      icon: <TeamOutlined />,
                    },
                  },
                  {
                    name: 'users',
                    list: '/manager/users',
                    create: '/manager/users/create',
                    edit: '/manager/users/edit/:id',
                    meta: {
                      parent: 'manager',
                      label: 'Nội bộ',
                      canDelete: true,
                      icon: <UserOutlined />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => (
                            <ThemedSiderV2 {...props} Title={Title} fixed />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="/manager/users">
                      <Route index element={<UserList userType="users" />} />
                      <Route
                        path="create"
                        element={<UserCreate userType="users" />}
                      />
                      <Route
                        path="edit/:id"
                        element={<UserEdit userType="users" />}
                      />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
