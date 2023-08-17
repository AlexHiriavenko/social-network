import styled from "@emotion/styled";
import Post from "./Post";
import { useEffect, useState } from "react";
const StyledPostsList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
});
export default function PostList({ posts }) {
  if (posts.length === 0) return;
  return (
    <StyledPostsList>
      {posts?.map((post, index) => {
        console.log(post);
        return <Post {...post} key={index} />;
      })}
    </StyledPostsList>
  );
}

PostList.defaultProps = {
  posts: [],
};
