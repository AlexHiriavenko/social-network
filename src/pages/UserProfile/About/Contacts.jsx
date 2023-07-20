import AddPhoneNumber from "../../../components/UserProfile/ProfileAbout/AboutFields/AddPhoneNumber";
import styles from "./profileAbout.module.scss";

export default function Contacts() {
  return (
    <>
      <p className={styles.profile_about__info_title}>Contact info</p>
      <AddPhoneNumber />
    </>
  );
}
