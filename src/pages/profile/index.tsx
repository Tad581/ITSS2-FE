import { useContext, useState } from "react";
import { Box, TextField, Button, Avatar, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layout/header";
import { AuthContext } from "../../context/authContext";

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
      //   currentPassword: Yup.string().when('newPassword', {
      //     is: (val: string) => val && val.length > 0,
      //     then: Yup.string().required('Current Password is required'),
      //   }),
      newPassword: Yup.string().min(8, "Cần tối thiểu 8 kí tự"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), undefined],
        "Mật khẩu không trùng khớp"
      ),
    }),
    onSubmit: (values) => {
      if (
        values.currentPassword &&
        values.currentPassword !== currentUser.password
      ) {
        toast.error("Sai mật khẩu");
        return;
      }
      console.log("Submitted values:", values);
      toast.success("Cập nhật thông tin thành công");
      setIsEditing(false);
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
      }}
    >
      <Header />
      <Box
        sx={{
          marginTop: 3,
          border: "1px solid white",
          borderRadius: "10px",
          maxWidth: "75%",
          backgroundColor: "#fff",
          padding: 5,
        }}
      >
        <ToastContainer />
        <Avatar
          src={formik.values.avatarUrl}
          alt="avatarUrl"
          sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
        />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="userName"
                value={formik.values.userName}
                disabled
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
                  (formik.touched.fullName && formik.errors.fullName) as string
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ngày sinh"
                name="dateOfBirth"
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                disabled={!isEditing}
                InputLabelProps={{ shrink: true }}
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                helperText={
                  (formik.touched.dateOfBirth &&
                    formik.errors.dateOfBirth) as string
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Giới tính"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                disabled={!isEditing}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={
                  (formik.touched.gender && formik.errors.gender) as string
                }
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
                  (formik.touched.phoneNumber &&
                    formik.errors.phoneNumber) as string
                }
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
                      formik.touched.currentPassword &&
                      formik.errors.currentPassword
                    }
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
                      formik.touched.newPassword && formik.errors.newPassword
                    }
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
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
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
