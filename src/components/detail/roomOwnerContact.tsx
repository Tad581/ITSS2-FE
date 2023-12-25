import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Recommend from '../chat/recommend';

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
  const { username, avatar, role } = owner;

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
          <Avatar alt={username} src={avatar} sx={{ width: 56, height: 56 }} />
          <Box marginLeft={2}>
            <Typography variant='h6' color='blue'>
              {username}
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
          }}
          marginTop={2}
        >
          {recommendMessage.map((message, index) => {
            return <Recommend message={message} key={index} />;
          })}
        </Box>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
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
