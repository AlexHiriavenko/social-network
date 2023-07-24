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

const mockInfo = {
  currentCity: "Cologne",
};

const CurrentCitySchema = Yup.object().shape({
  currentCity: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("City is required"),
});

export default function AddCurrentCity() {
  // States
  const [info, setInfo] = useState({});
  const [isEdit, setInputStatus] = useState(false);

  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      currentCity: "",
    },
    validationSchema: CurrentCitySchema,
    onSubmit: (values) => {
      setInfo(values);
      edit();
    },
  });

  // Functions
  function edit() {
    setInputStatus(!isEdit);
  }

  function removeInfo() {
    setInfo(null);
    formik.setValues({
      currentCity: "",
    });
  }
  // useEffects
  useEffect(() => {
    setInfo(mockInfo);
  }, []);

  useEffect(() => {
    if (!info) return;
    formik.setValues({
      currentCity: info.currentCity,
    });
  }, [info]);

  if (!isEdit) {
    return (
      <Box>
        {!info ? (
          <AddInfoAbout text={"Add current city"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <HomeIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>
                Live in{" "}
                <span style={{ fontWeight: 600 }}>{info.currentCity}</span>
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
          <ProfilePageButton text={"Cancel"} clickAction={edit} />
          <ProfileSaveInfoButton text={"Save"} clickAction={edit} />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
