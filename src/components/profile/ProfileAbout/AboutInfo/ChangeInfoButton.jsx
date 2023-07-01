import { useState } from "react";
import styles from "./aboutInfo.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ChangenInfoButton({ infoName, edit, remove }) {
  const [changeMenuState, setChangeMenuState] = useState(false);
  return (
    <>
      <button
        className={styles.change_btn}
        onClick={() => setChangeMenuState(!changeMenuState)}
      >
        <span className={styles.change_btn__dot}></span>
        <span className={styles.change_btn__dot}></span>
        <span className={styles.change_btn__dot}></span>
      </button>
      <ul
        className={styles.change_btn__menu}
        style={{ display: !changeMenuState ? "none" : "block" }}
      >
        <li className={styles.change_btn__menu_item} onClick={edit}>
          <EditIcon sx={{ color: "#121212" }} /> Edit {infoName}
        </li>
        <li className={styles.change_btn__menu_item} onClick={remove}>
          <DeleteIcon sx={{ color: "#121212" }} /> Delete {infoName}
        </li>
      </ul>
    </>
  );
}
