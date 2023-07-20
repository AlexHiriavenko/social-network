import PropTypes from "prop-types";
import styles from "./editFormButton.module.scss";

export default function EditFormButton({ text, clickAction, type, active }) {
  return (
    <button
      className={`${styles.edit_form_btn} ${
        type === "submit" ? styles.edit_form_btn_submit : ""
      }`}
      onClick={clickAction}
      type={type}
      disabled={active}
      data-active={active}
    >
      {text}
    </button>
  );
}

EditFormButton.defaultProps = {
  clickAction: () => {},
  type: "submit",
  active: false,
};

EditFormButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  clickAction: PropTypes.func,
  active: PropTypes.bool,
};
