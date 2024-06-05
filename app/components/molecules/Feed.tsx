import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addPosts, incrementPage, setHasMore } from "../../store/postSlice";
import PostPreview from "./PostPreview";
import { addUsers } from "../../store/userSlice";
import axios from "axios";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, page, hasMore } = useSelector(
    (state: RootState) => state.posts
  );
  const { users } = useSelector((state: RootState) => state.users);

  const fetchPosts = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`
    );
    const data = response.data;
    console.log("data", data);
    dispatch(addPosts(data));
    if (data.length === 0) dispatch(setHasMore(false));
  };

  const fetchUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = response.data;
    console.log("data users", data);
    dispatch(addUsers(data));
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [page]);

  const loadMore = () => {
    if (hasMore) dispatch(incrementPage());
  };

  const getAuthor = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  return (
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
