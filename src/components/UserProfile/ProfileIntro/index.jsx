import { useNavigate } from "react-router-dom";
import ProfilePageButton from "../ProfilePageButton/ProfilePageButton";
import IntroBio from "./IntroBio";
import styles from "./profileIntro.module.scss";
const mockIntor = {
  city: "Dnipro",
  bio: "some bio",
};

export default function ProfileIntro() {
  const navigate = useNavigate();
  return (
    <section className={styles.profile_posts__intro}>
      <h2 className={styles.profile_posts__intro_title}>Intro</h2>
      <ul>
        <IntroBio />
        <ProfilePageButton
            text={"Add details"}
            clickAction={()=>{
              navigate("/profile/about")
            }}
            style={{ width: "100%" }}
          />
      </ul>
    </section>
  );
}
