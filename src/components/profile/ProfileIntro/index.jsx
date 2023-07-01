import IntroBio from "./IntroBio";
import IntroDetails from "./IntroDetails";
import styles from "./profileIntro.module.scss";
const mockIntor = {
  city: "Dnipro",
  bio: "some bio",
};

export default function ProfileIntro() {
  return (
    <section className={styles.profile_posts__intro}>
      <h2 className={styles.profile_posts__intro_title}>Intro</h2>
      <ul>
        <IntroBio />
        <IntroDetails />
      </ul>
    </section>
  );
}
