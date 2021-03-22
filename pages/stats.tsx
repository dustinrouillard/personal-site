import { useEffect, useState } from "react";
import styled from "styled-components";

import { PageHead } from "../components/head";
import { LinkHead } from "../components/linkhead";
import { StatCard } from "../components/statcard";

export default function Stats() {
  const [stats, setStats] = useState<any>();

  async function fetchData() {
    const res = await fetch(`https://dustin.rest/stats`);
    const data = await res.json();

    setStats(data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <PageHead name="Stats" />
      <LinkHead />
      <Title>Stats</Title>
      <SectionTitle>7-day stats</SectionTitle>
      {!!stats && !!stats.weekly && (
        <Sections>
          <StatCard type="commands" stat={stats.weekly?.commands_ran} />
          <StatCard type="builds" stat={stats.weekly?.builds_ran} />
          <StatCard type="dev_time" stat={stats.weekly?.development_seconds} />
        </Sections>
      )}
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
  color: var(--text);
  font-weight: normal;
  margin-top: 0px;
`;

const SectionTitle = styled.h1`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.8em;
  color: var(--text);
  font-weight: normal;
  margin-bottom: 0px;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 50px;
`;

export async function getInitalProps() {
  const res = await fetch(`https://rest.dstn.to/stats`);
  const data = await res.json();

  return { props: { stats: data.data } };
}
