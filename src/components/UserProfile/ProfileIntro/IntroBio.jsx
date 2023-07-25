import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

const StyledIntroLink = styled("div")({
  paddingTop: "16px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
});
const StyledIntroTextarea = styled("textarea")(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  borderRadius: "5px",
  outline: "none",
  border: `1px solid ${theme.palette.backgroundColor.pageSeparator}`,
  height: "77px",
  fontFamily: "sans-serif",
  backgroundColor: theme.palette.input.mainBackground,
  color: theme.palette.textColor.main,
  "&:focus": {
    border: `2px solid ${theme.palette.input.activeBorderColor}`,
  },
}));
const StyledIntroText = styled(Typography)(({ theme }) => ({
  color: theme.palette.textColor.main,
  textAlign: "center",
  marginRight: "50%",
  transform: "translateX(50%)",
  marginBottom: "10px",
}));
const StyledIntroBioWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  rowGap: "10px",
  columnGap: "5px",
  justifyContent: "flex-end",
});
export default function IntroBio() {
  const [isEdit, setInputStatus] = useState(false);
  const [userAbout, setUserAbout] = useState("");
  function editBio() {
    setInputStatus(!isEdit);
  }

  const user = useSelector((state) => state.user.user);

  const formik = useFormik({
    initialValues: {
      about: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    if (user && user.about) {
      setUserAbout(user.about);
      formik.values.about = user.about;
    }
  }, [user]);
  return (
    <StyledIntroLink>
      {!isEdit ? (
        <>
          <StyledIntroText>{userAbout}</StyledIntroText>
          <ProfilePageButton
            text={userAbout !== "" ? "Edit bio" : "Add bio"}
            clickAction={editBio}
            style={{ width: "100%" }}
          />
        </>
      ) : (
        <StyledIntroBioWrapper>
          <StyledIntroTextarea
            maxLength="100"
            type="text"
            placeholder="Describe who are you"
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
          />
          <ProfilePageButton text={"Cancel"} clickAction={editBio} />
          <ProfilePageButton
            text={"Save"}
            style={{ color: "#FFFFFF", backgroundColor: "#1B74E4" }}
          />
        </StyledIntroBioWrapper>
      )}
    </StyledIntroLink>
  );
}
