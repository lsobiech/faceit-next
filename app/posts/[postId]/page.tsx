import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const { postId } = params;
  return <div>{postId}</div>;
}
