import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";
import { ProfileAboutInfoBlock, ProfileAboutInfoForm, ProfileAboutInfoFormSeparator, ProfileAboutInfoFormTextField, ProfileAboutInfoText, ProfileSaveInfoButton } from "../../StyledComponents/ContentBlock/StyledAboutComponents";
import ProfilePageButton from "../../ProfilePageButton/ProfilePageButton";
import { useDispatch, useSelector } from "react-redux";

const PhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number required"),
});

export default function AddPhoneNumber() {
  // States
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isEdit, setInputStatus] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // Form
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: PhoneNumberSchema,
    onSubmit: (values) => {
      setPhoneNumber(values.phoneNumber);
      edit();
    },
  });

  // Functions
  function edit() {
    setInputStatus(!isEdit);
  }

  function removeInfo() {
    setPhoneNumber(null);
    // const updatedUser = { ...user };
    // updatedUser.phoneNumber = null;
    // dispatch(updateUser(updatedUser));
    // dispatch(setUser(updatedUser));
    // localStorage.setItem("user", JSON.stringify(updatedUser));
    formik.setValues({
      phoneNumber: "",
    });
  }
  function resetForm() {
    formik.setValues({
      phoneNumber: user.phoneNumber,
    });
    edit();
  }
  // useEffects
  useEffect(() => {
    setPhoneNumber(user.phoneNumber);
  }, [user]);

  useEffect(() => {
    if (!phoneNumber) return;
    formik.setValues({
      phoneNumber: phoneNumber,
    });
  }, [phoneNumber]);

  if (!isEdit) {
    return (
      <Box>
        {!phoneNumber ? (
          <AddInfoAbout text={"Add phone number"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <LocalPhoneIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>{phoneNumber}</ProfileAboutInfoText>
              <ProfileAboutInfoText>Mobile</ProfileAboutInfoText>
            </Box>
            <ChangenInfoButton
              infoName={"phone number"}
              edit={edit}
              remove={removeInfo}
            />
          </ProfileAboutInfoBlock>
        )}
      </Box>
    );
  } else {
    return (
      <Box>
        <ProfileAboutInfoForm
          onSubmit={formik.handleSubmit}
        >
          <ProfileAboutInfoFormTextField
            fullWidth
            id="outlined-basic"
            name="phoneNumber"
            label="Phone number"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          <ProfileAboutInfoFormSeparator></ProfileAboutInfoFormSeparator>
          <ProfilePageButton text={"Cancel"} clickAction={resetForm} />
          <ProfileSaveInfoButton text={"Save"} clickAction={formik.handleSubmit} />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
