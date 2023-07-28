import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PropTypes from "prop-types";
import { ProfileAboutAddInfo } from "../../StyledComponents/ContentBlock/StyledAboutComponents";

export default function AddInfoAbout({ text, clickAction }) {
  return (
    <ProfileAboutAddInfo onClick={clickAction}>
      <AddCircleOutlineIcon sx={{ color: "#1876f2", width: 36, height: 36 }} />
      {text}
    </ProfileAboutAddInfo>
  );
}

AddInfoAbout.defaultProps = {
  clickAction: () => {},
  text: "",
};

AddInfoAbout.propTypes = {
  text: PropTypes.string,
  clickAction: PropTypes.func,
};
