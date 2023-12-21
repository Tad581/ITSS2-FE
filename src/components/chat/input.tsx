import { useState } from 'react';
import { Box, OutlinedInput, Button } from '@mui/material';
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState('');
  // const [img, setImg] = useState(null);

  // const { currentUser } = useContext(AuthContext);
  // const { data } = useContext(ChatContext);

  // const handleSend = async () => {
  //   if (img) {
  //     const storageRef = ref(storage, uuid());

  //     const uploadTask = uploadBytesResumable(storageRef, img);

  //     uploadTask.on(
  //       (error) => {
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           await updateDoc(doc(db, "chats", data.chatId), {
  //             messages: arrayUnion({
  //               id: uuid(),
  //               text,
  //               senderId: currentUser.uid,
  //               date: Timestamp.now(),
  //               img: downloadURL,
  //             }),
  //           });
  //         });
  //       }
  //     );
  //   } else {
  //     await updateDoc(doc(db, "chats", data.chatId), {
  //       messages: arrayUnion({
  //         id: uuid(),
  //         text,
  //         senderId: currentUser.uid,
  //         date: Timestamp.now(),
  //       }),
  //     });
  //   }

  //   await updateDoc(doc(db, "userChats", currentUser.uid), {
  //     [data.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [data.chatId + ".date"]: serverTimestamp(),
  //   });

  //   await updateDoc(doc(db, "userChats", data.user.uid), {
  //     [data.chatId + ".lastMessage"]: {
  //       text,
  //     },
  //     [data.chatId + ".date"]: serverTimestamp(),
  //   });

  //   setText("");
  //   setImg(null);
  // };

  return (
    <Box
      sx={{
        height: '50px',
        backgroundColor: 'white',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <OutlinedInput
        type='text'
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
        sx={{
          width: '100%',
          border: 'none',
          outline: 'none',
          color: '#2f2d52',
          fontSize: '18px',
          '&::placeholder': {
            color: 'lightgray',
          },
        }}
      />
      <Box
        className='send'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Box
          component='img'
          src='/attach.png'
          alt=''
          sx={{
            height: '24px',
            cursor: 'pointer',
          }}
        />
        <OutlinedInput
          type='file'
          style={{ display: 'none' }}
          id='file'
          sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          // onChange={(e) => setImg(e.target.files[0])}
        />
        <Box component='label' htmlFor='file'>
          <Box component='img' src='/img.png' alt='' />
        </Box>
        <Button
          // onClick={handleSend}
          sx={{
            border: 'none',
            padding: '10px 15px',
            color: 'white',
            backgroundColor: '#8da4f1',
            cursor: 'pointer',
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Input;
