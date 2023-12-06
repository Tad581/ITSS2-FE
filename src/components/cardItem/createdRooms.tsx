import { Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export default function createdRooms() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 3,
      }}
    >
      <Box
        component='img'
        src='https://do84cgvgcm805.cloudfront.net/article/362/1200/25cf654358d7812a07902fa42f249dedbec8eb058bdda541c88b9e3b317a93d9.jpg'
        sx={{
          maxWidth: '10%',
          objectFit: 'cover',
          width: '100%',
          aspectRatio: '1 / 1',
          marginLeft: 8,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexGrow: 1,
          marginLeft: 5,
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
          Chung cư cao cấp khu Hai Bà Trưng
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>40 m²</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          5.000.000 VNĐ/tháng
        </Typography>
      </Box>
      <Box sx={{ marginRight: 8 }}>
        <EditOutlinedIcon sx={{ color: '#000', fontSize: 30, marginRight: 3 }} />
        <DeleteIcon sx={{ color: '#ff0000', fontSize: 30 }} />
      </Box>
    </Box>
  );
}
