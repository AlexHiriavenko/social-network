import AddHighschool from "../../../components/UserProfile/ProfileAbout/AboutFields/AddHighschool";
import AddWorkplace from "../../../components/UserProfile/ProfileAbout/AboutFields/AddWorkplace";
import styles from "./profileAbout.module.scss";

export default function Employment() {
  return (
    <>
      <p className={styles.profile_about__info_title}>Work</p>
      <AddWorkplace />
      <p className={styles.profile_about__info_title}>High school</p>
      <AddHighschool />
    </>
  );
}
