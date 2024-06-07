"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchPostById } from "../../store/postSlice";
import { fetchUserById } from "../../store/userSlice";
import PostDetail from "../../components/molecules/PostDetail";
import { AppDispatch } from "../../store/index";

interface PageProps {
  params: {
    postId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { postId } = params;
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) => state.posts.post);
  const author = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    dispatch(fetchPostById(Number(postId)));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post && post.userId) {
      dispatch(fetchUserById(post.userId));
    }
  }, [dispatch, post]);

  if (!post || !author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostDetail post={post} author={author} />
    </div>
  );
};

export default Page;
