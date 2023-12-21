import Header from '../../layout/header';
import { Box } from '@mui/material';
import Chat from '../../components/chat/chat';
import Sidebar from '../../components/chat/sidebar';

export default function ChatPage() {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundColor: '#a7bcff',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            border: '1px solid white',
            borderRadius: '10px',
            width: '65%',
            height: '80%',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <Chat />
        </Box>
      </Box>
    </Box>
  );
}
