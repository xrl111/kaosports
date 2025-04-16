import { AuthPage } from '@refinedev/antd';
import { Title } from '../../components/title';

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: 'strin11231g@gmail.com', password: 'string' },
      }}
      title={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title collapsed={false} />
        </div>
      }
      registerLink=""
      forgotPasswordLink=""
    />
  );
};
