import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const ProfileContainer = styled(Box)({
  maxWidth: "1095px",
  marginLeft: "auto",
  marginRight: "auto",
});

const ContentBlock = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.section,
  borderRadius: 12,
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

const ContentBlockHeader = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
});

const ContentBlockTitel = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  color: theme.palette.textColor.main,
  paddingTop: "20px",
  paddingLeft: "16px",
  fontWeight: 700,
  fontFamily: "sans-serif",
}));

const ContentBlockLink = styled(Link)(({ theme }) => ({
  color: "#1876f2",
  marginTop: "12px",
  marginRight: "16px",
  fontFamily: "sans-serif",
  padding: "8px",
  borderRadius: "5px",
  transitionDuration: "500ms",
  "&:hover": {
    backgroundColor: theme.palette.accentColor.secondary,
  },
}));

const ContentBlockList = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  justifyContent: "space-between",
  marginTop: "16px",
  width: "100%",
  gap: "4px",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingBottom: "20px",
});

const BlockUserImage = styled("img")({
  objectFit: "cover",
  borderRadius: "50%",
});
export {
  ContentBlock,
  ProfileContainer,
  ContentBlockTitel,
  ContentBlockLink,
  ContentBlockList,
  ContentBlockHeader,
  BlockUserImage,
};
