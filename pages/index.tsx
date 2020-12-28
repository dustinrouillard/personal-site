import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";

import styled from "styled-components";
import { Footer } from "../components/footer";
import { SocialLinks } from "../components/socials";
import { Spotify } from "../components/spotify";

export default function Home(props: { playing: any }) {
  return (
    <>
      {props.playing.is_playing && <Spotify playing={props.playing} />}
      <div className="container">
        <Head>
          <title>Dustin Rouillard • Vibing</title>

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="author" content="Dustin Rouillard" />
          <meta name="copyright" content="Dustin Rouillard" />
          <meta name="rating" content="General" />
          <meta name="url" content="https://dustin.sh" />
          <meta
            name="description"
            content="Dustin Rouillard - Software Engineer, Networking/Systems Administrator"
          />
          <meta name="twitter:creator" content="@dustinrouillard" />
          <meta name="twitter:site" content="@dustinrouillard" />
          <meta
            name="keywords"
            content="Software Engineer, Networking/Systems Administrator, Developer"
          />

          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋🏻</text></svg>"
          />
        </Head>

        <main>
          <Sections>
            <Info>
              <Name>Dustin Rouillard</Name>
              <Description>
                <Text>Hi there 👋🏼 I’m Dustin</Text>

                <Text>
                  I’m a 21 year old software engineer and network/systems
                  administrator
                </Text>

                <Text>
                  Currently living in a small town in New Mexico, United States,
                  yes it’s really a desert here
                </Text>

                <SocialLinks />
              </Description>
            </Info>

            <Picture>
              <div
                style={{
                  position: "relative",
                  width: "350px",
                  height: "470px",
                  marginLeft: "30px",
                }}
              >
                <Image
                  src="/pic.jpeg"
                  layout="fill"
                  objectFit="cover"
                  className="picture"
                />
              </div>
            </Picture>
          </Sections>

          <Footer />
        </main>

        <style jsx global>{`
          .picture {
            border-radius: 10px;
          }

          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  );
}

const Info = styled.div`
  margin-top: 40px;
  width: 50%;
`;

const Name = styled.div`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.8em;
  text-align: right;
  color: black;
  margin-bottom: 30px;
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
  flex: 1;
`;

export async function getServerSideProps() {
  const res = await fetch(`https://dustin.rest/spotify`);
  const data = await res.json();

  return { props: { playing: data.data } };
}
