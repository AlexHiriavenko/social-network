import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import styles from "./AboutFields.module.scss";
import EditFormButton from "../EditFormButton";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserAboutInfo } from "../AboutInfo/UserAboutInfo";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";
import { info } from "sass";

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

// TODO: 
//  - add state mock info

export default function AddWorkplace() {
  const [isEdit, setInputStatus] = useState(false);
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
      if (values.timeFrom > values.timeTo) return;
      console.log(values);
    },
  });
  function edit() {
    setInputStatus(!isEdit);
  }
  useEffect(() => {
    console.log();
  }, [formik]);
  if (!isEdit) {
    return (
      <li>
        {!mockInfo ? (
          <AddInfoAbout text={"Add a workplace"} clickAction={edit} />
        ) : (
          <div className={styles.about__info_block}>
            <BusinessCenterIcon
              sx={{ color: "#808080", width: "36px", height: "36px" }}
            />
            <UserAboutInfo {...mockInfo} /> 
            <ChangenInfoButton infoName={"workplace"} edit={edit}/>
          </div>
        )}
      </li>
    );
  } else {
    return (
      <li>
        <form
          className={styles.about__form}
          onSubmit={formik.handleSubmit}
          ref={formRef}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            name="company"
            label="Company"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.company}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            name="position"
            label="Position"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.position}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            name="city"
            label="City"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <TextField
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
          <p className={styles.about__form_input_name}>Time period</p>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={formik.handleChange}
                value={formik.values.workNow}
                name="workNow"
              />
            }
            label="I currently work here"
          />
          <div className={styles.about__form_time_period}>
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
          </div>

          <span className={styles.about__form_separator}></span>
          <EditFormButton text={"Cancel"} clickAction={edit} type={"reset"} />
          <EditFormButton
            text={"Save"}
            type={"submit"}
            active={
              !(
                Object.keys(formik.errors).length === 0 &&
                formik.errors.constructor === Object
              )
            }
          />
        </form>
      </li>
    );
  }
}
