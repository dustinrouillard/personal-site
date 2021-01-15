import styled from "styled-components";

import { PageHead } from "../../components/head";
import { Post } from "../../components/post";
import { LinkHead } from "../../components/linkhead";

import blog_posts from "../../utils/posts";

export default function Blog() {
  return (
    <Container>
      <PageHead name="Blog" />

      <LinkHead />

      <Title>Blog</Title>
      <Sections>
        <Posts>
          {blog_posts.map((post, index) => {
            if (index + 1 <= blog_posts.length)
              return (
                <>
                  <Post {...post} />
                  <Seperator />
                </>
              );

            return <Post {...post} />;
          })}
        </Posts>
      </Sections>
    </Container>
  );
}

const Seperator = styled.div`
  margin: auto;
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`;

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

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 50px;
`;

const Posts = styled.div`
  margin-bottom: 100px;
  width: 650px;
`;

export async function getServerSideProps() {
  return { props: {} };
}
