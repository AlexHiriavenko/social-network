import styled from "@emotion/styled";
import Post from "./Post";
const StyledPostsList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
});
export default function PostList({ posts }) {
  if (posts.length === 0) return;
  for (let index = 0; index < posts.length; index++) {
    if (posts[index].parentId) {
      console.log(posts[index]);
    }
  }
  return (
    <StyledPostsList>
      {posts.map((post, index) => (
        <Post {...post} key={index} />
      ))}
    </StyledPostsList>
  );
}

PostList.defaultProps = {
  posts: [],
};
