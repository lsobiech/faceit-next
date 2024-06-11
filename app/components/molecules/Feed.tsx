import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "../../store/userSlice";
import {
  fetchPosts,
  checkMorePosts,
  clearHighlight,
} from "../../store/postSlice";
import PostPreview from "./PostPreview";
import useMockRealTimeUpdates from "../../hooks/UseMockRealTimeUpdates";

const Feed = () => {
  const limit = 10;
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, hasMore, highlightedPostId } = useSelector(
    (state: RootState) => state.posts
  );
  const { users } = useSelector((state: RootState) => state.users);

  useMockRealTimeUpdates();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts({ page: 1, limit }));
    dispatch(checkMorePosts({ page: 1, limit }));
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      dispatch(checkMorePosts({ page, limit }));
    }
  }, [dispatch, posts, page]);

  useEffect(() => {
    if (highlightedPostId) {
      const timer = setTimeout(() => {
        dispatch(clearHighlight());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedPostId, dispatch]);

  const getAuthor = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  const loadMore = () => {
    if (hasMore) {
      dispatch(fetchPosts({ page, limit }));
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        posts.length > limit && (
          <div className="flex justify-center py-4">
            <h4 className="text-lg font-medium text-gray-600 animate-pulse">
              Loading...
            </h4>
          </div>
        )
      }
      endMessage={
        <div className="flex justify-center py-4">
          <p className="text-lg font-medium text-gray-600">
            No more posts to show
          </p>
        </div>
      }
    >
      <div className="p-4 cursor-pointer">
        <h1 className="text-2xl font-semibold mb-4">Feed</h1>
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            post={post}
            author={getAuthor(post.userId)}
            isHighlighted={post.id === highlightedPostId}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Feed;
