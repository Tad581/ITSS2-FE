import { Grid, Typography } from "@mui/material";
import Home from '@mui/icons-material/HomeOutlined';


type RoomInfoGridProps = {
  roomType: string;
  hustDistance: string;
  price: string;
  location: string;
  bathroomType: string;
  electricPrice: string;
  waterPrice: string;
  roomArea: number;
}

export default function RoomInfoGrid(props: RoomInfoGridProps) {
  const { roomType, hustDistance, price, location, bathroomType, electricPrice, waterPrice, roomArea } = props
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ maxWidth: "sm" }}>
      <Item icon={Home}>{roomType}</Item>
      <Item icon={Home}>{bathroomType}</Item>
      <Item icon={Home}>Cách ĐHBKHN {hustDistance}</Item>
      <Item icon={Home}>{electricPrice}</Item>
      <Item icon={Home}>{price}</Item>
      <Item icon={Home}>{waterPrice}</Item>
      <Item icon={Home}>{location}</Item>
      <Item icon={Home}>{roomArea}m2</Item>
    </Grid>
  )
}

RoomInfoGrid.defaultProps = {
  roomType: "Chung cư mini",
  hustDistance: "3km",
  price: "3tr / tháng",
  location: "Thanh Xuân, Hà Nội",
  bathroomType: "Nvs riêng",
  electricPrice: "3k / số",
  waterPrice: "13k / số",
  roomArea: 35
}

function Item(props: any) {
  const Icon = props.icon
  return (
    <Grid item xs={6} display={'flex'} justifyContent={'start'} alignItems={'center'} paddingX={5} my={1}>
      {/* <Item>1</Item> */}
      <Icon sx={{ fontSize: 30 }}></Icon>
      {/* center text */}
      <Typography variant="subtitle1" component="span" ml={4}>
        {props.children}
      </Typography>
    </Grid>
  )
}