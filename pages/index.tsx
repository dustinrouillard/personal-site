import { default as NextLink } from "next/link";

import styled from "styled-components";
import { PageHead } from "../components/head";
import { SocialLinks } from "../components/socials";
import { Spotify } from "../components/spotify";
import { getAge } from "../utils/birthday";

export default function Home() {
  return (
    <>
      <Spotify />
      <Container>
        <PageHead name="Vibing" />

        <Sections>
          <Info>
            <Links>
              <NextLink href="/blog" passHref>
                <PageLink>Blog</PageLink>
              </NextLink>
              <NextLink href="/stats" passHref>
                <PageLink>Stats</PageLink>
              </NextLink>
            </Links>
            <Name>Dustin Rouillard</Name>
            <Description>
              <Text>Hi there 👋🏼 I’m Dustin</Text>

              <Text>
                I’m a {getAge().toString()} year old software engineer and
                network/systems administrator
              </Text>

              <Text>
                Currently living in a small town in New Mexico, United States.
                yes, it’s really a desert here
              </Text>

              <SocialLinks />
            </Description>
          </Info>

          <Picture>
            <StyledImage src="/pic.jpeg" />
          </Picture>
        </Sections>
      </Container>
    </>
  );
}

const Info = styled.div`
  margin-top: 20px;
  width: 50%;
`;

const StyledImage = styled.img`
  border-radius: 10px;
  position: absolute;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  float: right;
`;

const PageLink = styled.div`
  font-family: "FiraCode-Light";
  color: black;
  text-decoration: none;
  opacity: 50%;
  padding-left: 20px;
  display: block;
  text-align: right;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h1`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.9em;
  text-align: right;
  color: black;
  margin-bottom: 30px;
  font-weight: normal;
  padding-top: 30px;
  margin-top: 10px;
`;

const Text = styled.div`
  display: block;
  text-align: right;
  padding-top: 30px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "FiraCode-Medium";
  font-size: 1.3em;
  color: black;
  width: 65%;
  flex: 1;
  float: right;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
  margin: 50px;
`;

const Picture = styled.div`
  position: relative;
  width: 350px;
  height: 470px;
  margin-left: 30px;
`;

// export async function getServerSideProps() {
//   const res = await fetch(`https://dustin.rest/spotify`);
//   const data = await res.json();

//   return { props: { playing: data.data } };
// }
