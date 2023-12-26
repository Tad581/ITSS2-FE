/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import { db } from '../../firebase';
import { Box } from '@mui/material';

const Chats = () => {
  const [chats, setChats] = useState<any>([]);

  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u: any) => {
    localStorage.setItem('targetUser', JSON.stringify(u));
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <Box>
      {Object.entries(chats)?.map((chat: any) => (
        <Box
          sx={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#000',
            cursor: 'pointer',
            borderBottom: '1px solid lightgray',
            height: '50px',
            '&:hover': {
              backgroundColor: 'pink',
            },
          }}
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <Box
            component='img'
            src={chat[1].userInfo.photoURL}
            alt=''
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <Box>
            <Box
              component='span'
              sx={{
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              {chat[1].userInfo.displayName}
            </Box>
            <Box component='p' sx={{ fontSize: '14px', color: 'gray' }}>
              {chat[1].lastMessage?.text}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Chats;
