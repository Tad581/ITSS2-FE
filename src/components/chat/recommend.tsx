/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
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
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
interface IProps {
  message: string;
  owner?: any;
}

export default function Recommend(props: IProps) {
  const { currentUser }: any = useContext(AuthContext);
  const { dispatch, data }: any = useContext(ChatContext);
  const location = useLocation();

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    if (props.owner && currentUser) {
      localStorage.setItem('targetUser', JSON.stringify(props.owner));
      dispatch({ type: 'CHANGE_USER', payload: props.owner });
      const combinedId =
        currentUser.uid > props.owner.uid
          ? currentUser.uid + props.owner.uid
          : props.owner.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, 'chats', combinedId));

        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, 'chats', combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedId + '.userInfo']: {
              uid: props.owner.uid,
              displayName: props.owner.displayName,
              photoURL: props.owner.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });

          await updateDoc(doc(db, 'userChats', props.owner.uid), {
            [combinedId + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleSelect();
  }, [props.owner, currentUser]);

  const handleSend = async () => {
    if (currentUser) {
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

      if (location.pathname !== '/chat') {
        window.location.replace('/chat');
      }
    } else {
      window.location.replace('/login');
    }
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
