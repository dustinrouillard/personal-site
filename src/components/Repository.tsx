import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { PinnedRepository } from "../types/github";
import { Fork } from "./icons/Fork";
import { Star } from "./icons/Star";

export function Repository(props: { repo: PinnedRepository }): ReactElement {
  return (
    <Container
      onClick={() => {
        window.open(props.repo.url, "_blank");
      }}
    >
      <Name>{props.repo.name}</Name>
      <Description>
        {props.repo.description.length > 83
          ? `${props.repo.description.substring(0, 80).trim()}..`
          : props.repo.description}
      </Description>

      <Footer>
        {props.repo.primaryLanguage && (
          <>
            <LanguageContainer>
              <LanguageDot color={props.repo.primaryLanguage.color} />
              <Language>{props.repo.primaryLanguage.name}</Language>
            </LanguageContainer>
          </>
        )}
        {!!props.repo.stargazerCount && (
          <>
            <Stars>
              <Star size={12} />
              <StarsCount>
                {props.repo.stargazerCount.toLocaleString()}
              </StarsCount>
            </Stars>
          </>
        )}
        {!!props.repo.forkCount && (
          <>
            <Forks>
              <Fork size={12} />
              <ForksCount>{props.repo.forkCount.toLocaleString()}</ForksCount>
            </Forks>
          </>
        )}
      </Footer>
    </Container>
  );
}

const Container = styled.div<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>`
  font-family: "FiraCode-Medium";
  background-color: var(--widget-background);
  color: var(--text);
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 500px;
  min-height: 110px;
  max-height: 110px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  :hover {
    filter: brightness(60%);
  }
`;

const Name = styled.h3`
  font-size: 15px;
  margin: 0;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 12px;
  margin: 0;
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const LanguageDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  margin-right: 3px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;

const Language = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin: 0;
`;

const Stars = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`;

const Forks = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`;

const StarsCount = styled.p`
  margin: 0;
  margin-left: 5px;
  font-size: 10px;
`;

const ForksCount = styled.p`
  margin: 0;
  margin-left: 5px;
  font-size: 10px;
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
