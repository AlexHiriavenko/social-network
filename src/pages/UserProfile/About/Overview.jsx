import AddCurrentCity from "../../../components/UserProfile/ProfileAbout/AboutFields/AddCurrentCity";
import AddHighschool from "../../../components/UserProfile/ProfileAbout/AboutFields/AddHighschool";
import AddHometown from "../../../components/UserProfile/ProfileAbout/AboutFields/AddHometown";
import AddPhoneNumber from "../../../components/UserProfile/ProfileAbout/AboutFields/AddPhoneNumber";
import AddWorkplace from "../../../components/UserProfile/ProfileAbout/AboutFields/AddWorkplace";

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
