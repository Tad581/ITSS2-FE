/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ChatContext } from '../../context/chatContext';
import { db } from '../../firebase';
import Message from './message';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data }: any = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px',
        height: 'calc(100% - 210px)',
        overflowY: 'scroll',
      }}
    >
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
    </Box>
  );
};

export default Messages;
