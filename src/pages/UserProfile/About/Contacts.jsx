import AddPhoneNumber from "../../../components/UserProfile/ProfileAbout/AboutFields/AddPhoneNumber";
import { ProfileAboutInfoTitle } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledAboutComponents";

export default function Contacts() {
  return (
    <>
      <ProfileAboutInfoTitle>Contact info</ProfileAboutInfoTitle>
      <AddPhoneNumber />
    </>
  );
}
