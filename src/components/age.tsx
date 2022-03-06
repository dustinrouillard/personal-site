import { Tippy } from './Tippy';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useYearsAgo } from '../hooks/useTimeAgo';

const date = new Date('07/15/1999');

export function Age(): ReactElement {
  const age = useYearsAgo(date);

  return (
    <>
      <Tippy content={age.toFixed(8)}>
        <Span underline alt={age.toString()}>
          {Math.floor(age)}
        </Span>
      </Tippy>
    </>
  );
}

const Span = styled.span<{ alt?: string; underline?: boolean }>`
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
`;
