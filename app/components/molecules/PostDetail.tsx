import styled from "styled-components";
import { Post, User } from "../../interfaces";

const PostDetailContainer = styled.div`
  @apply p-6;
`;

interface PostDetailProps {
  post: Post;
  author?: User;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, author }) => {
  return (
    <PostDetailContainer>
      {author && (
        <img
          src={`https://i.pravatar.cc/150?img=${author.id}`}
          alt={author.name}
        />
      )}
      <div>
        <h2>{author?.name}</h2>
        <p>{post.body}</p>
      </div>
    </PostDetailContainer>
  );
};

export default PostDetail;
