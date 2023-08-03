import { Outlet } from "react-router-dom";
import ProfileHeader from "../../components/UserProfile/ProfileHeader";
import ProfileNavigation from "../../components/UserProfile/ProfileNavigation";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user ? (
        <>
          <ProfileHeader />
          <ProfileNavigation />
          <Outlet />
        </>
      ) : (
        <Backdrop
          sx={{ color: "#fff", }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
