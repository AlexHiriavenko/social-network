import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import RoomIcon from '@mui/icons-material/Room';
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";
import { ProfileAboutInfoBlock, ProfileAboutInfoForm, ProfileAboutInfoFormSeparator, ProfileAboutInfoFormTextField, ProfileAboutInfoText, ProfileSaveInfoButton } from "../../StyledComponents/ContentBlock/StyledAboutComponents";
import ProfilePageButton from "../../ProfilePageButton/ProfilePageButton";

const mockInfo = {
  hometown: "Dnipro"
};

const HometownSchema = Yup.object().shape({
    hometown: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("City is required"),
});

export default function AddHometown() {
  // States
  const [info, setInfo] = useState({});
  const [isEdit, setInputStatus] = useState(false);

  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
        hometown: "",
    },
    validationSchema: HometownSchema,
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
        hometown: "",
    });
  }
  // useEffects
  useEffect(() => {
    setInfo(mockInfo);
  }, []);

  useEffect(() => {
    if (!info) return;
    formik.setValues({
        hometown: info.hometown,
    });
  }, [info]);

  if (!isEdit) {
    return (
      <Box>
        {!info ? (
          <AddInfoAbout text={"Add hometown"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <RoomIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>
                From <span style={{ fontWeight: 600 }}>{info.hometown}</span>
              </ProfileAboutInfoText>
            </Box>
            <ChangenInfoButton
              infoName={"hometown"}
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
          ref={formRef}
        >
          <ProfileAboutInfoFormTextField
            fullWidth
            id="outlined-basic"
            name="hometown"
            label="Hometown"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.hometown}
          />
          <ProfileAboutInfoFormSeparator></ProfileAboutInfoFormSeparator>
          <ProfilePageButton text={"Cancel"} clickAction={edit} />
          <ProfileSaveInfoButton text={"Save"} clickAction={edit} />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
