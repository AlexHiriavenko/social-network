import { useEffect, useRef, useState } from "react";
import AddInfoAbout from "../AddInfoAbout";
import styles from "./AboutFields.module.scss";
import EditFormButton from "../EditFormButton";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ChangenInfoButton from "../AboutInfo/ChangeInfoButton";

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
      <li>
        {!info ? (
          <AddInfoAbout text={"Add phone number"} clickAction={edit} />
        ) : (
          <div className={styles.about__info_block}>
            <LocalPhoneIcon
              sx={{ color: "#808080", width: "36px", height: "36px" }}
            />
            <div style={{ width: "100%" }}>
              <p className={styles.about_info__text}>{info.phoneNumber}</p>
              <p className={styles.about_info__text}>Mobile</p>
            </div>
            <ChangenInfoButton
              infoName={"phone number"}
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
            name="phoneNumber"
            label="Phone number"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
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
