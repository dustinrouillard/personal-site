import styled from "styled-components";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";

import { PageHead } from "../../../components/head";
import { LinkHead } from "../../../components/linkhead";

import blog_posts from "../../../utils/posts";

export default function BlogPost({ post, content }) {
  const cnt = hydrate(content);

  return (
    <Container>
      <PageHead name="Blog" />

      <LinkHead />

      <Title>{post.title}</Title>
      <Sections>
        <Content>{cnt}</Content>
      </Sections>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10px;
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.8em;
  color: black;
  font-weight: normal;
  margin-top: 0px;
`;

const Content = styled.div`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1em;
  color: black;
  margin-bottom: 15px;
  font-weight: normal;
  margin-top: 0px;
  width: 800px;
  max-width: 800px;
  white-space: pre-line;

  img {
    height: auto;
    max-width: 100%;
  }
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 50px;
  margin-top: 10px;
  margin-bottom: 120px;
  max-width: 800px;
`;

// This is server side props to prepare for the api call to get blog post
export async function getServerSideProps({ params }) {
  const { id } = params;
  const post = blog_posts.find((post) => post.id == id);
  const content = await renderToString(post.content);

  return { props: { post, content } };
}
