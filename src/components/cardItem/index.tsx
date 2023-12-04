import { Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function CardItem() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component='img'
        src='https://do84cgvgcm805.cloudfront.net/article/362/1200/25cf654358d7812a07902fa42f249dedbec8eb058bdda541c88b9e3b317a93d9.jpg'
        sx={{
          objectFit: 'cover',
          borderRadius: 2,
          width: '100%',
          aspectRatio: '1 / 1',
        }}
      />
      <Box sx={{ width: '100%' }}>
        <Typography
          sx={{
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: '19.36px',
            marginTop: 1,
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Chung cư cao cấp
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19.36px',
            color: '#35E908',
            marginTop: 1,
          }}
        >
          Cách ĐH Back khoa 3.5km
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19.36px',
            marginTop: 1,
          }}
        >
          30 m²
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19.36px',
            display: 'flex',
            flexDiretion: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 1,
          }}
        >
          <LocationOnOutlinedIcon sx={{ marginRight: 1, fontSize: '16px' }} />
          Đống Đa, Hà Nội
        </Typography>
      </Box>
    </Box>
  );
}
