import AddWorkplace from "../../../components/Profile/ProfileAbout/AboutFields/AddWorkplace";
import AddInfoAbout from "../../../components/Profile/ProfileAbout/AddInfoAbout";

export default function Overview() {
  return (
    <>
      <AddWorkplace />
      <AddInfoAbout text={"Add high school"} />
      <AddInfoAbout text={"Add current city"} />
      <AddInfoAbout text={"Add hometown"} />
      <AddInfoAbout text={"Add mobilephone"} />
    </>
  );
}
