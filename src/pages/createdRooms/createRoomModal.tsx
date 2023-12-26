import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageUploadCard from './imageUploadCard';
import { Checkbox, FormControlLabel, FormGroup, Grid, InputBase } from '@mui/material';
import { useFormik } from 'formik';

import { IRoomCreateInput } from '../../interfaces/room';
import { RoomAPI } from '../../api/roomAPI';

type ComboBoxProps = {
  options: any[],
  label: string,
  title: string,
  name?: string,
  value: any,
  onChange?: any,
}

function ComboBox(props: ComboBoxProps) {

  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} mt={2}>
      <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
        {props.title}
      </Typography>
      {/* <Autocomplete
        disablePortal
        options={props.options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
      /> */}
      <select id="cars" style={{ height: 40, width: 200 }} name={props.name} onChange={props.onChange} value={props.value} >
        {
          props.options.map(opt => (
            <option value={opt.value}>{opt.label}</option>
          ))
        }
      </select>
    </Box>
  )
}

const roomTypeOptions = [
  { label: "Chung cư mini", value: "CHUNG_CU_MINI" },
  { label: "Phòng trọ", value: "PHONG_TRO" },
  { label: "Homestay", value: "HOME_STAY" },
]

const enclosedToiletOptions = [
  { label: "Chung", value: true },
  { label: "Khép kín", value: false },
]

ComboBox.defaultProps = {
  options: [
    { label: 'The Shawshank Redemption', value: 1994 },
    { label: 'The Godfather', value: 1972 },
    { label: 'The Godfather: Part II', value: 1974 },
    { label: 'The Dark Knight', value: 2008 },
  ]
}

type CreateRoomModalProps = {
  isOpen: boolean;
  handleClose?: () => void;
  // handleSubmit?: (formData: FormData) => void;
  roomId: number | null;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pt: 50,
};

