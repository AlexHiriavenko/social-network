import { useSelector } from "react-redux";
import PostList from "../../components/Posts/Post/PostList";
import { useEffect, useState } from "react";
import CreatePost from "../../components/Posts/CreatePost";

function HomeMain() {
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
