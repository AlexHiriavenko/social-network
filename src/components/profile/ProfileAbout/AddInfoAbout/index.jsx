import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PropTypes from "prop-types";
import styles from "./addInfoAbout.module.scss";

export default function AddInfoAbout({ text, clickAction }) {
  return (
    <button className={styles.add_info_btn} onClick={clickAction}>
      <AddCircleOutlineIcon sx={{ color: "#1876f2", width: 36, height: 36 }} />
      {text}
    </button>
  );
}

AddInfoAbout.defaultProps = {
  clickAction: () => {},
};

AddInfoAbout.propTypes = {
  text: PropTypes.string,
  clickAction: PropTypes.func,
};
