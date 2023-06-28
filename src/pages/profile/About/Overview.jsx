import AddHighschool from "../../../components/Profile/ProfileAbout/AboutFields/AddHighschool";
import AddWorkplace from "../../../components/Profile/ProfileAbout/AboutFields/AddWorkplace";
import CurrentCity from "../../../components/Profile/ProfileAbout/AboutFields/CurrentCity";
import Hometown from "../../../components/Profile/ProfileAbout/AboutFields/Hometown";
import AddInfoAbout from "../../../components/Profile/ProfileAbout/AddInfoAbout";

export default function Overview() {
  return (
    <>
      <AddWorkplace />
      <AddHighschool />
      <CurrentCity />
      <Hometown />
      <AddInfoAbout text={"Add mobilephone"} />
    </>
  );
}
