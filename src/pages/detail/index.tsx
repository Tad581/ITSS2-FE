import { Avatar, Box, Button, Container, Divider, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import Header from "../../layout/header";
import Star from '@mui/icons-material/Star';
import Home from '@mui/icons-material/HomeOutlined';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


function Item(props: any) {
  const Icon = props.icon
  return (
    <Grid item xs={6} display={'flex'} justifyContent={'space-between'} alignItems={'center'} paddingX={10}>
      {/* <Item>1</Item> */}
      <Icon sx={{ fontSize: 30 }}></Icon>
      {/* center text */}
      <Typography variant="subtitle1" component="span">
        {props.children}
      </Typography>
    </Grid>
  )
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

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
        <Typography variant="h4" component="h4">
          Charm M1.2, Flamingo Đà lạt
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="subtitle1" component="span" marginRight={4}>
            <Star sx={{ color: "yellow", fontSize: 16 }} ></Star>
            5.0 (25 đánh giá)
          </Typography>
          <Typography variant="subtitle1" component="span">
            Thanh Xuân, Hà Nội
          </Typography>
        </Box>

        {/* image */}
        <Box>
          <ImageList
            sx={{ width: 1000, height: 500, margin: "auto", marginTop: 4, borderRadius: 4 }}
            variant="quilted"
            cols={4}
            rowHeight={248}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        {/* description */}
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 4, marginX: "auto", maxWidth: 1000 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ maxWidth: "sm" }}>
            <Item icon={Home}>Chung cư mini</Item>
            <Item icon={Home}>Nvs riêng</Item>
            <Item icon={Home}>Cách ĐHBKHN 3km</Item>
            <Item icon={Home}>3k / số </Item>
            <Item icon={Home}>Thanh Xuân, Hà Nội</Item>
            <Item icon={Home}>35m2</Item>
          </Grid>
          <Box sx={{ border: 1, padding: 2, borderRadius: 4, width: 500 }}>
            <Box display={"flex"} flexDirection={"row"}>
              <Avatar
                alt="Duy Trọng"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <Box marginLeft={2}>
                <Typography variant="h6" color="blue">Duy Trọng</Typography>
                <Typography variant="subtitle1">Môi giới</Typography>
              </Box>
            </Box>
            <Divider light />
            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} marginTop={2}>
              <Button variant="contained" color="inherit" sx={{maxHeight: '30px', borderRadius: 100, margin: 1}}>Anh chị có onl k ạ?</Button>
              <Button variant="contained" color="inherit" sx={{maxHeight: '30px', borderRadius: 100, margin: 1}}>Thời hạn thuê tối đa là bao lâu</Button>
            </Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Button variant="contained" color="success" sx={{borderRadius: 2, margin: 1}}>Chat với người bán</Button>
            </Box>
          </Box>
        </Box>
        {/*  */}
      </Container>
    </Box>
  )
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
];