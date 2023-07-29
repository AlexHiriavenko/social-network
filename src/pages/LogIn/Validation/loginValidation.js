import * as Yup from "yup";

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email or phone number is required")
    .test("emailOrPhone", "Invalid email or phone number", function (value) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      const phoneRegex = /^\+?[0-9]{6,}$/;

      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: Yup.string().required("Password is required").min(1),
});
export default loginValidation;
