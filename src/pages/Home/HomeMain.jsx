import { useEffect } from "react";
import Post from "../../components/Posts/Post/Post";
import postSlice, { getPosts, setPosts } from "../../redux/post.slice/post.slice";
import { useDispatch, useSelector } from "react-redux";


function HomeMain() {
    const dispatch = useDispatch();

    useEffect(() => {
        const postsResponse = dispatch(getPosts());
        postsResponse.then((result) => {
            dispatch(setPosts(result.payload));
        })
            .catch((error) => alert(error));
    }, [])


    const posts = useSelector((state) => state.post.allPosts);
    console.log(posts);

    return (
        <main className="main-home-content">
            <h2 className="main-title">Home Page Content</h2>
            {/* <ul>
                {posts.map((post, index) => (
                    <Post {...post} key={index} />
                ))}
            </ul> */}
            <Post post={posts[2]} />
        </main>
    );
}

export default HomeMain;
