import {Box, Button, IconButton, InputAdornment, TextField} from "@mui/material";
import { useFormik } from "formik";
import {useDispatch} from "react-redux";
import {changePassword} from "../../redux/login.slice/login.slice.js";
import {  useNavigate } from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

export default function ChangePasswordForm() {

const dispatch = useDispatch();
const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const changePasswordForm = useFormik({
        initialValues: {
            newPassword: "",
            code:""
        },
        //validationSchema: forgotValidation,
        onSubmit: async() => {
          const status = await  dispatch(changePassword({code:changePasswordForm.values.code,newPassword: changePasswordForm.values.newPassword}))

                navigate('/')

            return status

        },
    });

    return (
        <>

            <Box className="form__wrapper">
                <h2 className="register-title">Password recover</h2>
                <Box className="form-modal">
                    <form className="change_password-form">
                        <TextField
                            id="code"
                            onBlur={changePasswordForm.handleBlur}

                            name="code"
                            required
                            label="Check your email and enter code from letter"
                            fullWidth
                            value={changePasswordForm.values.code}
                            onChange={changePasswordForm.handleChange}
                            variant="outlined"
                        />
                        <TextField
                            name="newPassword"
                            onChange={changePasswordForm.handleChange}
                            onBlur={changePasswordForm.handleBlur}
                            value={changePasswordForm.values.newPassword}
                            id="newPassword"
                            label="Enter your new password"

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

                        <Button
                            onClick={changePasswordForm.handleSubmit}
                            className="form-btn create--btn"
                            variant="contained"
                            type="submit"
                            color="success"
                            style={{ alignSelf: "center" }}>
                            Change password
                        </Button></form>
                    <Button
                        onClick={()=>{
                            navigate('/')
                        }}
                        className="form-btn create--btn"
                        variant="contained"
                        color="grey"
                        style={{ alignSelf: "center",marginLeft:"-15px"  }}>
                        Return to home page
                    </Button>
                </Box>
            </Box>

        </>
    );
}
