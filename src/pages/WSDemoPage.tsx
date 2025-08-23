import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DemoPage {
  title: string;
  path: string;
}

export default function WSDemoPage() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const demoPages: DemoPage[] = [
    {
      title: 'Input Demo',
      path: 'ws-input-demo',
    },
    {
      title: 'Button Demo',
      path: 'ws-button-demo',
    },
    {
      title: 'Loading Demo',
      path: 'ws-loading-demo',
    },
    {
      title: 'Card Demo',
      path: 'ws-card-demo',
    },
    {
      title: 'Modal Demo',
      path: 'ws-modal-demo',
    },
    {
      title: 'Form Field Demo',
      path: 'ws-form-field-demo',
    },
  ];

  return (
    <div>
      <h1>Component Demo Page</h1>
      <Stack>
        {demoPages.map((page) => (
          <Box sx={{ my: 1 }} key={page.path}>
            <button onClick={() => handleClick(page.path)}>{page.title}</button>
          </Box>
        ))}
      </Stack>
    </div>
  );
}
