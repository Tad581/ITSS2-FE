import {
  Box,
  Dialog,
  DialogTitle,
  // DialogActions,
  IconButton,
  Typography,
  Divider,
  OutlinedInput,
  InputAdornment,
  Slider,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingBottom: 20,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    maxWidth: 'none',
  },
}));

interface DialogTitleProps {
  id: string;
  onClose: () => void;
  children?: React.ReactNode;
}

interface IProps {
  handleClose: () => void;
  open: boolean;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} maxWidth={'none'}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function valuetextPrice(value: number) {
  return `${value} VNĐ`;
}

export default function FilterDialog(props: IProps) {
  const [prices, setPrices] = useState<number[]>([0, 10000]);
  const [distances, setDistance] = useState<number[]>([20, 37]);

  const handleChangePrice = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrices([Math.min(newValue[0], prices[1] - 500), prices[1]]);
    } else {
      setPrices([prices[0], Math.max(newValue[1], prices[0] + 500)]);
    }
  };

  const handleChangeDistance = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setDistance([Math.min(newValue[0], distances[1] - 500), distances[1]]);
    } else {
      setDistance([distances[0], Math.max(newValue[1], distances[0] + 500)]);
    }
  };

  return (
    <BootstrapDialog
      aria-labelledby='customized-dialog-title'
      open={props.open}
      onClose={props.handleClose}
    >
      <BootstrapDialogTitle
        id='customized-dialog-title'
        onClose={props.handleClose}
      >
        <Typography
          sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}
        >
          Bộ lọc
        </Typography>
      </BootstrapDialogTitle>
      <Divider />
      <Box sx={{ paddingY: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              alignSelf: 'start',
              marginLeft: 1,
            }}
          >
            Khoảng giá
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ marginX: 1 }}>
              <OutlinedInput
                id='price-start'
                endAdornment={
                  <InputAdornment position='end'>VNĐ</InputAdornment>
                }
                type='number'
              />
            </Box>
            <Box sx={{ marginX: 1 }}>
              <OutlinedInput
                id='price-end'
                endAdornment={
                  <InputAdornment position='end'>VNĐ</InputAdornment>
                }
                type='number'
              />
            </Box>
          </Box>
          <Box sx={{ width: '95%', marginX: 1, marginTop: 1 }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={prices}
              onChange={handleChangePrice}
              valueLabelDisplay='auto'
              getAriaValueText={valuetextPrice}
              disableSwap
              min={0}
              step={1000}
              max={10000}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              alignSelf: 'start',
              marginLeft: 1,
            }}
          >
            Khoảng cách đến ĐH Báck khoa
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ marginX: 1 }}>
              <OutlinedInput
                id='distance-start'
                endAdornment={
                  <InputAdornment position='end'>km</InputAdornment>
                }
                type='number'
              />
            </Box>
            <Box sx={{ marginX: 1 }}>
              <OutlinedInput
                id='distance-end'
                endAdornment={
                  <InputAdornment position='end'>km</InputAdornment>
                }
                type='number'
              />
            </Box>
          </Box>
          <Box sx={{ width: '95%', marginX: 1, marginTop: 1 }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={distances}
              onChange={handleChangeDistance}
              valueLabelDisplay='auto'
              getAriaValueText={valuetextPrice}
              disableSwap
            />
          </Box>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              alignSelf: 'start',
              marginLeft: 1,
            }}
          >
            Diện tích phòng
          </Typography>
          <Box></Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              alignSelf: 'start',
              marginLeft: 1,
            }}
          >
            Loại phòng
          </Typography>
          <Box></Box>
        </Box> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              alignSelf: 'start',
              marginLeft: 1,
            }}
          >
            Tiện nghi
          </Typography>
          <FormGroup>
            <Grid container>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Wifi/internet'
                  sx={{ marginLeft: 1 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Điều hòa'
                  sx={{ marginLeft: 1, marginRight: -5 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Bình nóng lạnh'
                  sx={{ marginLeft: 1, marginRight: -5 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Tủ lạnh'
                  sx={{ marginLeft: 1 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='Máy giặt'
                  sx={{ marginLeft: 1, marginRight: -5 }}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: 1,
            marginTop: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              marginLeft: 1,
            }}
          >
            Giá điện
          </Typography>
          <Box>
            <OutlinedInput
              id='electronic-start'
              type='number'
              sx={{ marginRight: 1 }}
              size={'small'}
            />
            -
            <OutlinedInput
              id='electronic-end'
              type='number'
              sx={{ marginLeft: 1, marginRight: 1 }}
              size={'small'}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: 1,
            marginTop: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              color: 'black',
              marginBottom: 1,
              alignSelf: 'start',
              marginLeft: 1,
            }}
          >
            Giá nước
          </Typography>
          <Box>
            <OutlinedInput
              id='water-start'
              type='number'
              sx={{ marginRight: 1 }}
              size={'small'}
            />
            -
            <OutlinedInput
              id='water-end'
              type='number'
              sx={{ marginLeft: 1, marginRight: 1 }}
              size={'small'}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingY: 2,
        }}
      >
        <Button
          variant='contained'
          sx={{ backgroundColor: 'gray', borderRadius: 5, color: '#000', width: '22%' }}
        >
          Xóa bộ lọc
        </Button>
        <Button variant='contained' sx={{ borderRadius: 5, width: '22%'  }}>
          Tìm kiếm
        </Button>
      </Box>
    </BootstrapDialog>
  );
}
