import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import registerValidation from "./Validation/registerValidation";
import { Link } from "react-router-dom";
import { dayOfBirth, yearOfBirth, mounthOfBirst } from "./registerOptions";
import { register } from "../../redux/login.slice/login.slice";
import { useDispatch } from "react-redux";
import {useState} from "react";

export default function RegisterModal(props) {
  const dispatch = useDispatch();
  const { modal, handleModal } = props;
  const [message,setMessage] = useState(null);
  const [errorMessage,setErrorMessage] = useState(null);

  const registerForm = useFormik({
    initialValues: {
      name: "",
      surname: "",
      day: "",
      mounth: "",
      year: "",
      emailOrPhone: "",
      password: "",
      gender: "",
    },
    validationSchema: registerValidation,
    onSubmit:async () => {
    const status  = await dispatch(
        register({
          name: registerForm.values.name,
          surname: registerForm.values.surname,
          day: registerForm.values.day,
          mounth: registerForm.values.mounth,
          year: registerForm.values.year,
          emailOrPhone: registerForm.values.emailOrPhone,
          password: registerForm.values.password,
          gender: registerForm.values.gender,
        })
      );

    if(status.type == 'Login/register/fulfilled'){
      setMessage("Account successfully created. Please check your email to activate your account")}
    else{setErrorMessage("Account with this email already exists")}
       window.setTimeout(()=>{
         handleModal()
         setMessage(null)
         setErrorMessage(null)

       },7000)

      return console.log({
        name: registerForm.values.name,
        surname: registerForm.values.surname,
        day: registerForm.values.day,
        mounth: registerForm.values.mounth,
        year: registerForm.values.year,
        emailOrPhone: registerForm.values.emailOrPhone,
        password: registerForm.values.password,
        gender: registerForm.values.gender,
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
          <h2 className="register-title">Registration</h2>
          <p className="register-subtitle"> Fast and comfortable</p>
          <Box className="register-form__row-inputs">
            <form action="#" className="register-form">
              <TextField
                id="name"
                onBlur={registerForm.handleBlur}
                error={!!registerForm.errors.name}
                name="name"
                required
                label="Name"
                value={registerForm.values.name}
                onChange={registerForm.handleChange}
                variant="outlined"
                style={{ flexGrow: "1" }}
              />
              <TextField
                id="surname"
                required
                label="Surname"
                error={!!registerForm.errors.surname}
                name="surname"
                value={registerForm.values.surname}
                onChange={registerForm.handleChange}
                variant="outlined"
              />

              <TextField
                label=" Email (please,enter real email)"
                required
                error={!!registerForm.errors.emailOrPhone}
                variant="outlined"
                value={registerForm.values.emailOrPhone}
                onChange={registerForm.handleChange}
                id="emailOrPhone"
                name="emailOrPhone"
                fullWidth
              />
              <TextField
                label="New password(min 8 signs)"
                id="password"
                required
                name="password"
                error={!!registerForm.errors.password}
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                variant="outlined"
                type="password"
                fullWidth
              />
              <FormControl>
                <Autocomplete
                  disablePortal
                  id="day"
                  required
                  onBlur={registerForm.handleBlur}
                  name="day"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={registerForm.values.day}
                  onChange={(event, newValue) => {
                    registerForm.setFieldValue("day", newValue);
                  }}
                  options={dayOfBirth}
                  renderInput={(params) => (
                    <TextField {...params} label="Day" />
                  )}
                />
              </FormControl>
              <FormControl>
                <Autocomplete
                  disablePortal
                  id="mounth"
                  required
                  onBlur={registerForm.handleBlur}
                  name="mounth"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  value={registerForm.values.mounth}
                  onChange={(event, newValue) => {
                    registerForm.setFieldValue("mounth", newValue);
                  }}
                  options={mounthOfBirst}
                  renderInput={(params) => (
                    <TextField {...params} label="Month" />
                  )}
                />
              </FormControl>
              <FormControl>
                <Autocomplete
                  disablePortal
                  id="year"
                  required
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  name="year"
                  value={registerForm.values.year}
                  onChange={(event, newValue) => {
                    registerForm.setFieldValue("year", newValue);
                  }}
                  options={yearOfBirth}
                  renderInput={(params) => (
                    <TextField {...params} label="Year" />
                  )}
                />
              </FormControl>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="gender"
                  required
                  name="gender"
                  error={!!registerForm.errors.gender}
                  id="gender"
                  value={registerForm.values.gender}
                  onChange={registerForm.handleChange}>
                  <FormControlLabel
                    value="m"
                    control={<Radio />}
                    label="Man"
                  />
                  <FormControlLabel
                    value="w"
                    control={<Radio color="secondary" />}
                    label="Woman"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                onClick={registerForm.handleSubmit}
                className="form-btn create--btn "
                variant="contained"
                type="submit"
                color="success"
                fullWidth>
                Create account
              </Button>
            </form>
          </Box>
          <h3 className="register_message">{message}</h3>
          <h3 className="red">{errorMessage}</h3>
          <p className="form-footer-text">
            People who use our service may have downloaded your
            contact information on Facebook.{" "}
            <Link href="https://www.facebook.com/help/637205020878504">
              Подробнее
            </Link>
          </p>
          <p className="form-footer-text">
            By clicking the Create account button, you accept our Terms and Conditions
            use, Privacy Policy and Privacy Policy
            cookies. You can receive SMS notifications from us, opt out
            from which you can at any time.
          </p>

        </Box>
      </Modal>
    </>
  );
}
