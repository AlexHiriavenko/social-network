import Photos from "../../../components/UserProfile/ProfilePhotos";
import styles from "./profilePhotos.module.scss";

export default function ProfilePhotos() {
  return (
    <section className={styles.profile_photos}>
      <div className={styles.profile_photos__container}>
        <Photos />
      </div>
    </section>
  );
}
