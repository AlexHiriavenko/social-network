import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import RoomIcon from "@mui/icons-material/Room";
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

const HometownSchema = Yup.object().shape({
  hometown: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("City is required"),
});

export default function AddHometown() {
  // States
  const [hometown, setHometown] = useState(null);
  const [isEdit, setInputStatus] = useState(false);
  const [isAuthorized, setAuthorized] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      hometown: "",
    },
    validationSchema: HometownSchema,
    onSubmit: (values) => {
      setHometown(values.hometown);
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
  function resetForm() {
    formik.setValues({
      hometown: hometown,
    });
    edit();
  }
  // useEffects
  useEffect(() => {
    setHometown(user.hometown);
    setAuthorized(user.isAuthorized);
  }, [user]);

  useEffect(() => {
    if (!hometown) return;
    formik.setValues({
      hometown: hometown,
    });
  }, [hometown]);

  if (!isAuthorized && !hometown) return;
  if (!isEdit) {
    return (
      <Box>
        {!hometown ? (
          <AddInfoAbout text={"Add hometown"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <RoomIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>
                From <span style={{ fontWeight: 600 }}>{hometown}</span>
              </ProfileAboutInfoText>
            </Box>
            {isAuthorized && (
              <ChangenInfoButton
                infoName={"hometown"}
                edit={edit}
                remove={removeInfo}
              />
            )}
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
            name="hometown"
            label="Hometown"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.hometown}
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
