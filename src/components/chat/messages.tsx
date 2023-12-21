// import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
import Message from "./message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);

  console.log(messages);

  return (
    <Box
      sx={{
        backgroundColor: '#ddddf7',
        padding: '10px',
        height: 'calc(100% - 160px)',
        overflow: 'scroll',
      }}
    >
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Box>
  );
};

export default Messages;
