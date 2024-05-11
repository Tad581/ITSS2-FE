import { Box, Card, Link, Typography, Grid } from '@mui/material';
import { IRoom } from '../../interfaces/room';
import MyLocationIcon from '@mui/icons-material/MyLocation';

type OtherRoomListProps = {
  roomList: IRoom[];
};

export default function OtherRoomList(props: OtherRoomListProps) {
  const { roomList } = props;

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        py: 1,
        width: '100%',
      }}
    >
      {roomList.length > 0
        ? roomList.length > 4
          ? roomList.slice(0, 4).map((room) => {
              return (
                <Grid item sm={3} key={room.id}>
                  <RoomCard {...room}></RoomCard>
                </Grid>
              );
            })
          : roomList.map((room) => {
              return (
                <Grid item sm={3} key={room.id}>
                  <RoomCard {...room}></RoomCard>
                </Grid>
              );
            })
        : 'Không có dữ liệu'}
    </Grid>
  );
}

function RoomCard(props: IRoom) {
  return (
    <Card
      variant='outlined'
      sx={{
        border: 'none',
        marginX: 1,
      }}
    >
      <Link href={'/detail/' + props.id} sx={{ textDecoration: 'none' }}>
        <Box
          component='img'
          sx={{
            width: '100%',
            height: 200,
            marginBottom: 1,
            objectFit: 'cover',
          }}
          alt='The house from the offer.'
          src={import.meta.env.VITE_BACKEND_URL + props.roomImages[0]?.imageUrl}
        />
      </Link>
      <Box>
        <Link href={'/detail/' + props.id} sx={{ textDecoration: 'none' }}>
          <Typography
            variant='body2'
            sx={{
              color: '#000',
              fontSize: 16,
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {props.name}
          </Typography>
        </Link>
        <Typography>
          {Intl.NumberFormat('vi-VN').format(props.price)}/tháng
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 700 }}
        >
          {/* <MyLocationIcon sx={{ marginRight: 1, color: 'green' }} /> Cách ĐHBKHN{' '}
          {props.distance_to_school}km */}
        </Typography>
      </Box>
    </Card>
  );
}
