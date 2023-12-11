import { Avatar, Box, Button, Card, Container, Divider, Grid, ImageList, ImageListItem, Rating, Typography } from "@mui/material";
import Header from "../../layout/header";
import Star from '@mui/icons-material/Star';
import Home from '@mui/icons-material/HomeOutlined';
import { Collapse } from '@mui/material';
import { AspectRatio } from "@mui/icons-material";
import ImageIcon from '@mui/icons-material/Image';

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

function Comment() {
  return (
    <Box sx={{ border: 1, padding: 2, borderRadius: 4, minWidth: 400, }}>
      <Box display={"flex"} flexDirection={"row"}>
        <Avatar
          alt="Duy Trọng"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 56, height: 56 }}
        />
        <Box marginLeft={2}>
          <Typography variant="h6" color="blue">Duy Trọng</Typography>
          <Typography variant="subtitle1">16:15 05/09/2023</Typography>
        </Box>
      </Box>
      <Divider light />
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} marginTop={2}>
        <Typography variant="subtitle1">Chủ nhà đẹp trai, dễ thương, cảm ơn ""</Typography>
      </Box>
    </Box>
  )
}

function HomeCard() {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 300, width: 300, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 2, border: 'none' }}>
      {/* <AspectRatio> */}
      {/* <div>
          <ImageIcon sx={{ fontSize: '3rem', opacity: 0.2}} />
        </div> */}
      <Box
        component="img"
        sx={{
          height: 300,
          width: 300,
          // maxHeight: { xs: 300, md: 167 },
          // maxWidth: { xs: 300, md: 250 },
          marginBottom: 1
        }}
        alt="The house from the offer."
        src="https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg"
      />
      {/* </AspectRatio> */}
      <div>
        <Typography variant="body2">Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây</Typography>
        <Typography variant="subtitle1">Cách ĐHBKHN 300m</Typography>
      </div>
    </Card>
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
          <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ maxWidth: "sm" }}>
              <Item icon={Home}>Chung cư mini</Item>
              <Item icon={Home}>Nvs riêng</Item>
              <Item icon={Home}>Cách ĐHBKHN 3km</Item>
              <Item icon={Home}>3k / số </Item>
              <Item icon={Home}>Thanh Xuân, Hà Nội</Item>
              <Item icon={Home}>35m2</Item>
              <Item icon={Home}>35m2</Item>
              <Item icon={Home}>35m2</Item>
            </Grid>

            {/* Rating */}
            <Typography variant="h4" component="h4" marginTop={4}>
              Nhận xét mới nhất:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
                5.0 /<span style={{ fontSize: 16, fontWeight: 400 }}>5.0</span>
                <Rating name="read-only" value={3.5} readOnly sx={{ marginX: 2 }} />
              </Typography>
              <Button variant="text" color="inherit" >
                Đọc tất cả đánh giá
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="subtitle1" component="span">
                25 đánh giá
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                overflow: 'auto',
                width: 600,
                scrollSnapType: 'x mandatory',
                '& > *': {
                  scrollSnapAlign: 'center',
                },
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
            </Box>

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
              <Item icon={Home}>Chung cư mini</Item>
              <Item icon={Home}>Nvs riêng</Item>
              <Item icon={Home}>Cách ĐHBKHN 3km</Item>
              <Item icon={Home}>3k / số </Item>
              <Item icon={Home}>Thanh Xuân, Hà Nội</Item>
              <Item icon={Home}>35m2</Item>
              <Item icon={Home}>35m2</Item>
              <Item icon={Home}>35m2</Item>
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
          <Box sx={{ maxWidth: 360 }}>
            <Box sx={{ border: 1, padding: 2, borderRadius: 4 }}>
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
                <Button variant="contained" color="inherit" sx={{ maxHeight: '30px', borderRadius: 100, margin: 1 }}>Anh chị có onl k ạ?</Button>
                <Button variant="contained" color="inherit" sx={{ maxHeight: '30px', borderRadius: 100, margin: 1 }}>Thời hạn thuê tối đa là bao lâu</Button>
              </Box>
              <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Button variant="contained" color="success" sx={{ borderRadius: 2, margin: 1 }}>Chat với người bán</Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: 4, marginX: "auto", maxWidth: 1000 }}>



            {/* Other room */}
            <Typography variant="h4" component="h4" marginTop={4}>
              Phòng khác của chủ nhà:
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                overflow: 'auto',
                width: 1000,
                scrollSnapType: 'x mandatory',
                '& > *': {
                  scrollSnapAlign: 'center',
                },
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <HomeCard></HomeCard>
              <HomeCard></HomeCard>
              <HomeCard></HomeCard>
              <HomeCard></HomeCard>
              <HomeCard></HomeCard>
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