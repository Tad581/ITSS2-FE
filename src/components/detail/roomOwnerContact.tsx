/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Recommend from '../chat/recommend';
import { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';

const recommendMessage = [
  'Anh chị có onl k ạ?',
  'Thời hạn thuê tối đa là bao lâu',
];

interface IOwner {
  id: number;
  username: string;
  avatar?: string;
  role?: string;
}

export default function RoomOwnerContact({
  owner,
}: Readonly<{ owner: IOwner }>) {
  const { username, role } = owner;
  const [ownerReal, setOwnerReal] = useState<any>();

  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);

  const handleGoChat = async () => {
    if (ownerReal) {
      localStorage.setItem('targetUser', JSON.stringify(ownerReal));
      dispatch({ type: 'CHANGE_USER', payload: ownerReal });
      const combinedId =
        currentUser.uid > ownerReal.uid
          ? currentUser.uid + ownerReal.uid
          : ownerReal.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, 'chats', combinedId));

        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, 'chats', combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedId + '.userInfo']: {
              uid: ownerReal.uid,
              displayName: ownerReal.displayName,
              photoURL: ownerReal.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });

          await updateDoc(doc(db, 'userChats', ownerReal.uid), {
            [combinedId + '.userInfo']: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + '.date']: serverTimestamp(),
          });
        }

        window.location.replace('/chat');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const getOwner = async () => {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', username)
      );

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setOwnerReal(doc.data());
        });
      } catch (err) {
        console.log(
          '🚀 ~ file: roomOwnerContact.tsx:52 ~ handleSearch ~ err:',
          err
        );
      }
    };
    if (username) getOwner();
  }, [username]);

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderRadius: 4,
          position: 'sticky',
          top: 30,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: 2,
          }}
        >
          <Avatar
            alt={username}
            src={ownerReal?.photoURL}
            sx={{ width: 56, height: 56 }}
          />
          <Box marginLeft={2}>
            <Typography variant='h6' color='blue'>
              {ownerReal?.displayName}
            </Typography>
            <Typography variant='subtitle1'>
              {role === 'OWNER' ? 'Chủ nhà' : 'Khách'}
            </Typography>
          </Box>
        </Box>
        <Divider light />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 1,
          }}
          marginTop={2}
        >
          {recommendMessage.map((message, index) => {
            return (
              <Recommend message={message} key={index} owner={ownerReal} />
            );
          })}
        </Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={2}
        >
          <Button
            variant='contained'
            color='success'
            sx={{ borderRadius: 2, margin: 1 }}
            onClick={handleGoChat}
          >
            Chat với người bán
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

RoomOwnerContact.defaultProps = {
  owner: {
    id: 0,
    name: 'Duy Trọng',
    avatar: '/static/images/avatar/1.jpg',
    role: 'Chủ nhà',
  },
};
