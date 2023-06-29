import AddPhoneNumber from "../../../components/Profile/ProfileAbout/AboutFields/AddPhoneNumber";
import styles from "./profileAbout.module.scss";

export default function Contacts() {
  return (
    <>
      <p className={styles.profile_about__info_title}>Contact info</p>
      <AddPhoneNumber />
    </>
  );
}
