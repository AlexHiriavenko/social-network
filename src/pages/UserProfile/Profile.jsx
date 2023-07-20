import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/UserProfile/ProfileHeader";
import ProfileNavigation from "../../components/UserProfile/ProfileNavigation";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <ProfileNavigation />
      <Outlet/>
    </>
  );
}
