import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Recommend from '../chat/recommend';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { username, role } = owner;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ownerReal, setOwnerReal] = useState<any>();

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
