import Messages from './messages';
import Input from './input';
// import { ChatContext } from "../context/ChatContext";
import { Box } from '@mui/material';

const Chat = () => {
  // const { data } = useContext(ChatContext);

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
        {/* <span>{data.user?.displayName}</span> */}
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
