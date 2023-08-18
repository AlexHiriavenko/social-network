import { useSelector } from "react-redux";
import PostList from "../../components/Posts/Post/PostList";
import { useEffect, useState } from "react";
import CreatePost from "../../components/Posts/CreatePost";
import { getPosts, setPosts } from "../../redux/post.slice/post.slice.js";
import { setAuthorizedUser } from "../../redux/user.slice/user.slice.js";
import { useDispatch } from "react-redux";

function HomeMain() {

  const dispatch = useDispatch();

  useEffect(() => {
    /*   const allPostsResponse = dispatch(getPosts());
       allPostsResponse
           .then((result) => {
               dispatch(setPosts(result.payload));
           })
           .catch((error) => alert(error));
       dispatch(setAuthorizedUser(JSON.parse(localStorage.getItem("authorizedUser"))))*/

  }, [])
  // State
  const [mainPagePosts, setMainPagePosts] = useState([]);
  // Constants
  const allPosts = useSelector((state) => state.post.allPosts);
  //   useEffect
  useEffect(() => {
    setMainPagePosts(allPosts);
  }, [allPosts]);
  return (
    <main className="main-home-content">
      <CreatePost />
      <PostList posts={mainPagePosts} />
    </main>
  );
}

export default HomeMain;