import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageUploadCard from "./imageUploadCard";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputBase,
} from "@mui/material";
import { useFormik } from "formik";
import { defaultUserId } from "../../constant";
import { IRoomCreateInput } from "../../interfaces/room";
import { RoomAPI } from "../../api/roomAPI";
import RoomAttribute from '../../components/detail/roomAttribute';
import { toast } from "react-toastify";

type ComboBoxProps = {
  options: any[];
  label: string;
  title: string;
  name?: string;
  value: any;
  onChange?: any;
};

function ComboBox(props: ComboBoxProps) {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={2}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
        {props.title}
      </Typography>
      {/* <Autocomplete
        disablePortal
        options={props.options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
      /> */}
      <select
        id={props.name}
        style={{ border: "1px solid black", height: 40, width: 200 }}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </Box>
  );
}

const roomTypeOptions = [
  { label: "Chung cư mini", value: "CCMN" },
  { label: "Phòng trọ", value: "PHONGTRO" },
  { label: "Homestay", value: "HOMESTAY" },
];

const enclosedToiletOptions = [
  { label: "Chung", value: true },
  { label: "Khép kín", value: false },
];

ComboBox.defaultProps = {
  options: [
    { label: "The Shawshank Redemption", value: 1994 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
  ],
};

type CreateRoomModalProps = {
  isOpen: boolean;
  handleClose?: () => void;
  // handleSubmit?: (formData: FormData) => void;
  roomId: string | null;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 50,
};

export default function CreateRoomModal(props: CreateRoomModalProps) {
  const initialValues: IRoomCreateInput = {
    ownerId: defaultUserId,
    Name: "",
    Address: "",
    Type: "Homestay",
    Area: 0,
    Price: 0,
    ElectronicPrice: 0,
    WaterPrice: 0,
    Description: "",
    WifiInternet: false,
    WashingMachine: false,
    AirConditioner: false,
    WaterHeater: false,
    Refrigerator: false,
    SafedDevice: false,
    EnclosedToilet: false,
    Tag: "Empty",
    Images: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadFiles, setUploadFiles] = React.useState<any>([]);
  const [btnDisabled, setBtnDisabled] = React.useState<any>(false);
  const [existedImages, setExistedImages] = React.useState<string[]>([]);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (formValue) => {
      const formData = new FormData();
      for (let i = 0; i < uploadFiles.length; i++) {
        formData.append(`Images`, uploadFiles[i]);
      }

      formData.append("ownerId", formValue.ownerId as unknown as string);
      formData.append("Name", formValue.Name as unknown as string);
      formData.append("Address", formValue.Address as unknown as string);
      formData.append("Type", formValue.Type as unknown as string);
      formData.append("Tag", formValue.Tag as unknown as string);
      formData.append("Area", formValue.Area as unknown as string);
      formData.append("Price", formValue.Price as unknown as string);
      formData.append(
        "ElectronicPrice",
        formValue.ElectronicPrice as unknown as string
      );
      formData.append("WaterPrice", formValue.WaterPrice as unknown as string);
      formData.append(
        "Description",
        formValue.Description as unknown as string
      );
      formData.append(
        "WifiInternet",
        formValue.WifiInternet as unknown as string
      );
      formData.append(
        "WashingMachine",
        formValue.WashingMachine as unknown as string
      );
      formData.append(
        "AirConditioner",
        formValue.AirConditioner as unknown as string
      );
      formData.append(
        "WaterHeater",
        formValue.WaterHeater as unknown as string
      );
      formData.append(
        "Refrigerator",
        formValue.Refrigerator as unknown as string
      );
      formData.append(
        "SafedDevice",
        formValue.SafedDevice as unknown as string
      );
      formData.append(
        "EnclosedToilet",
        formValue.EnclosedToilet as unknown as string
      );

      try {
        let response = null;
        if (props.roomId) {
          response = await RoomAPI.updateRoom(props.roomId, formData);
        } else {
          response = await RoomAPI.createRoom(formData);
        }
        if (response.message === "Success") {
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        } else {
          toast.error(response.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
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
    if (!props.isOpen) {
      formik.setValues(initialValues);
      setExistedImages([]);
    }
    (async () => {
      if (props.isOpen && props.roomId) {
        const room = await RoomAPI.getOne(props.roomId);

        formik.setFieldValue("pwnerId", room?.data?.owner?.id);
        formik.setFieldValue("Name", room?.data?.name);
        formik.setFieldValue("Address", room?.data?.address);
        formik.setFieldValue("Type", room?.data?.type);
        formik.setFieldValue("Area", room?.data?.area);
        formik.setFieldValue("Tag", room?.data?.tag);
        formik.setFieldValue("Price", room?.data?.price);
        formik.setFieldValue(
          "ElectronicPrice",
          room?.data?.roomAttribute?.electronicPrice
        );
        formik.setFieldValue(
          "WaterPrice",
          room?.data?.roomAttribute?.waterPrice
        );
        formik.setFieldValue(
          "Description",
          room?.data?.roomAttribute?.description
        );
        formik.setFieldValue("WifiInternet", room?.data?.roomAttribute.wifiInternet);
        formik.setFieldValue(
          "WashingMachine",
          room?.data?.roomAttribute?.washingMachine
        );
        formik.setFieldValue(
          "AirConditioner",
          room?.data?.roomAttribute?.airConditioner
        );
        formik.setFieldValue(
          "WaterHeater",
          room?.data?.roomAttribute?.waterHeater
        );
        formik.setFieldValue(
          "Refrigerator",
          room?.data?.roomAttribute?.refrigerator
        );
        formik.setFieldValue(
          "SafedDevice",
          room?.data?.roomAttribute?.safedDevice
        );
        formik.setFieldValue(
          "EnclosedToilet",
          room?.data?.roomAttribute?.enclosedToilet
        );

        setExistedImages(
          room?.data?.roomImages?.map((img: any) => img.imageUrl)
        );
      }
    })();
  }, [props.isOpen, props.roomId]);

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow: "scroll",
          maxHeight: "90%",
          top: "5%",
          // left: '10%',
          position: "absolute",
        }}
      >
        <form>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h2"
              component="h2"
              sx={{ my: 3 }}
            >
              Đăng phòng
            </Typography>
            <ImageUploadCard
              handlePropsImage={setUploadFiles}
              existedImageUrls={existedImages}
            />
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h5"
              fontWeight={500}
            >
              Thông tin phòng
            </Typography>

            <FormInputText
              label="Tên phòng"
              name={"Name"}
              value={formik.values.Name}
              onChange={formik.handleChange}
            />
            <FormInputText
              label="Mô tả"
              multiline
              name={"Description"}
              value={formik.values.Description}
              onChange={formik.handleChange}
            />
            <FormInputText
              label="Địa chỉ"
              name={"Address"}
              value={formik.values.Address}
              onChange={formik.handleChange}
            />

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={2}
            >
              {/*  */}
              <Box display={"flex"} flexDirection={"row"}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}
                >
                  Giá
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"VND/tháng"}
                  name={"Price"}
                  value={formik.values.Price}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
              <Box display={"flex"} flexDirection={"row"}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}
                >
                  Diện tích
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"m2"}
                  name={"Area"}
                  value={formik.values.Area}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
              <Box display={"flex"} flexDirection={"row"}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}
                >
                  Điện
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"VND/số"}
                  name={"ElectronicPrice"}
                  value={formik.values.ElectronicPrice}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
              <Box display={"flex"} flexDirection={"row"}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}
                >
                  Nước
                </Typography>
                <InputBase
                  rows={1}
                  sx={{ border: 1, p: 0.5, px: 1, borderRadius: 2, width: 150 }}
                  endAdornment={"VND/số"}
                  name={"WaterPrice"}
                  value={formik.values.WaterPrice}
                  onChange={formik.handleChange}
                />
              </Box>
              {/*  */}
            </Box>

            {/*  */}
            <ComboBox
              title="Loại phòng"
              label="Chọn loại phòng bạn muốn đăng"
              options={roomTypeOptions}
              name={"Type"}
              value={formik.values.Type}
              onChange={formik.handleChange}
            />
            <ComboBox
              title="Nhà vệ sinh"
              label="Chọn loại phòng bạn muốn đăng"
              options={enclosedToiletOptions}
              name={"EnclosedToilet"}
              value={formik.values.EnclosedToilet}
              onChange={formik.handleChange}
            />
            {/*  */}

            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="h5"
              fontWeight={500}
            >
              Tiện nghi
            </Typography>
            <FormGroup>
              <Grid container columnSpacing={2} width={"100%"}>
                {/* <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mt={2}> */}
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={"AirConditioner"}
                        checked={formik.values.AirConditioner}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Điều hòa"
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={"WaterHeater"}
                        checked={formik.values.WaterHeater}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Nóng lạnh"
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={"Refrigerator"}
                        checked={formik.values.Refrigerator}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Tủ lạnh"
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={"WifiInternet"}
                        checked={formik.values.WifiInternet}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Wifi"
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={"WashingMachine"}
                        checked={formik.values.WashingMachine}
                        onChange={formik.handleChange}
                      />
                    }
                    label="Máy giặt"
                  />
                </Grid>
                {/* </Box> */}
              </Grid>
            </FormGroup>

            {/*  */}
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={2}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{ mx: 2 }}
                onClick={props.handleClose}
                disabled={btnDisabled}
              >
                Thoát
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ mx: 2 }}
                onClick={formik.submitForm}
                disabled={btnDisabled}
              >
                Xác nhận
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
}

type FormInputTextProps = {
  label: string;
  multiline?: boolean;
  // fullWidth?: boolean;
  value?: string;
  name?: string;
  onChange?: any;
};

function FormInputText(props: FormInputTextProps) {
  return (
    <Box>
      <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1 }}>
        {props.label}
      </Typography>
      <InputBase
        // id="standard-adornment-amount"
        name={props.name}
        multiline={props.multiline}
        fullWidth //={props.fullWidth}
        rows={4}
        sx={{ border: 1, padding: 1, borderRadius: 2 }}
        value={props.value}
        onChange={props.onChange}
      />
    </Box>
  );
}
