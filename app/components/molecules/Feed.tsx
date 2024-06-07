import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchUsers } from "../../store/userSlice";
import { incrementPage, fetchPosts } from "../../store/postSlice";
import PostPreview from "./PostPreview";

const Feed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, page, hasMore } = useSelector(
    (state: RootState) => state.posts
  );
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts(page));
  }, [dispatch, page]);

  const loadMore = () => {
    if (hasMore) dispatch(incrementPage());
  };

  const getAuthor = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  return posts && (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Feed</h1>
      {posts.map((post) => (
        <PostPreview
          key={post.id}
          post={post}
          author={getAuthor(post.userId)}
        />
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Feed;
