import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import styles from "./AboutFields.module.scss";
import EditFormButton from "../EditFormButton";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import HomeIcon from '@mui/icons-material/Home';
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";

const mockInfo = {
  currentCity: "Cologne"
};

const CurrentCitySchema = Yup.object().shape({
    currentCity: Yup.string()
    .min(2, "Must be a valid name")
    .max(25, "Must be a valid name")
    .required("City is required"),
});

export default function CurrentCity() {
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
      <li>
        {!info ? (
          <AddInfoAbout text={"Add current city"} clickAction={edit} />
        ) : (
          <div className={styles.about__info_block}>
            <HomeIcon
              sx={{ color: "#808080", width: "36px", height: "36px" }}
            />
            <div style={{ width: "100%" }}>
              <p className={styles.about_info__text}>
                Live in <span style={{ fontWeight: 600 }}>{info.currentCity}</span>
              </p>
              
            </div>
            <ChangenInfoButton
              infoName={"current city"}
              edit={edit}
              remove={removeInfo}
            />
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
            name="currentCity"
            label="Current city"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.currentCity}
          />
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
