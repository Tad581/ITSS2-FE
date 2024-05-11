import { Box, Typography, Link } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  id: string;
  name: string;
  area: number;
  price: number;
  imageUrl: string;
  handleOpenDialog: () => void;
  handleSelectedRoomId: (roomId: string) => void;
  handleEditClick?: (roomId: string) => void;
}

export default function CreatedRooms(props: IProps) {
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
        src={
          props.imageUrl
            ? import.meta.env.VITE_BACKEND_URL + props.imageUrl
            : 'https://do84cgvgcm805.cloudfront.net/article/362/1200/25cf654358d7812a07902fa42f249dedbec8eb058bdda541c88b9e3b317a93d9.jpg'
        }
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
        <Link href={'/detail/' + props.id} sx={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: '#000',
            }}
          >
            {props.name}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          {props.area} m²
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
          {props.price} VNĐ/tháng
        </Typography>
      </Box>
      <Box sx={{ marginRight: 8 }}>
        <EditOutlinedIcon
          sx={{
            color: '#000',
            fontSize: 30,
            marginRight: 3,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (props?.handleEditClick)
              props.handleEditClick(props.id)
          }}
        />
        <DeleteIcon
          sx={{ color: '#ff0000', fontSize: 30, cursor: 'pointer' }}
          onClick={() => {
            props.handleOpenDialog();
            props.handleSelectedRoomId(props.id);
          }}
        />
      </Box>
    </Box>
  );
}
