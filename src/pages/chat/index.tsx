import Header from '../../layout/header';
import { Box } from '@mui/material';
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
    </ProtectedRoute>
  );
}
