import Link from "next/link";
import styled from "styled-components";
import { Post, User } from "../../interfaces";
import Image from "next/image";

const PostPreviewContainer = styled.div`
  cursor: pointer;
`;

const PostPreviewDescription = styled.div`
  padding: 0 0 0 4rem;
`;

interface PostPreviewProps {
  post: Post;
  author?: User;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post, author }) => {
  return (
    <PostPreviewContainer>
      {author ? (
        <Link legacyBehavior key={post.id} href={`/posts/${post.id}`}>
          <a className="block p-4 mb-4 border rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <Image
                src={`https://i.pravatar.cc/150?img=${author.id}`}
                alt={author.name}
                width={100}
                height={100}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{author.name}</h2>
              </div>
            </div>
            <PostPreviewDescription className="flex flex-col">
              <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-600">
                {post.body.substring(0, 100)}
              </p>
            </PostPreviewDescription>
          </a>
        </Link>
      ) : (
        "No author"
      )}
    </PostPreviewContainer>
  );
};

export default PostPreview;
