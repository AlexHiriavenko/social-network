import styles from "./profile-header.module.scss";
const user = {
  full_name: "Julian Read",
  profile_picture:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=2000",
  profile_background_picture:
    "https://image.geo.de/30145342/t/Cs/v4/w1440/r0/-/nationalpark-saechsische-schweiz-mauritius-reya43-jpg--82748-.jpg",
};

export default function ProfileHeader() {
  return (
    <section className={styles.profileHeader}>
      <section>
        <img
          src={user.profile_background_picture}
          alt="profile_background_picture"
        />
        <button>Создать фото обложки с аватаром</button>
        <button>Редактировать фото обложки</button>
      </section>
      <section>
        <img src={user.profile_picture} alt="profile_picture" />
      </section>
    </section>
  );
}
