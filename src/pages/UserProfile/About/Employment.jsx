import AddHighschool from "../../../components/UserProfile/ProfileAbout/AboutFields/AddHighschool";
import AddWorkplace from "../../../components/UserProfile/ProfileAbout/AboutFields/AddWorkplace";
import { ProfileAboutInfoTitle } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledAboutComponents";

export default function Employment() {
  return (
    <>
      <ProfileAboutInfoTitle>Work</ProfileAboutInfoTitle>
      <AddWorkplace />
      <ProfileAboutInfoTitle>High school</ProfileAboutInfoTitle>
      <AddHighschool />
    </>
  );
}
