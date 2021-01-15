import { useRouter } from "next/router";
import { useState } from "react";

import styled from "styled-components";

import { PageHead } from "../../../components/head";
import { LinkHead } from "../../../components/linkhead";

import blog_posts from "../../../utils/posts";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(blog_posts.find((post) => post.id == id));

  return (
    <Container>
      <PageHead name="Blog" />

      <LinkHead />

      <Title>{post.title}</Title>
      <Sections>
        <Summary>{post.content}</Summary>
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
  padding-bottom: 30px;
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.8em;
  color: black;
  font-weight: normal;
  margin-top: 0px;
`;

const Summary = styled.p`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1em;
  color: black;
  margin-bottom: 15px;
  font-weight: normal;
  margin-top: 0px;
  width: 800px;
  white-space: pre-line;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 50px;
`;

export async function getServerSideProps() {
  return { props: {} };
}
