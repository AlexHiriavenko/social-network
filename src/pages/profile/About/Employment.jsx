import AddHighschool from "../../../components/Profile/ProfileAbout/AboutFields/AddHighschool";
import AddWorkplace from "../../../components/Profile/ProfileAbout/AboutFields/AddWorkplace";
import styles from "./profileAbout.module.scss";

export default function Employment() {
  return (
    <>
      <p >Work</p>
      <AddWorkplace />
      <p>High school</p>
      <AddHighschool />
    </>
  );
}
