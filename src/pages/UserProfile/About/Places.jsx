import AddCurrentCity from "../../../components/UserProfile/ProfileAbout/AboutFields/AddCurrentCity";
import AddHometown from "../../../components/UserProfile/ProfileAbout/AboutFields/AddHometown";
import { ProfileAboutInfoTitle } from "../../../components/UserProfile/StyledComponents/ContentBlock/StyledAboutComponents";

export default function Places() {
  return (
    <>
      <ProfileAboutInfoTitle>Places lived</ProfileAboutInfoTitle>
      <AddCurrentCity />
      <AddHometown />
    </>
  );
}
