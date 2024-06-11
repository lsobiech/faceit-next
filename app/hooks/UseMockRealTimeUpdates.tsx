import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Post } from "../interfaces";
import { addNewPost } from "../store/postSlice";

const useMockRealTimeUpdates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const newPost = (id: number): Post => ({
      id,
      userId: 1,
      title: `New Post ${id}`,
      body: `This is the body of the new post ${id}.`,
    });

    const interval = setInterval(() => {
      const postId = Math.floor(Math.random() * 1000) + 100;
      dispatch(addNewPost(newPost(postId)));
    }, 10000); // Simulate receiving a new post every 10 seconds

    return () => clearInterval(interval);
  }, [dispatch]);
};

export default useMockRealTimeUpdates;
