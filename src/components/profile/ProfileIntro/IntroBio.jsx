import { useState } from "react";
import styles from "./profileIntro.module.scss";
import EditFormButton from "../ProfileAbout/EditFormButton";

export default function IntroBio({ bio }) {
  const [isEdit, setInputStatus] = useState(false);
  function editBio() {
    setInputStatus(!isEdit);
  }
  return (
    <li className={styles.profile_posts__intro_bio}>
      {!isEdit ? (
        <>
          <p>{bio}</p>
          <button className={styles.profile_posts__intro_btn} onClick={editBio}>
            {bio ? "Edit bio" : "Add bio"}
          </button>
        </>
      ) : (
        <div className={styles.profile_posts__intro_wrap}>
          <textarea
            maxLength="100"
            type="text"
            placeholder="Describe who are you"
            className={styles.profile_posts__intro_bio_textarea}
          />
          <EditFormButton text={"Cancel"} clickAction={editBio} type={"reset"}/>
          <EditFormButton text={"Save"} />
        </div>
      )}
    </li>
  );
}

IntroBio.defaultProps = {
  bio: false,
};
