import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  // const { currentUser } = useContext(AuthContext);
  // const { data } = useContext(ChatContext);

  const ref = useRef();

  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  return (
    <Box
      // ref={ref}
      // className={`message ${message.senderId === currentUser.uid && "owner"}`}
      sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}
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
        <Box
          component='img'
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
          // src={
          //   message.senderId === currentUser.uid
          //     ? currentUser.photoURL
          //     : data.user.photoURL
          // }
          alt=''
        />
        <Box component='span'>just now</Box>
      </Box>
      <Box
        className='messageContent'
        sx={{
          maxWidth: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box
          component='p'
          sx={{
            backgroundColor: 'white',
            padding: '10px 20px',
            borderRadius: '0px 10px 10px 10px',
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
