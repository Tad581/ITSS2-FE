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
        const data = doc.data();
        if (data) {
          const filteredChats = Object.entries(data).filter(
            ([, chat]: any) => chat.userInfo && chat.userInfo.uid !== currentUser.uid
          );
          setChats(filteredChats);
        } else {
          setChats([]); // Đảm bảo state được cập nhật với danh sách trống nếu không có dữ liệu
        }
      });

      return () => {
        unsub();
      };
    };

    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser.uid]);

  const handleSelect = (u: any) => {
    localStorage.setItem('targetUser', JSON.stringify(u));
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <Box>
      {chats.length > 0 ? (
        chats.map(([chatId, chat]: any) => (
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
            key={chatId}
            onClick={() => handleSelect(chat.userInfo)}
          >
            <Box
              component='img'
              src={chat.userInfo?.photoURL}
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
                {chat.userInfo?.displayName}
              </Box>
              <Box component='p' sx={{ fontSize: '14px', color: 'gray' }}>
                {chat.lastMessage?.text}
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box sx={{ padding: '10px', color: 'gray' }}>Không có cuộc trò chuyện nào.</Box>
      )}
    </Box>
  );
};

export default Chats;
