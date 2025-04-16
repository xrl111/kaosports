import { useNavigate } from 'react-router';
import { Image, Typography, Grid } from 'antd';

const { useBreakpoint } = Grid;

interface TitleProps {
  collapsed: boolean;
}

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
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
        src="/favicon.ico"
        alt="logo"
        preview={false}
        width={35}
        height={30}
      />
      {!collapsed && screens.lg && screens.md && (
        <span style={{ fontWeight: 'bold' }}>KaoSports</span>
      )}
    </div>
  );
};
