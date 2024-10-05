import { RequestContext } from "next/dist/server/base-server";

import Layout from "../_layout";
import { BlogPost } from "../../components/blogpost";
import { getPosts } from "../../utils/core";
import { BlogPost as TBlogPost } from "../../types/core";

interface Props {
  posts: TBlogPost[];
}

export default function Index(props: Props) {
  return (
    <Layout active_page="blog" page_class="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Blog Posts</h1>
      </div>

      <div>
        <div className="grid xl:grid-cols-1 xl:grid-flow-row overflow-scroll p-2 rounded-lg bg-neutral-300 dark:bg-neutral-800 max-h-full">
          {props.posts.map((post) => (
            <BlogPost post={post} key={post.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  const posts = await getPosts();

  return {
    props: { posts },
  };
}
