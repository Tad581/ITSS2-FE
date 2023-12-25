/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext } from 'react';
import { Box, OutlinedInput, TextField, InputAdornment } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImg(null);
  };

  return (
    <Box
      sx={{
        height: '50px',
        backgroundColor: 'white',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid lightgray',
      }}
    >
      <OutlinedInput
        type='file'
        style={{ display: 'none' }}
        id='file'
        sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        onChange={(e: any) => setImg(e.target.files[0])}
      />
      <Box component='label' htmlFor='file' sx={{ marginRight: 1 }}>
        <AddCircleIcon sx={{ fontSize: '40px' }} />
      </Box>
      <TextField
        type='text'
        placeholder='Nhập tin nhắn'
        onChange={(e) => setText(e.target.value)}
        value={text}
        size='small'
        sx={{
          width: '100%',
          backgroundColor: 'lightgray',
          borderRadius: 2,
          '& fieldset': { border: 'none' },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SendIcon
                sx={{ cursor: 'pointer', color: '#000' }}
                onClick={handleSend}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Input;
