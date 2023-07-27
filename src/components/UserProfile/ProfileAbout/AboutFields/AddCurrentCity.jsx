import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import HomeIcon from "@mui/icons-material/Home";
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";
import {
  ProfileAboutInfoBlock,
  ProfileAboutInfoForm,
  ProfileAboutInfoFormSeparator,
  ProfileAboutInfoFormTextField,
  ProfileAboutInfoText,
  ProfileSaveInfoButton,
} from "../../StyledComponents/ContentBlock/StyledAboutComponents";
import ProfilePageButton from "../../ProfilePageButton/ProfilePageButton";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateUser } from "../../../../redux/user.slice/user.slice";

const CurrentCitySchema = Yup.object().shape({
  currentCity: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("City is required"),
});

export default function AddCurrentCity() {
  // States
  const [currentCity, setCurrentCity] = useState(null);
  const [isEdit, setInputStatus] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      currentCity: "",
    },
    validationSchema: CurrentCitySchema,
    onSubmit: (values) => {
      setCurrentCity(values.currentCity);
      const updatedUser = { ...user };
      updatedUser.city = values.currentCity;
      dispatch(updateUser(updatedUser));
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      edit();
    },
  });

  // Functions
  function edit() {
    setInputStatus(!isEdit);
  }

  function removeInfo() {
    setCurrentCity(null);
    const updatedUser = { ...user };
    updatedUser.city = null;
    dispatch(updateUser(updatedUser));
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    formik.setValues({
      currentCity: "",
    });
  }
  function resetForm() {
    formik.setValues({
      currentCity: user.city,
    });
    edit();
  }
  
  // useEffects
  useEffect(() => {
    setCurrentCity(user.city);
  }, [user]);

  useEffect(() => {
    if (!currentCity) return;
    formik.setValues({
      currentCity: currentCity,
    });
  }, [currentCity]);

  if (!isEdit) {
    return (
      <Box>
        {!currentCity ? (
          <AddInfoAbout text={"Add current city"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <HomeIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>
                Live in
                <span style={{ fontWeight: 600 }}> {currentCity}</span>
              </ProfileAboutInfoText>
            </Box>
            <ChangenInfoButton
              infoName={"current city"}
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
        <ProfileAboutInfoForm onSubmit={formik.handleSubmit} ref={formRef}>
          <ProfileAboutInfoFormTextField
            fullWidth
            id="outlined-basic"
            name="currentCity"
            label="Current city"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.currentCity}
          />
          <ProfileAboutInfoFormSeparator></ProfileAboutInfoFormSeparator>
          <ProfilePageButton text={"Cancel"} clickAction={resetForm} />
          <ProfileSaveInfoButton
            text={"Save"}
            clickAction={formik.handleSubmit}
          />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
