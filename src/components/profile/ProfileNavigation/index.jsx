import { useState } from "react";
import styles from "./profile-navigation.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ProfileNavigation() {
  const [listStatus, setListStatus] = useState(false);

  function setActiveItem(e) {
    const navList = e.target.closest("nav");
    if (e.target === navList) return;
    const links = Array.prototype.slice.call(navList.children);
    links.find((link) => link.dataset.active).removeAttribute("data-active");
    e.target.setAttribute("data-active", true);
  }
  function toggleList() {
    setListStatus(!listStatus);
  }
  return (
    <div className={styles.profile__nav_container}>
      <nav
        className={`${styles.profile__nav} ${
          listStatus ? styles.profile__nav_open : ""
        }`}
        onClick={(e) => setActiveItem(e)}
      >
        <a href="#" data-active={true} className={styles.profile__nav_item}>
          Posts
        </a>
        <a href="#" className={styles.profile__nav_item}>
          About
        </a>
        <a href="#" className={styles.profile__nav_item}>
          Friends
        </a>
        <a href="#" className={styles.profile__nav_item}>
          Photos
        </a>
      </nav>
      <a
        href="#"
        className={styles.profile__more_btn}
        onClick={toggleList}
        id="showMore"
      >
        More
        <ArrowDropDownIcon color="dark" />
      </a>
    </div>
  );
}
