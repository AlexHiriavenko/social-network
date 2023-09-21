import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {setAuthorizedUser, setUser, updateUser} from "../../../redux/user.slice/user.slice";


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
const StyledIntroBioWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  rowGap: "10px",
  columnGap: "5px",
  justifyContent: "flex-end",
});
export default function IntroBio({edit, userAbout, setEditState}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const formik = useFormik({
    initialValues: {
      about: userAbout,
    },
    onSubmit: (values) => {
      const updatedUser = { ...user };
      updatedUser.about = values.about;
      updatedUser.city = updatedUser.city   ?   updatedUser.city : '';
      updatedUser.country = updatedUser.country   ?   updatedUser.country : '';
      updatedUser.workPlace  = updatedUser.workPlace    ?   updatedUser.workPlace : '';
      updatedUser.profilePicture = updatedUser.profilePicture ?   updatedUser.profilePicture : '';
      dispatch(updateUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("authorizedUser", JSON.stringify(updatedUser));
      dispatch(setUser(updatedUser));
      dispatch(setAuthorizedUser(updatedUser));


      setEditState();
    },
  });
 
  function resetForm() {
    formik.setValues({
      about: userAbout,
    });
    setEditState();
  }
  useEffect(()=>{
    formik.setValues({
      about: userAbout,
    });
  }, [userAbout])
  return (
    <StyledIntroLink>
      {edit && (
        <StyledIntroBioWrapper>
          <StyledIntroTextarea
            maxLength="100"
            type="text"
            placeholder="Describe who are you"
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
          />
          <ProfilePageButton
            text={"Cancel"}
            clickAction={resetForm}
          />
          <ProfilePageButton
            text={"Save"}
            style={{ color: "#FFFFFF", backgroundColor: "#1B74E4" }}
            clickAction={formik.handleSubmit}
          />
        </StyledIntroBioWrapper>
      )}
    </StyledIntroLink>
  );
}
