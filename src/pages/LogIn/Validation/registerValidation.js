import * as Yup from "yup";
const registerValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я повинно містити принаймні 2 символи")
    .required("Ім'я обов'язкове поле"),
  surname: Yup.string()
    .min(2, "Прізвище повинно містити принаймні 2 символи")
    .required("Прізвище обов'язкове поле"),
  day: Yup.number().required("обов'язкове поле"),
  year: Yup.number().required("Рік обов'язкове поле"),
  mounth: Yup.string().required(" обов'язкове поле"),
  emailOrPhone: Yup.string()
    .matches(
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      "Неправильний формат електронної пошти"
    )
    .min(6, "Електронна пошта повинна містити принаймні 6 символів")
    .required("Електронна пошта обов'язкове поле"),
  password: Yup.string()
    .min(8, "Пароль повинен містити принаймні 8 символів")
    .required("Пароль обов'язкове поле"),
  gender: Yup.string()
    .oneOf(["w", "m", "other"], "Невірно вибрана стать")
    .required("Стать обов'язкове поле"),
});
export default registerValidation;
