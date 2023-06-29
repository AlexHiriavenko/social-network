import AddCurrentCity from "../../../components/Profile/ProfileAbout/AboutFields/AddCurrentCity";
import AddHometown from "../../../components/Profile/ProfileAbout/AboutFields/AddHometown";
import styles from "./profileAbout.module.scss";

export default function Places() {
  return (
    <>
      <p className={styles.profile_about__info_title}>Places lived</p>
      <AddCurrentCity />
      <AddHometown />
    </>
  );
}
