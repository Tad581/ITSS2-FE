import { Box, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

interface IProps {
  handleDialogToggle: () => void;
}

export default function Filterbar(props: Readonly<IProps>) {
  return (
    <Box component='div' sx={{ marginTop: 2 }}>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginX: 3,
            cursor: 'pointer',
          }}
        >
          <Box
            component='img'
            src='/icons/house.png'
            sx={{ height: 40, width: 'auto' }}
          />
          <Typography
            component='p'
            sx={{
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30.26px',
              color: 'gray',
            }}
          >
            Nhà trọ
          </Typography>
        </Box>
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginX: 3,
            cursor: 'pointer',
          }}
        >
          <Box
            component='img'
            src='/icons/apart.png'
            sx={{ height: 40, width: 'auto' }}
          />
          <Typography
            component='p'
            sx={{
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30.26px',
              color: 'gray',
            }}
          >
            Chung cư
          </Typography>
        </Box>
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginX: 3,
            cursor: 'pointer',
          }}
        >
          <Box
            component='img'
            src='/icons/homestay.png'
            sx={{ height: 40, width: 'auto' }}
          />
          <Typography
            component='p'
            sx={{
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30.26px',
              color: 'gray',
            }}
          >
            HomeStay
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#DCDCDC',
            paddingY: 1,
            paddingX: 2,
            width: 'fit-content',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            position: 'absolute',
            top: '10%',
            right: '10%',
            cursor: 'pointer',
          }}
          onClick={props.handleDialogToggle}
        >
          <FilterAltOutlinedIcon sx={{ color: 'gray', marginRight: 1 }} />
          <Typography
            component='p'
            sx={{
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30.26px',
              color: 'gray',
            }}
          >
            Bộ lọc
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
