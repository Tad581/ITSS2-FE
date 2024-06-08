import {
  Box,
  Dialog,
  DialogTitle,
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
import CustomCheckbox from './customCheckbox';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import { ERoomType } from '../../../interfaces/room';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleParams: (param: any) => void;
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

function valuetextArea(value: number) {
  return `${value} m²`;
}

const minPriceRange = 100000;
const minAreaRange = 1;
const minPrice = 0;
const maxPrice = 20000000;
const minArea = 0;
const maxArea = 500;

export default function FilterDialog(props: Readonly<IProps>) {
  const [prices, setPrices] = useState<number[]>([minPrice, maxPrice]);
  const [areas, setAreas] = useState<number[]>([minArea, maxArea]);

  const [type, setTypes] = useState<{
    house: boolean;
    apartment: boolean;
    homestay: boolean;
  }>({ house: false, apartment: false, homestay: false });

  const [advances, setAdvances] = useState({
    wifiInternet: false,
    airConditioner: false,
    waterHeater: false,
    refrigerator: false,
    washingMachine: false,
  });

  const [electronicPrice, setElectronicPrice] = useState<number[]>([0, 0]);
  const [waterPrice, setWaterPrice] = useState<number[]>([0, 0]);

  const handlePickTypes = (value: string) => {
    if (value === "house") {
      setTypes({ house: !type.house, apartment: false, homestay: false });
    } else if (value === "apartment") {
      setTypes({ house: false, apartment: !type.apartment, homestay: false });
    } else if (value === "homestay") {
      setTypes({ homestay: !type.homestay, apartment: false, house: false });
    }
  };

  const handleChangePrice = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    console.log('🚀 ~ file: index.tsx:83 ~ FilterDialog ~ event:', event);
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPrices([Math.min(newValue[0], prices[1] - minPriceRange), prices[1]]);
    } else {
      setPrices([prices[0], Math.max(newValue[1], prices[0] + minPriceRange)]);
    }
  };

  const handleChangeArea = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    console.log('🚀 ~ file: index.tsx:83 ~ FilterDialog ~ event:', event);
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setAreas([Math.min(newValue[0], areas[1] - minAreaRange), areas[1]]);
    } else {
      setAreas([areas[0], Math.max(newValue[1], areas[0] + minAreaRange)]);
    }
  };

  const handleSubmit = () => {
    let typeValue: string = "";
    // const typesArray: string[] = [];
    // if (types.house) {
    //   typesArray.push('PHONGTRO');
    // }
    // if (types.apartment) {
    //   typesArray.push('CCMN');
    // }
    // if (types.homestay) {
    //   typesArray.push('Homestay');
    // }

    // if (typesArray.length === 3) {
    //   typesArray.pop();
    //   typesArray.pop();
    //   typesArray.pop();
    // }
    if (type.house) {
      typeValue = ERoomType.PHONGTRO;
    } else if (type.apartment) {
      typeValue = ERoomType.CCMN;
    } else if (type.homestay) {
      typeValue = ERoomType.Homestay;
    } else if (
      type.house === false &&
      type.apartment === false &&
      type.homestay === false
    )
      typeValue = "";

    props.handleParams({
      type: typeValue,
      area_from: areas[0],
      area_to: areas[1],
      price_from: prices[0],
      price_to: prices[1],
      electronicPrice_from: electronicPrice[0],
      electronicPrice_to: electronicPrice[1],
      waterPrice_from: waterPrice[0],
      waterPrice_to: waterPrice[1],
      wifiInternet: advances.wifiInternet,
      airConditioner: advances.airConditioner,
      waterHeater: advances.waterHeater,
      refrigerator: advances.refrigerator,
      washingMachine: advances.washingMachine,
    });
    props.handleClose();
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
                value={prices[0]}
                disabled
              />
            </Box>
            <Box sx={{ marginX: 1 }}>
              <OutlinedInput
                id='price-end'
                endAdornment={
                  <InputAdornment position='end'>VNĐ</InputAdornment>
                }
                type='number'
                value={prices[1]}
                disabled
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
              min={minPrice}
              step={minPriceRange}
              max={maxPrice}
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
            Diện tích phòng
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
                id='area-start'
                endAdornment={
                  <InputAdornment position='end'>m²</InputAdornment>
                }
                type='number'
                value={areas[0]}
                disabled
              />
            </Box>
            <Box sx={{ marginX: 1 }}>
              <OutlinedInput
                id='area-end'
                endAdornment={
                  <InputAdornment position='end'>m²</InputAdornment>
                }
                type='number'
                value={areas[1]}
                disabled
              />
            </Box>
          </Box>
          <Box sx={{ width: '95%', marginX: 1, marginTop: 1 }}>
            <Slider
              getAriaLabel={() => 'Area range'}
              value={areas}
              onChange={handleChangeArea}
              valueLabelDisplay='auto'
              getAriaValueText={valuetextArea}
              disableSwap
              min={minArea}
              step={minAreaRange}
              max={maxArea}
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
            Loại phòng
          </Typography>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            spacing={3}
          >
            <Grid
              item
              xs={4}
              sx={{ marginRight: -1 }}
              onClick={() => handlePickTypes('house')}
            >
              {type.house ? (
                <CustomCheckbox
                  icon={
                    <HomeOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} />
                  }
                  title='Nhà trọ'
                  backgroundColor='#40A578'
                  color='#fff'
                  fontSize='16px'
                  fontWeight='500'
                  borderRadius={5}
                  borderStyle='solid'
                  borderWidth={1}
                  height={50}
                  paddingY={1}
                ></CustomCheckbox>
              ) : (
                <CustomCheckbox
                  icon={
                    <HomeOutlinedIcon sx={{ fontSize: 30, color: '#000' }} />
                  }
                  title='Nhà trọ'
                  backgroundColor='transparent'
                  color='#000'
                  fontSize='16px'
                  fontWeight='500'
                  borderRadius={5}
                  borderStyle='solid'
                  borderWidth={1}
                  height={50}
                  paddingY={1}
                ></CustomCheckbox>
              )}
            </Grid>
            <Grid item xs={4} onClick={() => handlePickTypes('apartment')}>
              {type.apartment ? (
                <CustomCheckbox
                  icon={
                    <ApartmentOutlinedIcon
                      sx={{ fontSize: 30, color: '#fff' }}
                    />
                  }
                  title='Chung cư mini'
                  backgroundColor='#40A578'
                  color='#fff'
                  fontSize='16px'
                  fontWeight='500'
                  borderRadius={5}
                  borderStyle='solid'
                  borderWidth={1}
                  height={50}
                  paddingY={1}
                ></CustomCheckbox>
              ) : (
                <CustomCheckbox
                  icon={
                    <ApartmentOutlinedIcon
                      sx={{ fontSize: 30, color: '#000' }}
                    />
                  }
                  title='Chung cư mini'
                  backgroundColor='transparent'
                  color='#000'
                  fontSize='16px'
                  fontWeight='500'
                  borderRadius={5}
                  borderStyle='solid'
                  borderWidth={1}
                  height={50}
                  paddingY={1}
                ></CustomCheckbox>
              )}
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ marginLeft: -1 }}
              onClick={() => handlePickTypes('homestay')}
            >
              {type.homestay ? (
                <CustomCheckbox
                  icon={
                    <HomeWorkOutlinedIcon
                      sx={{ fontSize: 30, color: '#fff' }}
                    />
                  }
                  title='Homestay'
                  backgroundColor='#40A578'
                  color='#fff'
                  fontSize='16px'
                  fontWeight='500'
                  borderRadius={5}
                  borderStyle='solid'
                  borderWidth={1}
                  height={50}
                  paddingY={1}
                ></CustomCheckbox>
              ) : (
                <CustomCheckbox
                  icon={
                    <HomeWorkOutlinedIcon
                      sx={{ fontSize: 30, color: '#000' }}
                    />
                  }
                  title='Homestay'
                  backgroundColor='transparent'
                  color='#000'
                  fontSize='16px'
                  fontWeight='500'
                  borderRadius={5}
                  borderStyle='solid'
                  borderWidth={1}
                  height={50}
                  paddingY={1}
                ></CustomCheckbox>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
            Tiện nghi
          </Typography>
          <FormGroup>
            <Grid container>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={advances.wifiInternet}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAdvances({
                          ...advances,
                          wifiInternet: event.target.checked,
                        })
                      }
                    />
                  }
                  label='Wifi/internet'
                  sx={{ marginLeft: 1 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={advances.airConditioner}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAdvances({
                          ...advances,
                          airConditioner: event.target.checked,
                        })
                      }
                    />
                  }
                  label='Điều hòa'
                  sx={{ marginLeft: 1, marginRight: -5 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={advances.waterHeater}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAdvances({
                          ...advances,
                          waterHeater: event.target.checked,
                        })
                      }
                    />
                  }
                  label='Bình nóng lạnh'
                  sx={{ marginLeft: 1, marginRight: -5 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={advances.refrigerator}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAdvances({
                          ...advances,
                          refrigerator: event.target.checked,
                        })
                      }
                    />
                  }
                  label='Tủ lạnh'
                  sx={{ marginLeft: 1 }}
                />
              </Grid>
              <Grid item sm={4} md={4} lg={4} xl={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={advances.washingMachine}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setAdvances({
                          ...advances,
                          washingMachine: event.target.checked,
                        })
                      }
                    />
                  }
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
              value={electronicPrice[0]}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setElectronicPrice([
                  parseInt(event.target.value),
                  electronicPrice[1],
                ]);
              }}
            />
            -
            <OutlinedInput
              id='electronic-end'
              type='number'
              sx={{ marginLeft: 1, marginRight: 1 }}
              size={'small'}
              value={electronicPrice[1]}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setElectronicPrice([
                  electronicPrice[0],
                  parseInt(event.target.value),
                ]);
              }}
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
              value={waterPrice[0]}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setWaterPrice([parseInt(event.target.value), waterPrice[1]]);
              }}
            />
            -
            <OutlinedInput
              id='water-end'
              type='number'
              sx={{ marginLeft: 1, marginRight: 1 }}
              size={'small'}
              value={waterPrice[1]}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setWaterPrice([waterPrice[0], parseInt(event.target.value)]);
              }}
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
          sx={{
            backgroundColor: 'gray',
            borderRadius: 5,
            color: '#fff',
            width: '22%',
            '&.MuiButtonBase-root:hover': {
              backgroundColor: 'gray',
            },
          }}
        >
          Xóa bộ lọc
        </Button>
        <Button
          variant='contained'
          sx={{
            borderRadius: 5,
            width: '22%',
          }}
          onClick={handleSubmit}
        >
          Tìm kiếm
        </Button>
      </Box>
    </BootstrapDialog>
  );
}
