import { useNavigate } from 'react-router';
import { Image, Typography, Grid } from 'antd';

const { useBreakpoint } = Grid;

export const Title: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        gap: 10,
      }}
      onClick={() => {
        navigate('/');
      }}
    >
      <Image
        src="/logo.png"
        alt="logo"
        preview={false}
        width={45}
        height={40}
      />
      {!collapsed && screens.lg && (
        <Typography.Text
          style={{
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          KaoSports
        </Typography.Text>
      )}
    </div>
  );
};
