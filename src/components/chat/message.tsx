/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { AuthContext } from '../../context/authContext';

const Message = ({ message }: any) => {
  const { currentUser }: any = useContext(AuthContext);

  const ref: any = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        marginBottom: 1,
        flexDirection:
          message.senderId === currentUser.uid ? 'row-reverse' : 'row',
      }}
    >
      <Box
        className='messageInfo'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: 'gray',
          fontWeight: 300,
        }}
      >
        {/* <Box
          component='img'
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=''
        /> */}
      </Box>
      <Box
        sx={{
          maxWidth: '80%',
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems:
            message.senderId === currentUser.uid ? 'flex-end' : 'flex-start',
        }}
      >
        <Box
          component='p'
          sx={{
            backgroundColor:
              message.senderId === currentUser.uid
                ? 'rgb(25, 118, 210)'
                : 'lightgray',
            color: message.senderId === currentUser.uid ? '#fff' : '#000',
            padding: '10px 20px',
            borderRadius: 10,
            maxWidth: 'max-content',
          }}
        >
          {message.text}
        </Box>
        {message.img && (
          <Box component='img' src={message.img} alt='' sx={{ width: '50%' }} />
        )}
      </Box>
    </Box>
  );
};

export default Message;
