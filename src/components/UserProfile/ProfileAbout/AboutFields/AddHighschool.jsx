import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SchoolIcon from "@mui/icons-material/School";
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";
import {
  ProfileAboutInfoBlock,
  ProfileAboutInfoForm,
  ProfileAboutInfoFormCheckboxLabel,
  ProfileAboutInfoFormInputName,
  ProfileAboutInfoFormSeparator,
  ProfileAboutInfoFormTextField,
  ProfileAboutInfoFormTimePeriod,
  ProfileAboutInfoText,
  ProfileSaveInfoButton,
} from "../../StyledComponents/ContentBlock/StyledAboutComponents";
import ProfilePageButton from "../../ProfilePageButton/ProfilePageButton";

const mockInfo = {
  school: "CYL",
  graduated: false,
  timeFrom: 2022,
  timeTo: 2023,
};

const HighSchoolSchema = Yup.object().shape({
  school: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("School is required"),
  graduated: Yup.boolean().required("required"),
  timeFrom: Yup.number().required("Required"),
  timeTo: Yup.number().required("Required"),
});

export default function AddHighschool() {
  // States
  const [info, setInfo] = useState({});
  const [isEdit, setInputStatus] = useState(false);

  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      school: "",
      graduated: true,
      timeFrom: "",
      timeTo: "",
      description: "",
    },
    validationSchema: HighSchoolSchema,
    onSubmit: (values) => {
      if (values.timeFrom > values.timeTo) return;
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
      school: "",
      graduated: true,
      timeFrom: "",
      timeTo: "",
      description: "",
    });
  }
  // useEffects
  useEffect(() => {
    setInfo(mockInfo);
  }, []);

  useEffect(() => {
    if (!info) return;
    formik.setValues({
      school: info.school,
      graduated: info.graduated,
      timeFrom: info.timeFrom,
      timeTo: info.timeTo,
      description: info.description,
    });
  }, [info]);

  if (!isEdit) {
    return (
      <Box>
        {!info ? (
          <AddInfoAbout text={"Add high school"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <SchoolIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>
                Went to <span style={{ fontWeight: 600 }}>{info.school}</span>
              </ProfileAboutInfoText>
              <ProfileAboutInfoText>
                Attended from {info.timeFrom} to {info.timeTo}
              </ProfileAboutInfoText>
            </Box>
            <ChangenInfoButton
              infoName={"high school"}
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
            name="school"
            label="School"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.school}
          />
          <ProfileAboutInfoFormInputName>
            Time period
          </ProfileAboutInfoFormInputName>

          <ProfileAboutInfoFormTimePeriod>
            <p>from</p>
            <FormControl sx={{ minWidth: "76px" }} size="small">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={formik.handleChange}
                value={formik.values.timeFrom}
                name="timeFrom"
              >
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
                <MenuItem value={2013}>2013</MenuItem>
                <MenuItem value={2012}>2012</MenuItem>
                <MenuItem value={2011}>2011</MenuItem>
                <MenuItem value={2010}>2010</MenuItem>
                <MenuItem value={2009}>2009</MenuItem>
                <MenuItem value={2008}>2008</MenuItem>
                <MenuItem value={2007}>2007</MenuItem>
                <MenuItem value={2006}>2006</MenuItem>
                <MenuItem value={2005}>2005</MenuItem>
                <MenuItem value={2004}>2004</MenuItem>
              </Select>
            </FormControl>
            <p>to</p>
            <FormControl sx={{ minWidth: "76px" }} size="small">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={formik.handleChange}
                value={formik.values.timeTo}
                name="timeTo"
              >
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2017}>2017</MenuItem>
                <MenuItem value={2016}>2016</MenuItem>
                <MenuItem value={2015}>2015</MenuItem>
                <MenuItem value={2014}>2014</MenuItem>
                <MenuItem value={2013}>2013</MenuItem>
                <MenuItem value={2012}>2012</MenuItem>
                <MenuItem value={2011}>2011</MenuItem>
                <MenuItem value={2010}>2010</MenuItem>
                <MenuItem value={2009}>2009</MenuItem>
                <MenuItem value={2008}>2008</MenuItem>
                <MenuItem value={2007}>2007</MenuItem>
                <MenuItem value={2006}>2006</MenuItem>
                <MenuItem value={2005}>2005</MenuItem>
                <MenuItem value={2004}>2004</MenuItem>
              </Select>
            </FormControl>
          </ProfileAboutInfoFormTimePeriod>
          <ProfileAboutInfoFormCheckboxLabel
            control={
              <Checkbox
                onChange={formik.handleChange}
                checked={formik.values.graduated}
                name="graduated"
              />
            }
            label="Graduated"
          />
          <ProfileAboutInfoFormTextField
            fullWidth
            rows={4}
            name="description"
            label="Description"
            InputProps={{
              style: {
                minHeight: "100px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "vertical",
              },
            }}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <ProfileAboutInfoFormSeparator></ProfileAboutInfoFormSeparator>
          <ProfilePageButton text={"Cancel"} clickAction={edit} />
          <ProfileSaveInfoButton text={"Save"} clickAction={edit} />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
