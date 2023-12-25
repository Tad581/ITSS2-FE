import Header from '../../layout/header';
import { Box, Divider } from '@mui/material';
import Chat from '../../components/chat/chat';
import Sidebar from '../../components/chat/sidebar';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';

export default function ChatPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser }: any = useContext(AuthContext);

  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    if (!currentUser) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#F5F5F5',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Header />
        <Box
          sx={{
            marginTop: 3,
            border: '1px solid white',
            borderRadius: '10px',
            width: '90%',
            height: '80%',
            display: 'flex',
            overflow: 'hidden',
            fontFamily: 'Raleway, Arial',
          }}
        >
          <Sidebar />
          <Divider orientation='vertical' />
          <Chat />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
