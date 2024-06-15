import { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layout/header";
import { AuthContext } from "../../context/authContext";
import dayjs from "dayjs";
import { updatePassword } from "firebase/auth";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser }: any = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      avatarUrl: currentUser.photoURL,
      userName: currentUser.email,
      password: currentUser.password,
      fullName: currentUser.displayName,
      dateOfBirth: currentUser.dateOfBirth,
      gender: currentUser.gender,
      phoneNumber: currentUser.phoneNumber,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ tên không được để trống"),
      dateOfBirth: Yup.date().required("Ngày sinh không được để trống"),
      gender: Yup.string().required("Giới tính không được để trống"),
      phoneNumber: Yup.string().required("Số điện thoại không được để trống"),
      newPassword: Yup.string().min(8, "Cần tối thiểu 8 kí tự"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), undefined],
        "Mật khẩu không trùng khớp"
      ),
    }),
    onSubmit: async (values) => {
      const {fullName, dateOfBirth, gender, phoneNumber, newPassword } = values
      if (
        values.currentPassword &&
        values.currentPassword !== currentUser.password
      ) {
        toast.error("Sai mật khẩu");
        return;
      }
      const newProfile = {
        gender,
        phoneNumber,
        newPassword,
        dateOfBirth: dayjs(dateOfBirth).format("DD/MM/YYYY"),
      };

      await updateDoc(doc(db, "users", currentUser.uid), {
        displayName: fullName,
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        displayName: fullName,
      });

      await updatePassword(currentUser, newPassword);
      
      toast.success("Cập nhật thông tin thành công");
      setIsEditing(false);
      window.location.reload();
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#EEEDEB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 3,
      }}
    >
      <Header />
      <Box
        sx={{
          marginTop: 3,
          border: "1px solid #ddd",
          borderRadius: "10px",
          maxWidth: "800px",
          backgroundColor: "#fff",
          padding: 4,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <ToastContainer />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Avatar
            src={formik.values.avatarUrl}
            alt="avatarUrl"
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Thông tin cá nhân
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Cập nhật thông tin cá nhân của bạn.
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="userName"
                value={formik.values.userName}
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ tên"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                disabled={!isEditing}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={
                  typeof formik.errors.fullName === "string"
                    ? formik.errors.fullName
                    : undefined
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ngày sinh"
                name="dateOfBirth"
                type="date"
                value={dayjs(formik.values.dateOfBirth).format("YYYY-MM-DD")}
                onChange={formik.handleChange}
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                helperText={
                  typeof formik.errors.dateOfBirth === "string"
                    ? formik.errors.dateOfBirth
                    : undefined
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Giới tính"
                name="gender"
                value={
                  formik.values.gender === "MALE"
                    ? "Nam"
                    : formik.values.gender === "FEMALE"
                    ? "Nữ"
                    : "Khác"
                }
                onChange={formik.handleChange}
                disabled={!isEditing}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={
                  typeof formik.errors.gender === "string"
                    ? formik.errors.gender
                    : undefined
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Điện thoại"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                disabled={!isEditing}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  typeof formik.errors.phoneNumber === "string"
                    ? formik.errors.phoneNumber
                    : undefined
                }
                variant="outlined"
              />
            </Grid>
            {isEditing && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nhập lại mật khẩu hiện tại"
                    name="currentPassword"
                    type="password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.currentPassword &&
                      Boolean(formik.errors.currentPassword)
                    }
                    helperText={
                      typeof formik.errors.currentPassword === "string"
                        ? formik.errors.currentPassword
                        : undefined
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    name="newPassword"
                    type="password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.newPassword &&
                      Boolean(formik.errors.newPassword)
                    }
                    helperText={
                      typeof formik.errors.newPassword === "string"
                        ? formik.errors.newPassword
                        : undefined
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      typeof formik.errors.confirmPassword === "string"
                        ? formik.errors.confirmPassword
                        : undefined
                    }
                    variant="outlined"
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(!isEditing)}
                sx={{ mt: 2 }}
              >
                {isEditing ? "Thoát" : "Thay đổi thông tin"}
              </Button>
            </Grid>
            {isEditing && (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Lưu thay đổi
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
