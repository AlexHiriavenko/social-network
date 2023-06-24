import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PropTypes from "prop-types";

export default function AddInfoAbout({ text, clickAction }) {
  return (
    <button
      style={{
        color: "#1872f2",
        fontSize: "15px",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
      }}
      onClick={clickAction}
    >
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
