import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setLoading, setLogged } from "../redux/commonSlice";
import { dispatch } from "../redux/store";
import ApiServices from "../services/Apiservices";
import AuthServices from "../services/AuthServices";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.common);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      dispatch(setLoading(true));
      const res = await ApiServices.login(data);
      AuthServices.setToken(res.token);
      AuthServices.setUser(res.data);
      dispatch(setLogged(true));
      navigate("/home");
      dispatch(setLoading(false));
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage:
              "url(https://random-image-pepebigotes.vercel.app/api/random-image)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  my: 18,
                  mx: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 2, bgcolor: "#014aad", padding: 3 }}>
                  <LockOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  fontWeight={600}
                >
                  Bhume Engineering
                  <br />
                  Sign In
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    {...register("email")}
                    helperText={errors.email ? errors.email.message : null}
                    error={errors.email ? true : false}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    {...register("password")}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                    error={errors.password ? true : false}
                    autoComplete="current-password"
                  />

                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    loadingPosition="start"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#014aad",
                      color: isLoading ? "white" : "white",
                    }}
                    style={{
                      backgroundColor: !isLoading ? "#014aad" : "",
                    }}
                  >
                    Sign In
                  </LoadingButton>
                </Box>
              </Box>
            </div>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
