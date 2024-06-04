/* eslint-disable @typescript-eslint/no-explicit-any */
import Messages from './messages';
import Input from './input';
import { ChatContext } from '../../context/chatContext';
import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import RecommendList from './recommendList';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { data }: any = useContext(ChatContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth)
    localStorage.removeItem('currentUser');
    localStorage.removeItem('targetUser');
    navigate('/login');
  }

  return (
    <Box sx={{ flex: 2 }}>
      <Box
        sx={{
          height: '50px',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          borderBottom: '1px solid lightgray',
        }}
      >
        {data.user?.photoURL ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component='img'
              sx={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={data.user?.photoURL}
              alt=''
            />
            <Box
              component='span'
              sx={{ color: '#000', marginLeft: 1, fontWeight: 700 }}
            >
              {data.user?.displayName}
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
        <Button
          sx={{
            backgroundColor: '#40A578',
            color: '#fff',
            fontSize: '12px',
            '&: hover': {
              backgroundColor: '#40A578'
            }
          }}
          onClick={() => handleSignOut()}
        >
          Đăng xuất
        </Button>
      </Box>
      <Messages />
      <RecommendList />
      <Input />
    </Box>
  );
};

export default Chat;
