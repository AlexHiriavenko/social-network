import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import ProfilePageButton from "../../ProfilePageButton/ProfilePageButton";

const ProfileAboutInfoTitle = styled(Typography)(({ theme }) => ({
  fontSize: "17px",
  color: theme.palette.textColor.main,
  fontWeight: 600,
}));

const ProfileAboutAddInfo = styled(Button)({
  color: "#1872f2",
  fontSize: "15px",
  fontWeight: 600,
  textTransform: "inherit",
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  paddingLeft: 0,
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
});

const ProfileAboutInfoBlock = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "relative",
  columnGap: "10px",
});

const ProfileAboutInfoText = styled(Typography)(({ theme }) => ({
  width: "100%",
  color: theme.palette.textColor.main,
}));

const ProfileAboutInfoForm = styled("form")({
  display: "flex",
  flexWrap: "wrap",
  rowGap: "10px",
  columnGap: "5px",
  fontFamily: "sans-serif",
});

const ProfileAboutInfoFormSeparator = styled("span")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "1px",
  backgroundColor: theme.palette.backgroundColor.pageSeparator,
}));
const ProfileAboutInfoFormInputName = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontSize: "15px",
  color: theme.palette.textColor.main,
  fontWeight: 600,
  fontFamily: "sans-serif",
}));
const ProfileAboutInfoFormTimePeriod = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  rowGap: "10px",
  columnGap: "5px",
  width: "100%",
  alignItems: "center",
  color: theme.palette.textColor.main,
  "& div": {
    color: theme.palette.textColor.main,
  },
  "& label": {
    color: theme.palette.textColor.main,
  },
  "& fieldset": {
    borderColor: theme.palette.textColor.main,
  },
  "& svg": {
    color: theme.palette.textColor.main,
  },
}));

const ProfileAboutInfoFormTextField = styled(TextField)(({ theme }) => ({
  "& input": {
    color: theme.palette.textColor.main,
  },
  "& label": {
    color: theme.palette.textColor.main,
  },
  "& fieldset": {
    borderColor: theme.palette.textColor.main,
  },
}));

const ProfileAboutInfoFormCheckboxLabel = styled(FormControlLabel)(
  ({ theme }) => ({
    "& span": {
      color: theme.palette.textColor.main,
    },
  })
);

const ProfileSaveInfoButton = styled(ProfilePageButton)(({ theme }) => ({
  backgroundColor: theme.palette.accentColor.main,
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));

export {
  ProfileAboutInfoTitle,
  ProfileAboutAddInfo,
  ProfileAboutInfoBlock,
  ProfileAboutInfoText,
  ProfileAboutInfoForm,
  ProfileAboutInfoFormInputName,
  ProfileAboutInfoFormSeparator,
  ProfileAboutInfoFormTimePeriod,
  ProfileAboutInfoFormTextField,
  ProfileAboutInfoFormCheckboxLabel,
  ProfileSaveInfoButton,
};
