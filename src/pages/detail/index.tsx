import { Avatar, Box, Button, Card, Container, Divider, Grid, ImageList, ImageListItem, Rating, Typography } from "@mui/material";
import Header from "../../layout/header";
import Star from '@mui/icons-material/Star';
import { Collapse } from '@mui/material';
import QuiltedImageList from "../../components/gallery/QuiltedImageList";
import RoomHeader from "../../components/detail/roomHeader";
import RoomInfoGrid from "../../components/detail/roomInfoGrid";
import RoomOwnerContact from "../../components/detail/roomOwnerContact";
import RatingMessageList from "../../components/detail/rating";
import OtherRoomList from "../../components/detail/otherRoomList";
import RoomAttribute from "../../components/detail/roomAttribute";

export default function Detail() {
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
          title="Charm M1.2, Flamingo Đà lạt"
          rating={5.0}
          reviewCount={25}
          location="Thanh Xuân, Hà Nội"
        />

        {/* image */}
        <Box>
          <QuiltedImageList 
          // itemData={itemData}
          />
        </Box>

        {/* description */}
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, marginX: "auto", maxWidth: 1000 }}>
          <Box>
            {/*  */}
            <RoomInfoGrid/>

            {/* Rating */}
            <Typography variant="h4" component="h4" marginTop={4}>
              Nhận xét mới nhất:
            </Typography>
            <RatingMessageList/>

            <Divider />


            <Typography variant="h4" component="h4" marginTop={4}>
              Chi tiết chỗ ở:
            </Typography>
            <Collapse in={open} timeout="auto"
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
            <RoomAttribute/>
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
          <RoomOwnerContact/>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 4, marginX: "auto", maxWidth: 1000 }}>

            {/* Other room */}
            <Typography variant="h4" component="h4" marginTop={4}>
              Phòng khác của chủ nhà:
            </Typography>
            <OtherRoomList/>

        </Box>
        {/*  */}
      </Container>
    </Box>
  )
}
