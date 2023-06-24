import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileNavigation from "../../components/profile/ProfileNavigation";

export default function Profile() {
  return (
    <>
      <ProfileHeader />
      <ProfileNavigation />
      <Outlet/>
    </>
  );
}
