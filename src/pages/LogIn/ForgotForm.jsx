import { Box, Button, Modal, TextField } from "@mui/material";
import forgotValidation from "./Validation/forgotValidation";
import { useFormik } from "formik";
import {useDispatch} from "react-redux";
import {sendEmail} from "../../redux/login.slice/login.slice.js";
import {  useNavigate } from "react-router-dom";

export default function ForgotForm(props) {
const dispatch = useDispatch();
const navigate = useNavigate()
  const { modal, handleModal } = props;
  const forgotForm = useFormik({
    initialValues: {
      emailOrPhone: "",
    },
    validationSchema: forgotValidation,
    onSubmit: () => {
      dispatch(sendEmail(forgotForm.values.emailOrPhone))
     navigate("/password")
      return console.log({
        emailOrPhone: forgotForm.values.emailOrPhone,
      });
    },
  });

  return (
    <>

        <Box className="form__wrapper">
          <h2 className="register-title">Forgot password?</h2>
          <Box className="form-modal">

            <form className="forgot-form">

            <TextField
              id="emailOrPhone"
              onBlur={forgotForm.handleBlur}
              error={!!forgotForm.errors.emailOrPhone}
              name="emailOrPhone"
              required
              label="Enter your email "
              fullWidth
              value={forgotForm.values.emailOrPhone}
              onChange={forgotForm.handleChange}
              variant="outlined"
            />
            <Button
              onClick={forgotForm.handleSubmit}
              className="form-btn create--btn"
              variant="contained"
              type="submit"
              color="success"
              style={{ alignSelf: "center" }}>
              Send change password letter
            </Button></form>
            <Button
                onClick={()=>{
                  navigate('/')
                }}
                className="form-btn create--btn"
                variant="contained"
                color="grey"
                style={{ alignSelf: "center",marginLeft:"-15px"}}>
              Return to home page
            </Button>
          </Box>
        </Box>

    </>
  );
}
/*<Modal
    open={modal}
    onClose={handleModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{ overflow: "auto", outline: "0" }}>     </Modal>*/