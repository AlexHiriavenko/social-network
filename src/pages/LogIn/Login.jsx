import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import loginValidation from "./Validation/loginValidation";
import RegisterModal from "./RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import {logIn,  setLogin,logOut} from "../../redux/login.slice/login.slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function LogIn() {
  const navigate = useNavigate();
  // const token = useSelector(store => store.login.token)
  const loggedIn = useSelector((state) => state.login.isLoggedIn);
  let url = window.location.href.slice(0, -6);
  const[message,setMessage] = useState(null);
  const dispatch = useDispatch();                                 

  useEffect(() => {
    // if (!readCookie("token")) {
    //  document.cookie = `token=${0}`;
    if(!localStorage.getItem("token")){
      localStorage.setItem("token",JSON.stringify("out"))}

      if(loggedIn ){

      dispatch(logOut());
    }    
  }, []);


  const [registerModal, setRegisterModal] = useState(false);
  const handleRegisterModal = () => {
    setRegisterModal(!registerModal);
  };
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async () => {
      const email = loginForm.values.email;
      const password = loginForm.values.password;
      const auth = await  dispatch(
          logIn({
            email: loginForm.values.email,
            password: loginForm.values.password,
          })
      );

      if(auth.type === 'Login/logIn/rejected') {
        setMessage("Incorrect login or password or account not activated after creation")
      }

      if (JSON.parse(localStorage.getItem("token"))!= "out") {
        dispatch(setLogin());
        navigate("/");
      }

      return ;
    },
  });

  const [forgotModal, setForgotModal] = useState(false);
  const handleForgot = () => {

    navigate("/forgot");
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const recentLogin = localStorage.getItem("recentLogin") || [];
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const token = useSelector((state) => state.login.token);
  return (
      <>

        {isLoggedIn  ? null : (

            <section className="login-section">
              <Container maxWidth="xl">
                <div className="login-section__wrapper">
                  <div className="login-text__wrapper">
                    <h2 className="login-title">facebook</h2>
                    <p className="login-subtitle">
                      Facebook helps you stay connected and communicate with
                      your friends.
                    </p>
                  </div>
                  {!recentLogin
                      ? null
                      : recentLogin.map((elem, i) => {
                        <div key={i}>
                          <img src={elem.src} alt={elem.photo} />
                          <p>{elem.userName}</p>
                        </div>;
                      })}
                  <form action="#" className="login-form">
                    <TextField
                        name="email"
                        onChange={loginForm.handleChange}
                        error={!!loginForm.errors.email}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.existingEmail}
                        id="userEmail"
                        label="Email"
                        variant={"outlined"}
                        fullWidth
                    />
                    {loginForm.touched.email && loginForm.errors.email ? (
                        <p>Неверная почта или номер телефона</p>
                    ) : null}
                    <TextField
                        name="password"
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        value={loginForm.values.existingPassword}
                        id="password"
                        label="Password"
                        error={!!loginForm.errors.password}
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end">
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                          ),
                        }}
                    />
                    {loginForm.touched.password && loginForm.errors.password ? (
                        <p>Некоректный пароль</p>
                    ) : null}
                    <Button
                        className="form-btn"
                        variant="contained"
                        type="submit"
                        onClick={loginForm.handleSubmit}>
                      Login
                    </Button>
                    <p className="red" >{message}</p>
                    <button className="forgot-pass-btn" onClick={handleForgot}>
                      Forgot account?
                    </button>
                    <p className="div-line__wrapper">
                      <span className="div-line">или</span>
                    </p>
                    <Button
                        onClick={handleRegisterModal}
                        className="create--btn"
                        variant="contained"
                        color="success">
                      Create new account
                    </Button>
                    <a
                        className="google_link"
                        href={
                          `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`
                        }
                        onClick={async () => {

                       //   if(navigator.userAgent.slice(102,108) === "Safari"){   }
                            dispatch(setLogin());


                          await axios.post(
                              `${import.meta.env.VITE_APP_API_URL}/api/auth`,
                              { email: url }
                          );

                        }} >
                      Login with Google
                    </a>
                    <br />
                  </form>
                </div>
              </Container>
            </section>
        )}
        <RegisterModal modal={registerModal} handleModal={handleRegisterModal} />
      </>
  );
}

