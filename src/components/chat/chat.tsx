/* eslint-disable @typescript-eslint/no-explicit-any */
import Messages from './messages';
import Input from './input';
import { ChatContext } from '../../context/chatContext';
import { Box } from '@mui/material';
import { useContext } from 'react';

const Chat = () => {
  const { data }: any = useContext(ChatContext);

  return (
    <Box sx={{ flex: 2 }}>
      <Box
        sx={{
          height: '50px',
          backgroundColor: '#5d5b8d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          color: 'lightgray',
        }}
      >
        <Box component='span'>{data.user?.displayName}</Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box
            component='img'
            sx={{ height: '24px', cursor: 'pointer' }}
            alt='logo'
            src='/cam.png'
          />
          <Box
            component='img'
            sx={{ height: '24px', cursor: 'pointer' }}
            alt='logo'
            src='/add.png'
          />
          <Box
            component='img'
            sx={{ height: '24px', cursor: 'pointer' }}
            alt='logo'
            src='/more.png'
          />
        </Box>
      </Box>
      <Messages />
      <Input />
    </Box>
  );
};

export default Chat;
