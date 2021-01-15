import styled from "styled-components";

import { PageHead } from "../components/head";
import { LinkHead } from "../components/linkhead";
import { StatCard } from "../components/statcard";

export default function Stats(props: { stats: any }) {
  return (
    <Container>
      <PageHead name="Stats" />

      <LinkHead />

      <Title>Stats</Title>
      <SectionTitle>7-day stats</SectionTitle>
      <Sections>
        <StatCard type="commands" stat={props.stats.weekly.commands_ran} />
        <StatCard type="builds" stat={props.stats.weekly.builds_ran} />
        <StatCard
          type="dev_time"
          stat={props.stats.weekly.development_seconds}
        />
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

const SectionTitle = styled.h1`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.8em;
  color: black;
  font-weight: normal;
  margin-bottom: 0px;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 50px;
`;

export async function getServerSideProps() {
  const res = await fetch(`https://dustin.rest/stats`);
  const data = await res.json();

  return { props: { stats: data.data } };
}
