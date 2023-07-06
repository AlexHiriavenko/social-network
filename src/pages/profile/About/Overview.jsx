import AddCurrentCity from "../../../components/Profile/ProfileAbout/AboutFields/AddCurrentCity";
import AddHighschool from "../../../components/Profile/ProfileAbout/AboutFields/AddHighschool";
import AddHometown from "../../../components/Profile/ProfileAbout/AboutFields/AddHometown";
import AddPhoneNumber from "../../../components/Profile/ProfileAbout/AboutFields/AddPhoneNumber";
import AddWorkplace from "../../../components/Profile/ProfileAbout/AboutFields/AddWorkplace";
import AddInfoAbout from "../../../components/Profile/ProfileAbout/AddInfoAbout";

export default function Overview() {
  return (
    <>
      <AddWorkplace />
      <AddHighschool />
      <AddCurrentCity />
      <AddHometown />
      <AddPhoneNumber />
    </>
  );
}