export default function CreateRoomModal(props: CreateRoomModalProps) {

  const initialValues: IRoomCreateInput = {
    owner_id: 26,
    name: 'a',
    address: '',
    type: 'CHUNG_CU_MINI',
    area: 0,
    distance_to_school: 0,
    price: 0,
    electronic_price: 0,
    water_price: 0,
    description: '',
    wifi_internet: false,
    washing_machine: false,
    air_conditioner: false,
    water_heater: false,
    refrigerator: false,
    safed_device: false,
    enclosed_toilet: false,
    images: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadFiles, setUploadFiles] = React.useState<any>([]);
  const [btnDisabled, setBtnDisabled] = React.useState<any>(false);
  const [existedImages, setExistedImages] = React.useState<string[]>([]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (formValue) => {
      const formData = new FormData();

      for (const file of uploadFiles) {
        formData.append("images", file)
      }

      formData.append('owner_id', formValue.owner_id as unknown as string);
      formData.append('name', formValue.name as unknown as string);
      formData.append('address', formValue.address as unknown as string);
      formData.append('type', formValue.type as unknown as string);
      formData.append('area', formValue.area as unknown as string);
      formData.append('distance_to_school', formValue.distance_to_school as unknown as string);
      formData.append('price', formValue.price as unknown as string);
      formData.append('electronic_price', formValue.electronic_price as unknown as string);
      formData.append('water_price', formValue.water_price as unknown as string);
      formData.append('description', formValue.description as unknown as string);
      formData.append('wifi_internet', formValue.wifi_internet as unknown as string);
      formData.append('washing_machine', formValue.washing_machine as unknown as string);
      formData.append('air_conditioner', formValue.air_conditioner as unknown as string);
      formData.append('water_heater', formValue.water_heater as unknown as string);
      formData.append('refrigerator', formValue.refrigerator as unknown as string);
      formData.append('safed_device', formValue.safed_device as unknown as string);
      formData.append('enclosed_toilet', formValue.enclosed_toilet as unknown as string);

      try {
        let response = null;
        if (props.roomId) {
          response = await RoomAPI.updateRoom(props.roomId, formData);
        } else {
          response = await RoomAPI.createRoom(formData);
        }

        setBtnDisabled(false);
        if (props?.handleClose) {
          props.handleClose();
          setBtnDisabled(false);
        }

        window.location.reload();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  React.useEffect(() => {
    (async () => {
      if (props.isOpen && props.roomId) {
        const room = await RoomAPI.getOne(props.roomId)
        console.log(room)

        formik.setFieldValue("owner_id", room?.data?.owner?.id);
        formik.setFieldValue("name", room?.data?.name);
        formik.setFieldValue("address", room?.data?.address);
        formik.setFieldValue("type", room?.data?.type);
        formik.setFieldValue("area", room?.data?.area);
        formik.setFieldValue("distance_to_school", room?.data?.distance_to_school);
        formik.setFieldValue("price", room?.data?.price);
        formik.setFieldValue("electronic_price", room?.data?.room_attribute?.electronic_price);
        formik.setFieldValue("water_price", room?.data?.room_attribute?.water_price);
        formik.setFieldValue("description", room?.data?.room_attribute?.description);
        formik.setFieldValue("wifi_internet", room?.data?.wifi_internet);
        formik.setFieldValue("washing_machine", room?.data?.room_attribute?.washing_machine);
        formik.setFieldValue("air_conditioner", room?.data?.room_attribute?.air_conditioner);
        formik.setFieldValue("water_heater", room?.data?.room_attribute?.water_heater);
        formik.setFieldValue("refrigerator", room?.data?.room_attribute?.refrigerator);
        formik.setFieldValue("safed_device", room?.data?.room_attribute?.safed_device);
        formik.setFieldValue("enclosed_toilet", room?.data?.room_attribute?.enclosed_toilet);

        setExistedImages(room?.data?.room_image?.map((img: any) => img.image_url))
      }
    })()
  }, [props.isOpen, props.roomId])

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow: 'scroll',
          maxHeight: '90%',
          top: '5%',
          // left: '10%', 
          position: 'absolute'
        }}
      >
        <form>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Đăng phòng
            </Typography>
            <ImageUploadCard handlePropsImage={setUploadFiles} existedImageUrls={existedImages} />
            <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5" fontWeight={500}>
              Thông tin phòng
            </Typography>

            <FormInputText label='Tên phòng' name={'name'} value={formik.values.name} onChange={formik.handleChange} />
            <FormInputText label='Mô tả' multiline name={'description'} value={formik.values.description} onChange={formik.handleChange} />
            <FormInputText label='Địa chỉ' name={'address'} value={formik.values.address} onChange={formik.handleChange} />

            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
              {/*  */}
              <Box display={'flex'} flexDirection={'row'}>
                <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
                  Giá
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"VND/tháng"}
                  name={'price'}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
              <Box display={'flex'} flexDirection={'row'}>
                <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
                  Diện tích
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"m2"}
                  name={'area'}
                  value={formik.values.area}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
              <Box display={'flex'} flexDirection={'row'}>
                <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
                  Điện
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"VND/số"}
                  name={'electronic_price'}
                  value={formik.values.electronic_price}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
              <Box display={'flex'} flexDirection={'row'}>
                <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
                  Nước
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"VND/số"}
                  name={'water_price'}
                  value={formik.values.water_price}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
            </Box>

            {/*  */}
            <ComboBox title='Loại phòng' label='Chọn loại phòng bạn muốn đăng' options={roomTypeOptions} name={'type'} value={formik.values.type} onChange={formik.handleChange} />
            <ComboBox title='Nhà vệ sinh' label='Chọn loại phòng bạn muốn đăng' options={enclosedToiletOptions} name={'enclosed_toilet'} value={formik.values.enclosed_toilet} onChange={formik.handleChange} />
            {/*  */}

            <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5" fontWeight={500}>
              Tiện nghi
            </Typography>
            <FormGroup>
              <Grid container columnSpacing={4} width={'100%'}>
                {/* <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2}> */}
                <Grid item xs={3}>
                  <FormControlLabel control={<Checkbox name={'air_conditioner'} checked={formik.values.air_conditioner} onChange={formik.handleChange} />} label="Điều hòa" />
                </Grid>
                <Grid item xs={3}>

                  <FormControlLabel control={<Checkbox name={'water_heater'} checked={formik.values.water_heater} onChange={formik.handleChange} />} label="Nóng lạnh" />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel control={<Checkbox name={'refrigerator'} checked={formik.values.refrigerator} onChange={formik.handleChange} />} label="Tủ lạnh" />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel control={<Checkbox name={'wifi_internet'} checked={formik.values.wifi_internet} onChange={formik.handleChange} />} label="Wifi" />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel control={<Checkbox name={'washing_machine'} checked={formik.values.washing_machine} onChange={formik.handleChange} />} label="Máy giặt" />
                </Grid>
                {/* </Box> */}
              </Grid>
            </FormGroup>

            {/*  */}
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} mt={2}>
              <Button variant="outlined" color="error" sx={{ mx: 2 }} onClick={props.handleClose} disabled={btnDisabled}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" sx={{ mx: 2 }} onClick={formik.submitForm} disabled={btnDisabled}>
                Ok
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}


type FormInputTextProps = {
  label: string,
  multiline?: boolean;
  // fullWidth?: boolean;
  value?: string;
  name?: string;
  onChange?: any;
}

function FormInputText(props: FormInputTextProps) {
  return (
    <Box >
      <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1 }}>
        {props.label}
      </Typography>
      <InputBase
        // id="standard-adornment-amount"
        name={props.name}
        multiline={props.multiline}
        fullWidth//={props.fullWidth}
        rows={4}
        sx={{ border: 1, padding: 1, borderRadius: 2 }}
        value={props.value}
        onChange={props.onChange}
      />
    </Box>)
}