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
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
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
  company: "Dan IT",
  position: "Frontend Developer",
  city: "Kyiv",
  workNow: false,
  timeFrom: 2022,
  timeTo: 2023,
};

const WorkplaceSchema = Yup.object().shape({
  company: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("Company is required"),
  position: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("Position is required"),
  city: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("City is required"),
  timeFrom: Yup.number().required("Required"),
  timeTo: Yup.number().when("workNow", {
    is: false,
    then: () => Yup.number().required("Required"),
  }),
  workNow: Yup.boolean(),
});


export default function AddWorkplace() {
  // States
  const [info, setInfo] = useState({});
  const [isEdit, setInputStatus] = useState(false);
  // Form
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      city: "",
      description: "",
      workNow: true,
      timeFrom: "",
      timeTo: "",
    },
    validationSchema: WorkplaceSchema,
    onSubmit: (values) => {
      if (typeof values.timeTo === "number" && values.timeFrom > values.timeTo)
        return;
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
      company: "",
      position: "",
      city: "",
      description: "",
      workNow: true,
      timeFrom: "",
      timeTo: "",
    });
  }
  // useEffects
  useEffect(() => {
    setInfo(mockInfo);
  }, []);

  useEffect(() => {
    if (!info) return;
    formik.setValues({
      company: info.company,
      position: info.position,
      city: info.city,
      description: info.description,
      workNow: info.workNow,
      timeFrom: info.timeFrom,
      timeTo: info.timeTo,
    });
  }, [info]);

  if (!isEdit) {
    return (
      <Box>
        {!info ? (
          <AddInfoAbout text={"Add a workplace"} clickAction={edit} />
        ) : (
          <ProfileAboutInfoBlock>
            <BusinessCenterIcon
              sx={{ color: "#727b87", width: "36px", height: "36px" }}
            />
            <Box style={{ width: "100%" }}>
              <ProfileAboutInfoText>
                {info.position} at {info.company}
              </ProfileAboutInfoText>
              <ProfileAboutInfoText>
                {info.timeFrom} to {info.workNow ? "present" : info.timeTo}
              </ProfileAboutInfoText>
            </Box>
            <ChangenInfoButton
              infoName={"workplace"}
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
            name="company"
            label="Company"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.company}
          />
          <ProfileAboutInfoFormTextField
            fullWidth
            id="outlined-basic"
            name="position"
            label="Position"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.position} 
          />
          <ProfileAboutInfoFormTextField
            fullWidth
            id="outlined-basic"
            name="city"
            label="City"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.city}
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
                resize: "vertical",
              },
            }}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <ProfileAboutInfoFormInputName>
            Time period
          </ProfileAboutInfoFormInputName>
          <ProfileAboutInfoFormCheckboxLabel
            control={
              <Checkbox
                onChange={formik.handleChange}
                checked={formik.values.workNow}
                name="workNow"
              />
            }
            label="I currently work here"
          />
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
            {!formik.values.workNow ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </ProfileAboutInfoFormTimePeriod>

          <ProfileAboutInfoFormSeparator></ProfileAboutInfoFormSeparator>
          <ProfilePageButton text={"Cancel"} clickAction={edit} />
          <ProfileSaveInfoButton text={"Save"} clickAction={edit} />
        </ProfileAboutInfoForm>
      </Box>
    );
  }
}
