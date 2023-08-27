import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import PrivateRoute from "../../utils/router/PrivateRoute";
import {
  Contacts,
  Employment,
  FriendRequests,
  FriendSuggestions,
  FriendsHome,
  LogIn,
  Marketplace,
  NotFound,
  Overview,
  Places,
  Profile,
  ProfileAbout,
  ProfileFriends,
  ProfilePhotos,
  ProfilePosts,
  UserFriendsPage,
  UserPage,
  Groups,
  Home,
  Watch,
  Chats,
  FriendBirthdays,
} from "../../pages";
import ChangePasswordForm from "../../pages/LogIn/ChangePasswordForm";
import { useSelector } from "react-redux";
import ForgotForm from "../../pages/LogIn/ForgotForm.jsx";
import ProfileForSearch from "../../pages/UserProfile/ProfileForSearch.jsx"

import SearchProfileAbout from "../../components/ProfileForSearch/SearchProfileAbout.jsx"
import ProfilePhotosForSearch from "../../components/ProfileForSearch/ProfilePhotosForSearch.jsx"
import ProfileFriendsForSearch from "../../components/ProfileForSearch/ProfileFriendsForSearch.jsx"
import ProfilePostsForSearch from "../../components/ProfileForSearch/ProfilePostsForSearch.jsx"

export default function AllRoutes() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();
  let  {id} = useParams()
  const handleLogIn = () => {
    //   dispatch(logIn());
    navigate("/");
  };
  return (
    <Routes>
      <Route element={<PrivateRoute auth={isLoggedIn} />}>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />}>

          <Route path="/profile/" element={<ProfilePosts />} />
          <Route path="/profile/about" element={<ProfileAbout />}>
            <Route path="/profile/about/" element={<Overview />} />
            <Route
              path="/profile/about/employment"
              element={<Employment />}
            />
            <Route
              path="/profile/about/places"
              element={<Places />}
            />
            <Route
              path="/profile/about/contacts"
              element={<Contacts />}
            />
          </Route>
          <Route
            path="/profile/friends"
            element={<ProfileFriends />}
          />
          <Route path="/profile/photos" element={<ProfilePhotos />} />
        </Route>
        <Route path="/user-page/:id" element={<UserPage />} />
        <Route path="/friends/home" element={<FriendsHome />} />
        <Route path="/friends/requests/" element={<FriendRequests />}>
          <Route
            path="/friends/requests/"
            element={<ProfilePosts />}
          />
          <Route
            path="/friends/requests/about"
            element={<ProfileAbout />}>
            <Route
              path="/friends/requests/about/"
              element={<Overview />}
            />
            <Route
              path="/friends/requests/about/employment"
              element={<Employment />}
            />
            <Route
              path="/friends/requests/about/places"
              element={<Places />}
            />
            <Route
              path="/friends/requests/about/contacts"
              element={<Contacts />}
            />
          </Route>
          <Route
            path="/friends/requests/friends"
            element={<ProfileFriends />}
          />
          <Route
            path="/friends/requests/photos"
            element={<ProfilePhotos />}
          />
        </Route>
        <Route
          path="/friends/suggestions/"
          element={<FriendSuggestions />}>
          <Route
            path="/friends/suggestions/"
            element={<ProfilePosts />}
          />
          <Route
            path="/friends/suggestions/about"
            element={<ProfileAbout />}>
            <Route
              path="/friends/suggestions/about/"
              element={<Overview />}
            />
            <Route
              path="/friends/suggestions/about/employment"
              element={<Employment />}
            />
            <Route
              path="/friends/suggestions/about/places"
              element={<Places />}
            />
            <Route
              path="/friends/suggestions/about/contacts"
              element={<Contacts />}
            />
          </Route>
          <Route
            path="/friends/suggestions/friends"
            element={<ProfileFriends />}
          />
          <Route
            path="/friends/suggestions/photos"
            element={<ProfilePhotos />}
          />
        </Route>
        <Route
          path="/friends/allfriends"
          element={<UserFriendsPage />}>
          <Route
            path="/friends/allfriends/"
            element={<ProfilePosts />}
          />
          <Route
            path="/friends/allfriends/about"
            element={<ProfileAbout />}>
            <Route
              path="/friends/allfriends/about/"
              element={<Overview />}
            />
            <Route
              path="/friends/allfriends/about/employment"
              element={<Employment />}
            />
            <Route
              path="/friends/allfriends/about/places"
              element={<Places />}
            />
            <Route
              path="/friends/allfriends/about/contacts"
              element={<Contacts />}
            />
          </Route>
          <Route
            path="/friends/allfriends/friends"
            element={<ProfileFriends />}
          />
          <Route
            path="/friends/allfriends/photos"
            element={<ProfilePhotos />}
          />
        </Route>
        <Route 
          path="/friends/birthdays"
          element={<FriendBirthdays/>}/>
        <Route path="/chats" element={<Chats />} />


        <Route path={"search/:id"} element={<ProfileForSearch id ={id} />}>

          <Route path="/search/:id/" element={<ProfilePostsForSearch  id ={id}/>} />
          <Route path="/search/:id/about" element={<SearchProfileAbout id={id} />}>

            <Route
                path="/search/:id/about/employment"
                element={<Employment />}
            />
            <Route
                path="/search/:id/about/places"
                element={<Places />}
            />
            <Route
                path="/search/:id/about/contacts"
                element={<Contacts />}
            />
          </Route>
          <Route
              path="/search/:id/friends"
              element={<ProfileFriendsForSearch id ={id} />}
          />
          <Route path="/search/:id/photos" element={<ProfilePhotosForSearch id ={id} />} />


        </Route>


        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="/login"
        element={
          <LogIn isLoggedIn={isLoggedIn} onClick={handleLogIn} />
        }
      />
      <Route path="/password" element={<ChangePasswordForm />} />
      <Route path="/forgot" element={<ForgotForm />} />
    </Routes>
  );
}
