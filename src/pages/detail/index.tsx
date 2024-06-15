import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Header from "../../layout/header";
import { Collapse } from "@mui/material";
import QuiltedImageList from "../../components/gallery/QuiltedImageList";
import RoomHeader from "../../components/detail/roomHeader";
import RoomInfoGrid from "../../components/detail/roomInfoGrid";
import RoomOwnerContact from "../../components/detail/roomOwnerContact";
import RatingMessageList from "../../components/detail/rating";
import OtherRoomList from "../../components/detail/otherRoomList";
import RoomAttribute from "../../components/detail/roomAttribute";
import { RoomAPI } from "../../api/roomAPI";
import { useEffect, useState, useMemo } from "react";
import { IRoom } from "../../interfaces/room";
import { useParams } from "react-router-dom";
import MapContainer from "../../components/map";

export default function Detail() {
  const { id } = useParams();

  const [roomData, setRoomData] = useState<IRoom>();
  const [ownerRoom, setOwnerRoom] = useState<IRoom[]>([]);

  const { rating, reviewCount }: { rating: number; reviewCount: number } =
    useMemo(() => {
      let totalRating = 0;
      if (roomData?.reviews)
        roomData.reviews.forEach((data) => (totalRating += data.star));
      return {
        rating: roomData ? totalRating / roomData.reviews.length : 0,
        reviewCount: roomData ? roomData.reviews.length : 0,
      };
    }, [roomData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const response = await RoomAPI.getOne(id);
      if (response.message === "Success") {
        setRoomData(response.data);
      }
      const response2 = await RoomAPI.getOwnerRooms({
        romOwnerId: response.data.romOwnerId,
      });
      if (response2.message === "Success") {
        setOwnerRoom(response2.data);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [id]);

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        backgroundColor: "#EEEDEB",
      }}
    >
      <Header />

      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          paddingY: 4,
          paddingX: "60px!important",
        }}
      >
        {/* Title and Subtitle */}
        <RoomHeader
          title={roomData ? roomData.name : ""}
          rating={rating}
          reviewCount={reviewCount}
          location={roomData ? roomData.address : ""}
        />

        {/* Image Gallery */}
        <Box>
          <QuiltedImageList
            itemData={
              roomData
                ? roomData.roomImages?.map((o) => ({
                    img: import.meta.env.VITE_BACKEND_URL + o.imageUrl,
                    title: o.id.toString(),
                  }))
                : []
            }
          />
        </Box>

        {/* Description and Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
            marginX: "auto",
            width: "100%",
            gap: 11,
          }}
        >
          <Box sx={{ flexGrow: 1, maxWidth: "60%" }}>
            <RoomInfoGrid
              electricPrice={
                roomData
                  ? roomData.roomAttribute?.electronicPrice?.toString() || ""
                  : ""
              }
              waterPrice={
                roomData
                  ? roomData.roomAttribute?.waterPrice?.toString() || ""
                  : ""
              }
              roomArea={roomData ? roomData.area : 0}
              bathroomType={
                roomData
                  ? roomData?.roomAttribute?.enclosedToilet
                    ? "NVS riêng"
                    : "NVS Chung"
                  : ""
              }
              roomType={roomData ? roomData?.type : ""}
              price={String(roomData ? roomData?.price : 0)}
              location={roomData ? roomData?.address : ""}
            />

            <Divider />

            {/* Ratings */}
            <Box sx={{ marginY: 4 }}>
              <Typography variant="h4" component="h4">
                Nhận xét mới nhất:
              </Typography>
              <RatingMessageList
                roomId={roomData?.roomId}
                reviewCount={reviewCount}
                rating={rating}
                messages={roomData?.reviews}
              />
            </Box>

            <Divider />

            {/* Room Details */}
            <Box sx={{ marginY: 4 }}>
              <Typography variant="h4" component="h4">
                Chi tiết chỗ ở:
              </Typography>
              <Collapse
                in={true}
                timeout="auto"
                unmountOnExit
                sx={{ marginTop: 2 }}
              >
                <Typography>{roomData?.roomAttribute?.description}</Typography>
              </Collapse>
            </Box>

            <Divider />

            {/* Amenities */}
            <Box sx={{ marginY: 4 }}>
              <Typography variant="h4" component="h4">
                Tiện nghi:
              </Typography>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ maxWidth: "sm" }}
              >
                <RoomAttribute
                  haveAirConditioner={
                    roomData?.roomAttribute
                      ? roomData.roomAttribute.airConditioner
                      : false
                  }
                  haveFridge={
                    roomData?.roomAttribute
                      ? roomData.roomAttribute.refrigerator
                      : false
                  }
                  haveHeater={
                    roomData?.roomAttribute
                      ? roomData.roomAttribute.waterHeater
                      : false
                  }
                  haveWashingMachine={
                    roomData?.roomAttribute
                      ? roomData.roomAttribute.washingMachine
                      : false
                  }
                  haveWifi={
                    roomData?.roomAttribute
                      ? roomData.roomAttribute.wifiInternet
                      : false
                  }
                  havePCCC={
                    roomData?.roomAttribute
                      ? roomData.roomAttribute.safedDevice
                      : false
                  }
                />
              </Grid>
            </Box>

            <Divider />

            {/* Address and Map */}
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h4" component="h4">
                Địa chỉ:
              </Typography>
              <Typography variant="subtitle1" component="span">
                {roomData?.address}
              </Typography>
              <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
                <MapContainer address={roomData?.address} />
              </Box>
            </Box>
          </Box>

          {/* Owner Contact */}
          {roomData?.user && <RoomOwnerContact owner={roomData?.user} />}
        </Box>

        {/* Other Rooms from the Same Owner */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 4,
            marginX: "auto",
            width: "100%",
          }}
        >
          <Typography variant="h4" component="h4">
            Phòng khác của chủ nhà:
          </Typography>
          <OtherRoomList roomList={ownerRoom} />
        </Box>
      </Container>
    </Box>
      );
}