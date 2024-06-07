import Link from "next/link";
import { Post, User } from "../../interfaces";
import Image from "next/image";

interface PostPreviewProps {
  post: Post;
  author?: User;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post, author }) => {
  return (
    <div className="cursor-pointer">
      {author ? (
        <Link
          className="block p-4 mb-4 border rounded-lg hover:bg-gray-100 transition duration-200"
          href={`/posts/${post.id}`}
          aria-label={`Read post titled "${post.title}" by ${author.name}`}
        >
          <div className="flex items-center space-x-4">
            <Image
              src={`https://i.pravatar.cc/150?img=${author.id}`}
              alt={author.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
              // loading="eager"
            />
            <div>
              <h2 className="text-lg font-semibold">{author.name}</h2>
            </div>
          </div>
          <div className="mt-2 md:pl-16">
            <h3 className="text-md font-semibold">{post.title}</h3>
            <p className="mt-1 text-gray-600 line-clamp-2">
              {post.body.substring(0, 100)}...
            </p>
          </div>
        </Link>
      ) : (
        <div className="block p-4 mb-4 border rounded-lg bg-red-100 text-red-600">
          No author information available
        </div>
      )}
    </div>
  );
};

export default PostPreview;
