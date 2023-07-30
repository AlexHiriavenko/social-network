import { useSelector } from "react-redux";
import PostList from "../../components/Posts/Post/PostList";

function HomeMain() {
  // Constants
  const allPosts = useSelector((state) => state.post.allPosts);
  return (
    <main className="main-home-content">
      <PostList posts={allPosts} />
    </main>
  );
}

export default HomeMain;
