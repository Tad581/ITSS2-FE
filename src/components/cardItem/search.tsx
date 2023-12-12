import { Box, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Link from '@mui/material/Link';

interface IProps {
  id: number;
  name: string;
  room_image: string;
  distance_to_school: number;
  area: number;
  address: string;
}

export default function CardItem(props: IProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        component='img'
        src={
          props.room_image
            ? props.room_image
            : 'https://do84cgvgcm805.cloudfront.net/article/362/1200/25cf654358d7812a07902fa42f249dedbec8eb058bdda541c88b9e3b317a93d9.jpg'
        }
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
            marginY: 1,
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Link href={"/detail/"+props.id}>
            {props.name}
          </Link>
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#35E908',
          }}
        >
          Cách ĐH Back khoa {props.distance_to_school}km
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
          }}
        >
          {props.area} m²
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <LocationOnOutlinedIcon sx={{ marginRight: 1, fontSize: '16px' }} />
          {props.address}
        </Typography>
      </Box>
    </Box>
  );
}
