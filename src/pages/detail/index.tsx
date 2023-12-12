import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Header from "../../layout/header";
import { Collapse } from '@mui/material';
import QuiltedImageList from "../../components/gallery/QuiltedImageList";
import RoomHeader from "../../components/detail/roomHeader";
import RoomInfoGrid from "../../components/detail/roomInfoGrid";
import RoomOwnerContact from "../../components/detail/roomOwnerContact";
import RatingMessageList from "../../components/detail/rating";
import OtherRoomList from "../../components/detail/otherRoomList";
import RoomAttribute from "../../components/detail/roomAttribute";
import { RoomAPI } from "../../api/roomAPI";
import { useEffect, useState } from "react";
import { IRoom } from "../../interfaces/room";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();

  const [roomData, setRoomData] = useState<IRoom | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const response = await RoomAPI.getOne(id)
      if (response && response.success) {
        setRoomData(response.data)
        console.log(response.data)
      }
    }
    fetchData().catch((error) => console.log(error));
  }, [id])


  return (
    <Box
      sx={{
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Header />

      <Container maxWidth="xl" sx={{ backgroundColor: "white", marginTop: 2, borderRadius: 2, padding: 4 }}>

        {/* title, subtitle */}
        <RoomHeader
          title={roomData ? roomData.name : ""} //"Charm M1.2, Flamingo Đà lạt"
          rating={5.0}
          reviewCount={25}
          location={roomData ? roomData.address : ""} //"Thanh Xuân, Hà Nội"
        />

        {/* image */}
        <Box>
          <QuiltedImageList
          itemData={roomData ? roomData.room_image.map(o => ({img: o.image_url, title: o.id.toString()})) : []}
          />
        </Box>

        {/* description */}
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, marginX: "auto", maxWidth: 1000 }}>
          <Box>
            {/*  */}
            <RoomInfoGrid
              electricPrice={roomData ? roomData.room_attribute?.electronic_price?.toString() + " / số" || "" : ""}
              waterPrice={roomData ? roomData.room_attribute?.water_price?.toString() + " / khối" || "" : ""}
              roomArea={roomData ? roomData.area : 0}
              hustDistance={roomData ? roomData?.distance_to_school.toString() + ' km' || '' : ''}
              bathroomType={roomData ? roomData?.room_attribute?.enclosed_toilet ? "Khép kín" : "Chung" : ""}
              roomType={roomData ? roomData?.type : ""}
              price={String(roomData ? roomData?.price : 0) + "đ"}
              location={roomData ? roomData?.address : ""}
            />

            {/* Rating */}
            <Typography variant="h4" component="h4" marginTop={4}>
              Nhận xét mới nhất:
            </Typography>
            <RatingMessageList />

            <Divider />


            <Typography variant="h4" component="h4" marginTop={4}>
              Chi tiết chỗ ở:
            </Typography>
            <Collapse in={true} timeout="auto"
              unmountOnExit>

              <Typography>Thông tin cá nhân</Typography>
              <Typography>Giá phòng đã bao gồm</Typography>
              <Typography>- Một phòng ngủ khép kín có đầy đủ đồ dùng</Typography>
            </Collapse>

            <Divider />

            <Typography variant="h4" component="h4" marginTop={4}>
              Tiện nghi:
            </Typography>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ maxWidth: "sm" }}>
              <RoomAttribute
                haveAirConditioner={roomData ? roomData?.room_attribute?.air_conditioner : false}
                haveFridge={roomData ? roomData?.room_attribute?.refrigerator : false}
                haveHeater={roomData ? roomData?.room_attribute?.water_heater : false}
                haveWashingMachine={roomData ? roomData?.room_attribute?.washing_machine : false}
                haveWifi={roomData ? roomData?.room_attribute?.wifi_internet : false}
                havePCCC={roomData ? roomData?.room_attribute?.safed_device : false}
              />
            </Grid>

            <Divider />

            <Typography variant="h4" component="h4" marginTop={4}>
              Địa chỉ:
            </Typography>
            <Typography variant="subtitle1" component="span">
              Thanh Xuân, Hà Nội
            </Typography>

            {/* map */}
            <Box sx={{ height: 400, width: '100%', marginTop: 4 }}>
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB-3JYr1Tq8LJ2eY9JYR7Xr2eG5J2q9J5c&q=Space+Needle,Seattle+WA"
              />
            </Box>

            <Divider />

            {/*  */}
          </Box>

          {/* Avatar */}
          <RoomOwnerContact />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 4, marginX: "auto", maxWidth: 1000 }}>

          {/* Other room */}
          <Typography variant="h4" component="h4" marginTop={4}>
            Phòng khác của chủ nhà:
          </Typography>
          <OtherRoomList />

        </Box>
        {/*  */}
      </Container>
    </Box>
  )
}
