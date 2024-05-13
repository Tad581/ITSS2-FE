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
  { label: "Chung cư mini", value: "CHUNG_CU_MINI" },
  { label: "Phòng trọ", value: "PHONG_TRO" },
  { label: "Homestay", value: "HOME_STAY" },
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
    romOwnerId: defaultUserId,
    name: "",
    address: "",
    type: "Homestay",
    area: 0,
    distance_to_school: 0,
    price: 0,
    electronicPrice: 0,
    waterPrice: 0,
    description: "",
    wifiInternet: false,
    washingMachine: false,
    airConditioner: false,
    waterHeater: false,
    refrigerator: false,
    safedDevice: false,
    enclosedToilet: false,
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
        formData.append("images", file);
      }

      formData.append("romOwnerId", formValue.romOwnerId as unknown as string);
      formData.append("name", formValue.name as unknown as string);
      formData.append("address", formValue.address as unknown as string);
      formData.append("type", formValue.type as unknown as string);
      formData.append("area", formValue.area as unknown as string);
      formData.append(
        "distance_to_school",
        formValue.distance_to_school as unknown as string
      );
      formData.append("price", formValue.price as unknown as string);
      formData.append(
        "electronicPrice",
        formValue.electronicPrice as unknown as string
      );
      formData.append("waterPrice", formValue.waterPrice as unknown as string);
      formData.append(
        "description",
        formValue.description as unknown as string
      );
      formData.append(
        "wifiInternet",
        formValue.wifiInternet as unknown as string
      );
      formData.append(
        "washingMachine",
        formValue.washingMachine as unknown as string
      );
      formData.append(
        "airConditioner",
        formValue.airConditioner as unknown as string
      );
      formData.append(
        "waterHeater",
        formValue.waterHeater as unknown as string
      );
      formData.append(
        "refrigerator",
        formValue.refrigerator as unknown as string
      );
      formData.append(
        "safedDevice",
        formValue.safedDevice as unknown as string
      );
      formData.append(
        "enclosedToilet",
        formValue.enclosedToilet as unknown as string
      );

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
    if (!props.isOpen) {
      formik.setValues(initialValues)
      setExistedImages([]);
    }
    (async () => {
      if (props.isOpen && props.roomId) {
        const room = await RoomAPI.getOne(props.roomId);

        formik.setFieldValue("romOwnerId", room?.data?.owner?.id);
        formik.setFieldValue("name", room?.data?.name);
        formik.setFieldValue("address", room?.data?.address);
        formik.setFieldValue("type", room?.data?.type);
        formik.setFieldValue("area", room?.data?.area);
        formik.setFieldValue(
          "distance_to_school",
          room?.data?.distance_to_school
        );
        formik.setFieldValue("price", room?.data?.price);
        formik.setFieldValue(
          "electronicPrice",
          room?.data?.roomAttribute?.electronicPrice
        );
        formik.setFieldValue(
          "waterPrice",
          room?.data?.roomAttribute?.waterPrice
        );
        formik.setFieldValue(
          "description",
          room?.data?.roomAttribute?.description
        );
        formik.setFieldValue("wifiInternet", room?.data?.wifiInternet);
        formik.setFieldValue(
          "washingMachine",
          room?.data?.roomAttribute?.washingMachine
        );
        formik.setFieldValue(
          "airConditioner",
          room?.data?.roomAttribute?.airConditioner
        );
        formik.setFieldValue(
          "waterHeater",
          room?.data?.roomAttribute?.waterHeater
        );
        formik.setFieldValue(
          "refrigerator",
          room?.data?.roomAttribute?.refrigerator
        );
        formik.setFieldValue(
          "safedDevice",
          room?.data?.roomAttribute?.safedDevice
        );
        formik.setFieldValue(
          "enclosedToilet",
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
            <Typography id="modal-modal-title" variant="h2" component="h2" sx={{ my: 3 }}>
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
              name={"name"}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormInputText
              label="Mô tả"
              multiline
              name={"description"}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <FormInputText
              label="Địa chỉ"
              name={"address"}
              value={formik.values.address}
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
                  name={"price"}
                  value={formik.values.price}
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
                  name={"area"}
                  value={formik.values.area}
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
                  name={"electronicPrice"}
                  value={formik.values.electronicPrice}
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
                  name={"waterPrice"}
                  value={formik.values.waterPrice}
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
              name={"type"}
              value={formik.values.type}
              onChange={formik.handleChange}
            />
            <ComboBox
              title="Nhà vệ sinh"
              label="Chọn loại phòng bạn muốn đăng"
              options={enclosedToiletOptions}
              name={"enclosedToilet"}
              value={formik.values.enclosedToilet}
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
                        name={"airConditioner"}
                        checked={formik.values.airConditioner}
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
                        name={"waterHeater"}
                        checked={formik.values.waterHeater}
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
                        name={"refrigerator"}
                        checked={formik.values.refrigerator}
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
                        name={"wifiInternet"}
                        checked={formik.values.wifiInternet}
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
                        name={"washingMachine"}
                        checked={formik.values.washingMachine}
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
