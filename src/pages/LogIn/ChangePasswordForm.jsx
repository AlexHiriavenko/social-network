import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import {useDispatch} from "react-redux";
import {changePassword} from "../../redux/login.slice/login.slice.js";
import {  useNavigate } from "react-router-dom";

export default function ChangePasswordForm() {

const dispatch = useDispatch();
const navigate = useNavigate();

    const changePasswordForm = useFormik({
        initialValues: {
            newPassword: "",
            code:""
        },
        //validationSchema: forgotValidation,
        onSubmit: async() => {
          const status = await  dispatch(changePassword({code:changePasswordForm.values.code,newPassword: changePasswordForm.values.newPassword}))

                navigate('/')

            return console.log({
                code:changePasswordForm.values.code,
                newPassword: changePasswordForm.values.newPassword,
            });

        },
    });

    return (
        <>

            <Box className="form__wrapper">
                <h2 className="register-title">Вoccтановление пароля</h2>
                <Box className="form-modal">
                    <form className="change_password-form">
                        <TextField
                            id="code"
                            onBlur={changePasswordForm.handleBlur}

                            name="code"
                            required
                            label="Введите код из электронного письма"
                            fullWidth
                            value={changePasswordForm.values.code}
                            onChange={changePasswordForm.handleChange}
                            variant="outlined"
                        />
                        <TextField
                            id="newPassword"
                            onBlur={changePasswordForm.handleBlur}

                            name="newPassword"
                            required
                            label="Ваш новый пароль"
                            fullWidth
                            value={changePasswordForm.values.newPassword}
                            onChange={changePasswordForm.handleChange}
                            variant="outlined"
                        />
                        <Button
                            onClick={changePasswordForm.handleSubmit}
                            className="form-btn create--btn"
                            variant="contained"
                            type="submit"
                            color="success"
                            style={{ alignSelf: "center" }}>
                            Отправить
                        </Button></form>
                    <Button
                        onClick={()=>{
                            navigate('/')
                        }}
                        className="form-btn create--btn"
                        variant="contained"
                        color="grey"
                        style={{ alignSelf: "center",marginLeft:"-15px"  }}>
                        На главную
                    </Button>
                </Box>
            </Box>

        </>
    );
}
