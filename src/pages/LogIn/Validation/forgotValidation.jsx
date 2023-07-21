import * as Yup from "yup";
const forgotValidation = Yup.object().shape({
  emailOrPhone: Yup.string()
    .matches(
      /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      "Неправильний формат електронної пошти"
    )
    .min(6, "Електронна пошта повинна містити принаймні 6 символів")
    .required("Електронна пошта обов'язкове поле"),
});
export default forgotValidation;
