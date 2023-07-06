import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import styles from "./AboutFields.module.scss";
import EditFormButton from "../EditFormButton";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import RoomIcon from '@mui/icons-material/Room';
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";

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
      <li>
        {!info ? (
          <AddInfoAbout text={"Add hometown"} clickAction={edit} />
        ) : (
          <div className={styles.about__info_block}>
            <RoomIcon
              sx={{ color: "#808080", width: "36px", height: "36px" }}
            />
            <div style={{ width: "100%" }}>
              <p className={styles.about_info__text}>
                From <span style={{ fontWeight: 600 }}>{info.hometown}</span>
              </p>
              
            </div>
            <ChangenInfoButton
              infoName={"hometown"}
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
            name="hometown"
            label="Hometown"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.hometown}
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
