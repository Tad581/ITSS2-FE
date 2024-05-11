import { Grid, Typography } from "@mui/material";
import Home from "@mui/icons-material/HomeOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BathroomIcon from "@mui/icons-material/Bathroom";
import CropIcon from "@mui/icons-material/Crop";

type RoomInfoGridProps = {
  roomType: string;
  hustDistance: string;
  price: string;
  location: string;
  bathroomType: string;
  electricPrice: string;
  waterPrice: string;
  roomArea: number;
};

export default function RoomInfoGrid(props: RoomInfoGridProps) {
  const {
    roomType,
    hustDistance,
    price,
    location,
    bathroomType,
    electricPrice,
    waterPrice,
    roomArea,
  } = props;
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ maxWidth: "sm", marginBottom: 4 }}
    >
      <Item icon={Home}>
        {roomType === "Phong tro"
          ? "Nhà trọ"
          : roomType === "Chung cu mini"
          ? "Chung cư mini"
          : roomType === "Homestay"
          ? "Homestay"
          : ""}
      </Item>
      <Item icon={BathroomIcon}>{bathroomType}</Item>
      {/* <Item icon={MyLocationIcon}>Cách ĐHBKHN {hustDistance}</Item> */}
      <Item icon={ElectricBoltIcon}>
        {Intl.NumberFormat("vi-VN").format(parseInt(electricPrice)) + " đ/số"}
      </Item>
      <Item icon={LocalAtmIcon}>
        {Intl.NumberFormat("vi-VN").format(parseInt(price))  + " đ"}
      </Item>
      <Item icon={WaterDropIcon}>
        {Intl.NumberFormat("vi-VN").format(parseInt(waterPrice))  + " đ/khối"}
      </Item>
      <Item icon={LocationOnIcon}>{location}</Item>
      <Item icon={CropIcon}>{roomArea} m²</Item>
    </Grid>
  );
}

RoomInfoGrid.defaultProps = {
  roomType: "Chung cư mini",
  hustDistance: "3",
  price: "3tr / tháng",
  location: "Thanh Xuân, Hà Nội",
  bathroomType: "Nvs riêng",
  electricPrice: "3k / số",
  waterPrice: "13k / số",
  roomArea: 35,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Item(props: any) {
  const Icon = props.icon;
  return (
    <Grid
      item
      xs={6}
      display={"flex"}
      justifyContent={"start"}
      alignItems={"center"}
      paddingX={5}
      my={1}
    >
      {/* <Item>1</Item> */}
      <Icon sx={{ fontSize: 30 }}></Icon>
      {/* center text */}
      <Typography variant="subtitle1" component="span" ml={4}>
        {props.children}
      </Typography>
    </Grid>
  );
}
