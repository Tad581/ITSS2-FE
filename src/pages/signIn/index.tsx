import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/index";
import { Box, OutlinedInput, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../index.css'

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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#40A578",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px 60px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#5d5b8d",
            fontSize: "24px",
          }}
        >
          Đăng nhập
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Field
                as={OutlinedInput}
                name="email"
                type="email"
                placeholder="Email"
                sx={{
                  border: "none",
                  width: "250px",
                  borderBottom: "1px solid #a7bcff",
                  "&::placeholder": {
                    color: "rgb(175, 175, 175)",
                  },
                }}
                size="medium"
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
                  border: "none",
                  width: "250px",
                  borderBottom: "1px solid #a7bcff",
                  "&::placeholder": {
                    color: "rgb(175, 175, 175)",
                  },
                }}
                size="medium"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="custom-error-message"
              />

              <Button
                type="submit"
                sx={{
                  backgroundColor: "#40A578",
                  color: "white",
                  padding: "10px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Đăng nhập
              </Button>
              {err && <Box component="span">Có lỗi</Box>}
            </Form>
          )}
        </Formik>
        <Box
          component="p"
          sx={{
            color: "#5d5b8d",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          Bạn chưa có tài khoản? Đăng ký tại <Link to="/signup">đây</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
