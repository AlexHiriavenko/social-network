import { styled } from "@mui/system";

const ProfileContainer = styled("div")({
  maxWidth: "1095px",
  marginLeft: "auto",
  marginRight: "auto",
});

const ContentBlock = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.backgroundColor.section,
  borderRadius: 12,
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

export { ContentBlock, ProfileContainer };
