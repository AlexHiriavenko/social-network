import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import registerValidation from "./registerValidation";
import { Link } from "react-router-dom";

export default function RegisterModal(props) {
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
          </Box>
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
            error={!!registerForm.errors.password}
            name="password"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            variant="outlined"
            type="password"
            fullWidth
          />
          <FormControl>
            <InputLabel htmlFor="day">День</InputLabel>
            <Select
              id="day"
              required
              error={!!registerForm.errors.day}
              name="day"
              value={registerForm.values.day}
              onChange={registerForm.handleChange}
              fullWidth>
              {Array.from({ length: 31 }, (_, index) => (
                <MenuItem key={index} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="mounth">Месяц</InputLabel>
            <Select
              id="mounth"
              required
              error={!!registerForm.errors.mounth}
              name="mounth"
              value={registerForm.values.mounth}
              onChange={registerForm.handleChange}
              fullWidth>
              <MenuItem value={"янв"}>янв</MenuItem>
              <MenuItem value={"фев"}>фев</MenuItem>
              <MenuItem value={"март"}>март</MenuItem>
              <MenuItem value={"апр"}>апр</MenuItem>
              <MenuItem value={"мая"}>мая</MenuItem>
              <MenuItem value={"июн"}>июн</MenuItem>
              <MenuItem value={"июл"}>июл</MenuItem>
              <MenuItem value={"авг"}>авг</MenuItem>
              <MenuItem value={"сент"}>сент</MenuItem>
              <MenuItem value={"окт"}>окт</MenuItem>
              <MenuItem value={"нояб"}>нояб</MenuItem>
              <MenuItem value={"дек"}>дек</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="year">Год</InputLabel>
            <Select
              id="year"
              required
              error={!!registerForm.errors.year}
              name="year"
              value={registerForm.values.year}
              onChange={registerForm.handleChange}
              fullWidth>
              {Array.from({ length: 100 }, (_, index) => (
                <MenuItem key={index} value={index + 1922}>
                  {index + 1922}
                </MenuItem>
              ))}
            </Select>
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
              <FormControlLabel value="m" control={<Radio />} label="Мужчина" />
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
          <Button
            onClick={registerForm.handleSubmit}
            className="form-btn create--btn "
            variant="contained"
            type="submit"
            color="success"
            fullWidth>
            Регистрация
          </Button>
        </Box>
      </Modal>
    </>
  );
}
