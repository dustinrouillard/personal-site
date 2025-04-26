import { HiHeart } from "react-icons/hi";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";

import { useTimeSince } from "../hooks/useTimeSince";
import { InstagramPost as IGPost } from "../types/core";

export const PostTypes = {
  FEED: "Post",
  REELS: "Reel",
};

export function InstagramPost({ post }: { post: IGPost }) {
  const timeSince = useTimeSince(new Date(post.timestamp));

  return (
    <a href={post.permalink} target="_blank">
      <div className="flex flex-row items-start lg:items-center rounded-lg m-1 bg-neutral-200 dark:bg-black/60 py-6 px-4 border-b-8 border-b-instagram-pink/50 hover:border-b-instagram-pink cursor-pointer hover:brightness-75 transition-all">
        <div className="flex flex-col gap-2 relative">
          <div className="absolute right-0 bg-neutral-900 rounded-lg p-2 m-2">
            <p className="text-sm">{PostTypes[post.media_product_type]}</p>
          </div>

          <img
            className="aspect-[0.8/1] object-cover rounded-md"
            src={post.thumbnail_url ?? post.media_url}
          />

          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-1 opacity-70 items-center">
              <HiHeart size={20} />{" "}
              <p className="">{post.like_count.toLocaleString()}</p>
            </div>
            <div className="flex flex-row gap-1 opacity-70 items-center">
              <HiMiniChatBubbleOvalLeft size={20} />{" "}
              <p className="">{post.comments_count.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-row gap-1 opacity-70 items-center">
              <p className="text-sm">{timeSince}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
