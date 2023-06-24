import { useNavigate } from "react-router-dom";
import styles from "./profileIntro.module.scss";

export default function IntroDetails({ details }) {
  const navigate = useNavigate();
  return (
    <li>
      <p>{details}</p>
      <button
        className={styles.profile_posts__intro_btn}
        onClick={() => navigate("/profile/about")}
      >
        Add details
      </button>
    </li>
  );
}

IntroDetails.defaultProps = {
  details: false,
};
