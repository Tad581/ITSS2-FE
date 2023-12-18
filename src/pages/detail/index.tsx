import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Header from '../../layout/header';
import { Collapse } from '@mui/material';
import QuiltedImageList from '../../components/gallery/QuiltedImageList';
import RoomHeader from '../../components/detail/roomHeader';
import RoomInfoGrid from '../../components/detail/roomInfoGrid';
import RoomOwnerContact from '../../components/detail/roomOwnerContact';
import RatingMessageList from '../../components/detail/rating';
import OtherRoomList from '../../components/detail/otherRoomList';
import RoomAttribute from '../../components/detail/roomAttribute';
import { RoomAPI } from '../../api/roomAPI';
import { useEffect, useState, useMemo } from 'react';
import { IRoom } from '../../interfaces/room';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const { id } = useParams();

  const [roomData, setRoomData] = useState<IRoom>();
  const [ownerRoom, setOwnerRoom] = useState<IRoom[]>([]);

  const { rating, reviewCount }: { rating: number; reviewCount: number } =
    useMemo(() => {
      let totalRating = 0;
      if (roomData)
        roomData.review.forEach((data) => (totalRating += data.star));
      return {
        rating: roomData ? totalRating / roomData.review.length : 0,
        reviewCount: roomData ? roomData.review.length : 0,
      };
    }, [roomData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const response = await RoomAPI.getOne(parseInt(id));
      if (response?.success) {
        setRoomData(response.data);
      }
      const response2 = await RoomAPI.getOwnerRooms({
        owner_id: parseInt(response.data.owner_id),
      });
      if (response2?.success) {
        setOwnerRoom(response2.data);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [id]);

  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Header />

      <Container
        maxWidth={false}
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          paddingY: 4,
          paddingX: '60px!important',
        }}
      >
        {/* title, subtitle */}
        <RoomHeader
          title={roomData ? roomData.name : ''} //"Charm M1.2, Flamingo Đà lạt"
          rating={rating}
          reviewCount={reviewCount}
          location={roomData ? roomData.address : ''} //"Thanh Xuân, Hà Nội"
        />

        {/* image */}
        <Box>
          <QuiltedImageList
            itemData={
              roomData
                ? roomData.room_image.map((o) => ({
                    img: o.image_url,
                    title: o.id.toString(),
                  }))
                : []
            }
          />
        </Box>

        {/* description */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 4,
            marginX: 'auto',
            width: '100%',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {/*  */}
            <RoomInfoGrid
              electricPrice={
                roomData
                  ? roomData.room_attribute?.electronic_price?.toString() +
                      ' đ/số' || ''
                  : ''
              }
              waterPrice={
                roomData
                  ? roomData.room_attribute?.water_price?.toString() +
                      ' đ/khối' || ''
                  : ''
              }
              roomArea={roomData ? roomData.area : 0}
              hustDistance={
                roomData
                  ? roomData?.distance_to_school.toString() + 'km' || ''
                  : ''
              }
              bathroomType={
                roomData
                  ? roomData?.room_attribute?.enclosed_toilet
                    ? 'NVS riêng'
                    : 'NVS Chung'
                  : ''
              }
              roomType={roomData ? roomData?.type : ''}
              price={String(roomData ? roomData?.price : 0) + ' đ'}
              location={roomData ? roomData?.address : ''}
            />

            <Divider />

            <Box sx={{ marginY: 4 }}>
              {/* Rating */}
              <Typography variant='h4' component='h4'>
                Nhận xét mới nhất:
              </Typography>
              <RatingMessageList
                room_id={roomData?.id}
                reviewCount={reviewCount}
                rating={rating}
                messages={roomData?.review}
              />
            </Box>

            <Divider />

            <Box sx={{ marginY: 4 }}>
              <Typography variant='h4' component='h4'>
                Chi tiết chỗ ở:
              </Typography>
              <Collapse
                in={true}
                timeout='auto'
                unmountOnExit
                sx={{ marginTop: 2 }}
              >
                <Typography>{roomData?.room_attribute?.description}</Typography>
              </Collapse>
            </Box>

            <Divider />

            <Box sx={{ marginY: 4 }}>
              <Typography variant='h4' component='h4'>
                Tiện nghi:
              </Typography>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ maxWidth: 'sm' }}
              >
                <RoomAttribute
                  haveAirConditioner={
                    roomData ? roomData?.room_attribute?.air_conditioner : false
                  }
                  haveFridge={
                    roomData ? roomData?.room_attribute?.refrigerator : false
                  }
                  haveHeater={
                    roomData ? roomData?.room_attribute?.water_heater : false
                  }
                  haveWashingMachine={
                    roomData ? roomData?.room_attribute?.washing_machine : false
                  }
                  haveWifi={
                    roomData ? roomData?.room_attribute?.wifi_internet : false
                  }
                  havePCCC={
                    roomData ? roomData?.room_attribute?.safed_device : false
                  }
                />
              </Grid>
            </Box>

            <Divider />

            <Box sx={{ marginY: 4 }}>
              <Typography variant='h4' component='h4'>
                Địa chỉ:
              </Typography>
              <Typography variant='subtitle1' component='span'>
                Thanh Xuân, Hà Nội
              </Typography>
              {/* map */}
              <Box sx={{ height: 400, width: '100%' }}>
                <iframe
                  width='100%'
                  height='100%'
                  loading='lazy'
                  allowFullScreen
                  src='https://www.google.com/maps/embed/v1/place?key=AIzaSyB-3JYr1Tq8LJ2eY9JYR7Xr2eG5J2q9J5c&q=Space+Needle,Seattle+WA'
                />
              </Box>
            </Box>
          </Box>

          {/* Avatar */}
          <RoomOwnerContact />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 4,
            marginX: 'auto',
            width: '100%',
          }}
        >
          {/* Other room */}
          <Typography variant='h4' component='h4' marginTop={4}>
            Phòng khác của chủ nhà:
          </Typography>
          <OtherRoomList roomList={ownerRoom} />
        </Box>
        {/*  */}
      </Container>
    </Box>
  );
}
