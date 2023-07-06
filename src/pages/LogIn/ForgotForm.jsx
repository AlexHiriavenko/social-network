import { Box, Button, Modal, TextField } from "@mui/material";
import modalStyle from "./modalStyle";
import forgotValidation from "./forgotValidation";
import { useFormik } from "formik";

export default function ForgotForm(props) {
  const { modal, handleModal } = props;

  const forgotForm = useFormik({
    initialValues: {
      emailOrPhone: "",
    },
    validationSchema: forgotValidation,
    onSubmit: () => {
      return console.log({
        emailOrPhone: forgotForm.values.emailOrPhone,
      });
    },
  });

  return (
    <>
      <Modal
        open={modal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "auto", outline: "0" }}>
        <Box className="form__wrapper">
          <h2 className="register-title">Забыли пароль?</h2>
          <Box className="form-modal">
            <TextField
              id="emailOrPhone"
              onBlur={forgotForm.handleBlur}
              error={!!forgotForm.errors.emailOrPhone}
              name="emailOrPhone"
              required
              label="Ваш почтовый ящик или телефон"
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
              Отправить письмо
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
