import { Post, User } from "../../interfaces";
import Image from "next/image";

interface PostDetailProps {
  post: Post;
  author?: User;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, author }) => {
  return (
    <div className="p-6">
      Details
      {author && (
        <div className="flex items-center mb-4">
          <Image
            src={`https://i.pravatar.cc/150?img=${author.id}`}
            alt={`Avatar of ${author.name}`}
            width={150}
            height={150}
            className="w-24 h-24 rounded-full mr-4"
            loading="lazy"
          />
          <h2 className="text-2xl font-bold">{author.name}</h2>
        </div>
      )}
      <div className="mt-4">
        <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
        <p className="text-gray-700">{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetail;
