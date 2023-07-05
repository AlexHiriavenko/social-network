import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./createPost.module.scss";

const mockUser = {
  image:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  firstName: "Viktor",
};

export default function CreatePost() {
  return (
    <section className={styles.create_post}>
      <div className={styles.create_post__header}>
        <img src={mockUser.image} alt="" width={40} height={40} className={styles.create_post__image} />
        <input type="text" placeholder={"What`s on your mind?"} className={styles.create_post__input}/>
      </div>
      <span className={styles.create_post__line}></span>
      <div className={styles.create_post__buttons}>
        <button className={styles.create_post__btn}>
          <AddPhotoAlternateIcon
            sx={{ color: "#45bd62", width: "36px", height: "36px" }}
          />
          Photo/Video
        </button>
      </div>
    </section>
  );
}
