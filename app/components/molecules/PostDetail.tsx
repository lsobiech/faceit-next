import { Post, User } from "../../interfaces";
import Image from "next/image";
import Link from "next/link";

interface PostDetailProps {
  post: Post;
  author?: User;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, author }) => {
  return (
    <div className="p-6 text-center">
      <div className="flex justify-start mb-4">
        <Link legacyBehavior href="/">
          <a className="text-xl font-bold hover:underline">&lt; Home</a>
        </Link>
      </div>
      {author && (
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src={`https://i.pravatar.cc/200?img=${author.id}`}
              alt={`Avatar of ${author.name}`}
              width={200}
              height={200}
              className="rounded-full"
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold">{author.name}</h2>
        </div>
      )}
      {post && (
        <div className="p-4 mt-8 border rounded-lg bg-gray-100 transition duration-200 shadow-md">
          <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
          <p className="text-gray-700">{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
