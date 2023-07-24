import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";
import { ProfileAboutInfoBlock, ProfileAboutInfoForm, ProfileAboutInfoFormSeparator, ProfileAboutInfoFormTextField, ProfileAboutInfoText, ProfileSaveInfoButton } from "../../StyledComponents/ContentBlock/StyledAboutComponents";
import ProfilePageButton from "../../ProfilePageButton/ProfilePageButton";

const mockInfo = {
  phoneNumber: "+380 65 6336378"
};

const PhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number required"),
});

export default function AddPhoneNumber() {
  // States
  const [info, setInfo] = useState({});
  const [isEdit, setInputStatus] = useState(false);

  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: PhoneNumberSchema,
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
      phoneNumber: "",
    });
  }
  // useEffects
  useEffect(() => {
    setInfo(mockInfo);
  }, []);

  useEffect(() => {
    if (!info) return;
    formik.setValues({
      phoneNumber: info.phoneNumber,
    });
  }, [info]);

  if (!isEdit) {
    return (
      <Box>
        {!info ? (
          <AddInfoAbout text={"Add phone number"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <LocalPhoneIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>{info.phoneNumber}</ProfileAboutInfoText>
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
          ref={formRef}
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
          <ProfilePageButton text={"Cancel"} clickAction={edit} />
          <ProfileSaveInfoButton text={"Save"} clickAction={edit} />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
