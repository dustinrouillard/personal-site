import Link from "next/link";
import { useTimeSince } from "../hooks/useTimeSince";
import { BlogPost as TBlogPost } from "../types/core";

interface Props {
  post: TBlogPost;
}

export function BlogPost({ post }: Props) {
  const timeSince = useTimeSince(new Date(post.published_at));

  return <Link href={`/blog/${post.slug}`}>
    <div className="flex flex-col xl:flex-row justify-between rounded-lg m-1 bg-neutral-200 dark:bg-black/60 p-6 min-w-80 xl:h-52 border-b-8 border-neutral-400/50 cursor-pointer hover:brightness-75 transition-all space-y-2 xl:space-y-0">
      <img className="rounded-md visible flex xl:hidden xl:invisible" src="https://cdn.dstn.to/i/frame_123123.png?t=1" />
      <div className="flex flex-col justify-between space-y-5 mr-4 w-full">
        <span className="flex flex-col space-y-5">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-wrap truncate line-clamp-3">{post.description}</p>
        </span>

        <span className="flex flex-col w-full items-start justify-start">
          <div className="flex justify-between w-full">
            <span className="flex space-x-3 items-center">
              {post.tags ? post.tags.map(tag => (<p className="p-1 bg-neutral-300 dark:bg-neutral-600 rounded-lg text-sm">{tag}</p>)) : <></>}
            </span>
            <span className="flex items-center space-x-2"><p>{timeSince != 'now' ? `${timeSince} ago` : 'just now'}</p></span>
          </div>
        </span>
      </div>
      <img className="rounded-md invisible hidden xl:flex xl:visible" src="https://cdn.dstn.to/i/frame_123123.png?t=1" />
    </div>
  </Link>
}