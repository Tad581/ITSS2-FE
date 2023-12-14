import { Box, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CustomCheckbox from '../components/dialog/filter/customCheckbox';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import { useState, useEffect } from 'react';
interface IProps {
  handleDialogToggle: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleParams: (param: any) => void;
}

export default function Filterbar(props: Readonly<IProps>) {
  const [types, setTypes] = useState<{
    house: boolean;
    apartment: boolean;
    homestay: boolean;
  }>({ house: false, apartment: false, homestay: false });

  const handlePickTypes = (value: string) => {
    if (value === 'house') {
      setTypes({ ...types, house: !types.house });
    } else if (value === 'apartment') {
      setTypes({ ...types, apartment: !types.apartment });
    } else if (value === 'homestay') {
      setTypes({ ...types, homestay: !types.homestay });
    }
  };

  useEffect(() => {
    const typesArray: string[] = [];
    if (types.house) {
      typesArray.push('PHONG_TRO');
    }
    if (types.apartment) {
      typesArray.push('CHUNG_CU_MINI');
    }
    if (types.homestay) {
      typesArray.push('HOME_STAY');
    }

    if (typesArray.length === 3) {
      typesArray.pop();
      typesArray.pop();
      typesArray.pop();
    }

    props.handleParams({
      type: typesArray,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types]);

  return (
    <Box component='div' sx={{ marginTop: 1 }}>
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
        <Box onClick={() => handlePickTypes('house')}>
          {types.house ? (
            <CustomCheckbox
              icon={<HomeOutlinedIcon sx={{ fontSize: 40, color: '#fff' }} />}
              title='Nhà trọ'
              borderRadius={5}
              borderStyle='solid'
              borderWidth={1}
              height={50}
              backgroundColor='#1976d2'
              color='#fff'
              fontSize='22px'
              fontWeight='700'
              paddingX={4}
              paddingY={2}
            />
          ) : (
            <CustomCheckbox
              icon={<HomeOutlinedIcon sx={{ fontSize: 40, color: 'gray' }} />}
              title='Nhà trọ'
              backgroundColor='transparent'
              color='gray'
              fontSize='22px'
              fontWeight='700'
              height={50}
              paddingX={4}
              paddingY={2}
            />
          )}
        </Box>
        <Box onClick={() => handlePickTypes('apartment')}>
          {types.apartment ? (
            <CustomCheckbox
              icon={
                <ApartmentOutlinedIcon sx={{ fontSize: 40, color: '#fff' }} />
              }
              title='Chung cư mini'
              borderRadius={5}
              borderStyle='solid'
              borderWidth={1}
              height={50}
              backgroundColor='#1976d2'
              color='#fff'
              fontSize='22px'
              fontWeight='700'
              paddingX={4}
              paddingY={2}
            />
          ) : (
            <CustomCheckbox
              icon={
                <ApartmentOutlinedIcon sx={{ fontSize: 40, color: 'gray' }} />
              }
              title='Chung cư mini'
              backgroundColor='transparent'
              color='gray'
              fontSize='22px'
              fontWeight='700'
              height={50}
              paddingX={4}
              paddingY={2}
            />
          )}
        </Box>
        <Box onClick={() => handlePickTypes('homestay')}>
          {types.homestay ? (
            <CustomCheckbox
              icon={
                <HomeWorkOutlinedIcon sx={{ fontSize: 40, color: '#fff' }} />
              }
              title='Homestay'
              borderRadius={5}
              borderStyle='solid'
              borderWidth={1}
              height={50}
              backgroundColor='#1976d2'
              color='#fff'
              fontSize='22px'
              fontWeight='700'
              paddingX={4}
              paddingY={2}
            />
          ) : (
            <CustomCheckbox
              icon={
                <HomeWorkOutlinedIcon sx={{ fontSize: 40, color: 'gray' }} />
              }
              title='Homestay'
              backgroundColor='transparent'
              color='gray'
              fontSize='22px'
              fontWeight='700'
              height={50}
              paddingX={4}
              paddingY={2}
            />
          )}
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
