import { Box } from '@mui/material';
import WSFooter from '../WSFooter';
import WSHeader from '../WSHeader';
import { Outlet } from 'react-router-dom';

export default function WSLayout() {
  const backgroundColor = 'background.default'; // You can customize this
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor || 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <WSHeader />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <WSFooter />
    </Box>
  );
}
