/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebase';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

interface IProps {
  message: string;
}

export default function Recommend(props: IProps) {
  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);
  console.log("🚀 ~ file: recommend.tsx:42 ~ awaitupdateDoc ~ data.user.uid:", data.user.uid)

  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: props.message,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text: props.message,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text: props.message,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
  };

  return (
    <Button
      variant='contained'
      color='inherit'
      sx={{ maxHeight: '30px', borderRadius: 100, marginX: 1 }}
      onClick={handleSend}
    >
      {props.message}
    </Button>
  );
}
