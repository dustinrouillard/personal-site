import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { RequestContext } from "next/dist/server/base-server";

import Layout from "../_layout";
import { getPostBySlug } from "../../utils/core";
import { BlogPost } from "../../types/core";
import Link from "next/link";

interface Props {
  post: BlogPost;
}

export default function BlogPostBySlug({ post }: Props) {
  return (
    <Layout page_class="flex justify-center">
      <div className="flex flex-col max-w-5xl 2xl:w-2/3">
        {post.image ? (
          <div className="flex flex-col items-center">
            <img
              className="rounded-md mb-8"
              src={`https://cdn.dstn.to/blog/assets/${post.image}`}
              alt="blog-header-image"
            />
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

          <div className="prose prose-sm bg:!max-w-none vs:!max-w-sm xs:!max-w-xs dark:prose-invert">
            <Markdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                a(props) {
                  const { href, className, children } = props;
                  return (
                    <Link className={className} href={href} target="_blank">
                      {children}
                    </Link>
                  );
                },
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={coldarkDark}
                      customStyle={{
                        border: "none",
                        background: "none",
                        boxShadow: "none",
                      }}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.body}
            </Markdown>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(props: RequestContext) {
  const slug = props.query.slug as string;
  const post = await getPostBySlug(slug);

  return {
    props: { post },
  };
}
