import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/index";
import { Box, OutlinedInput, Button, Typography, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../index.css'
import { UserAPI } from "../../api/userAPI";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        const res = await UserAPI.getUser(userCredential.user.uid)
        if (res.data.role === 0) {
          navigate("/admin/rooms");
        }
        else
        navigate("/");
      }
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Grid item xs={10} sm={6} md={4} lg={3}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ color: "#5d5b8d", marginBottom: "20px" }}>
            Đăng nhập
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <Field
                  as={OutlinedInput}
                  name="email"
                  type="email"
                  placeholder="Email"
                  sx={{
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="custom-error-message"
                />
                
                <Field
                  as={OutlinedInput}
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  sx={{
                    marginBottom: "15px",
                    width: "100%",
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="custom-error-message"
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#40A578",
                    color: "white",
                    padding: "12px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#357e61",
                    },
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  Đăng nhập
                </Button>
                {err && <Typography sx={{ color: "red" }}>Đăng nhập thất bại. Vui lòng thử lại.</Typography>}
              </Form>
            )}
          </Formik>
          <Typography variant="body1" sx={{ color: "#5d5b8d", marginTop: "10px" }}>
            Bạn chưa có tài khoản? Đăng ký tại <Link to="/signup" style={{ color: "#40A578" }}>đây</Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
