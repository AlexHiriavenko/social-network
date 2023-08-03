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

export default function RegisterModal(props) {
  const dispatch = useDispatch();
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
    onSubmit: () => {
      dispatch(
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
  const { modal, handleModal } = props;
  return (
    <>
      <Modal
        open={modal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "auto", outline: "0" }}>
        <Box className="form__wrapper">
          <h2 className="register-title">Регистрация</h2>
          <p className="register-subtitle">Быстро и легко.</p>
          <Box className="register-form__row-inputs">
            <form action="#" className="register-form">
              <TextField
                id="name"
                onBlur={registerForm.handleBlur}
                error={!!registerForm.errors.name}
                name="name"
                required
                label="Имя"
                value={registerForm.values.name}
                onChange={registerForm.handleChange}
                variant="outlined"
                style={{ flexGrow: "1" }}
              />
              <TextField
                id="surname"
                required
                label="Фамилия"
                error={!!registerForm.errors.surname}
                name="surname"
                value={registerForm.values.surname}
                onChange={registerForm.handleChange}
                variant="outlined"
              />

              <TextField
                label="Номер мобильного телефона или эл.адрес"
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
                label="Новый пароль"
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
                    <TextField {...params} label="День" />
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
                    <TextField {...params} label="Месяц" />
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
                    <TextField {...params} label="Год" />
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
                    label="Мужчина"
                  />
                  <FormControlLabel
                    value="w"
                    control={<Radio color="secondary" />}
                    label="Женщина"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Другое"
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
                Регистрация
              </Button>
            </form>
          </Box>
          <p className="form-footer-text">
            Люди, которые пользуются нашим сервисом, могли загрузить вашу
            контактную информацию на Facebook.{" "}
            <Link href="https://www.facebook.com/help/637205020878504">
              Подробнее
            </Link>
          </p>
          <p className="form-footer-text">
            Нажимая кнопку 'Регистрация', вы принимаете наши Условия
            использования, Политику конфиденциальности и Политику в отношении
            файлов cookie. Вы можете получать от нас SMS-уведомления, отказаться
            от которых можно в любой момент.
          </p>
        </Box>
      </Modal>
    </>
  );
}
