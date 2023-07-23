import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./createPost.module.scss";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import { useFormik } from "formik";

const mockUser = {
  image:
    "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  firstName: "Viktor",
  lastName: "Ostapenko",
};

export default function CreatePost() {
  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function showChoosingPicture() {
    let file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImgUrl(URL.createObjectURL(file));
  }

  const formik = useFormik({
    initialValues: {
      content: "",
      userName: `${mockUser.firstName} ${mockUser.lastName}`,
    },
    onSubmit: (values) => {
      handleClose();
    },
  });

  return (
    <>
      <section className={styles.create_post}>
        <div className={styles.create_post__header}>
          <img
            src={mockUser.image}
            alt=""
            width={40}
            height={40}
            className={styles.create_post__image}
          />
          <input
            type="text"
            value={"What`s on your mind?"}
            className={styles.create_post__input}
            onClick={handleOpen}
            onChange={handleOpen}
          />
        </div>
        <span className={styles.create_post__line}></span>
        <div className={styles.create_post__buttons}>
          <button className={styles.create_post__btn} onClick={handleOpen}>
            <AddPhotoAlternateIcon
              sx={{ color: "#45bd62", width: "36px", height: "36px" }}
            />
            Photo/Video
          </button>
        </div>
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ paddingLeft: "5px", paddingRight: "5px" }}
      >
        <div className={styles.create_post__modal}>
          <button className={styles.close_btn} onClick={handleClose}>
            <span className={styles.close_btn__line}></span>
          </button>
          <h2 className={styles.create_post__modal_title}>Create post</h2>
          <span className={styles.create_post__line}></span>
          <div className={styles.create_post__modal_user}>
            <img
              src={mockUser.image}
              alt=""
              width={40}
              height={40}
              className={styles.create_post__image}
            />
            <p className={styles.create_post__modal_username}>
              {" "}
              {mockUser.firstName} {mockUser.lastName}
            </p>
          </div>
          <form
            className={styles.create_post__modal_create_area}
            onSubmit={formik.handleSubmit}
          >
            <textarea
              cols="30"
              rows="5"
              placeholder="What`s on your mind?"
              className={styles.create_post__modal_textarea}
              onChange={formik.handleChange}
              value={formik.values.content}
              name="content"
              id="content"
            ></textarea>
            <img
              src={imgUrl}
              alt=""
              width={450}
              className={styles.create_post__modal_image}
            />
            <div className={styles.create_post__addfiles}>
              <p className={styles.create_post__addfiles_text}>
                Add to your post
              </p>
              <label className={styles.create_post__photos_btn}>
                <input
                  type="file"
                  ref={fileRef}
                  onChange={showChoosingPicture}
                />
                <AddPhotoAlternateIcon
                  sx={{ color: "#45bd62", width: "36px", height: "36px" }}
                />
              </label>
            </div>
            <button
              className={`${styles.create_post__create_btn} ${styles.create_post__create_btn_active}`}
            >
              POST
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
