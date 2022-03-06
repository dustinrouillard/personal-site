import styled from 'styled-components';
import TippyReact, { TippyProps } from '@tippyjs/react';

export function Tippy(props: TippyProps) {
  return (
    <TippyWrapped duration={0} {...props}>
      {props.children}
    </TippyWrapped>
  );
}

const TippyWrapped = styled(TippyReact)`
  font-size: 12px;
  color: var(--text, '#ffffff');
  font-family: 'FiraCode-Medium';
  background-color: var(--widget-background, '#000000');
  box-shadow: 2px 2px 9px 2px #04040421;
  border-radius: 5px;
  padding: 8px;
`;
