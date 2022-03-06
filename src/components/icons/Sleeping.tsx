import React from 'react';
import styled from 'styled-components';

export function Sleeping(props: { size?: number; highlight?: string; hovered?: boolean; link?: boolean }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m18.064 50.947l-4.449 3.732l.135-9.222a.628.628 0 0 0-.146-.408l-1.969-2.347a.62.62 0 0 0-.874-.077L2.222 49.79a.62.62 0 0 0-.077.874l1.93 2.299a.62.62 0 0 0 .874.075l3.948-3.313l-.058 9.451a.618.618 0 0 0 .144.402l1.846 2.199a.62.62 0 0 0 .875.076l9.103-7.639a.62.62 0 0 0 .077-.875l-1.945-2.317a.624.624 0 0 0-.875-.075m17.962-17.418l-6.464 3.733l2.229-11.648a.813.813 0 0 0-.094-.548l-1.971-3.411a.797.797 0 0 0-1.09-.293l-12.41 7.164a.799.799 0 0 0-.292 1.092l1.928 3.34a.798.798 0 0 0 1.091.292l5.739-3.313l-2.184 11.951a.794.794 0 0 0 .093.543l1.846 3.197a.797.797 0 0 0 1.09.291L38.77 38.28a.796.796 0 0 0 .292-1.09l-1.945-3.369a.799.799 0 0 0-1.091-.292m23.305-16.737l-7.794 2.838l4.686-12.314a.894.894 0 0 0 .003-.618l-1.497-4.114a.885.885 0 0 0-1.135-.529L38.631 7.499a.886.886 0 0 0-.531 1.137l1.467 4.027a.883.883 0 0 0 1.136.529l6.919-2.518l-4.694 12.657a.888.888 0 0 0-.003.612l1.402 3.854a.887.887 0 0 0 1.137.529l15.953-5.807a.887.887 0 0 0 .53-1.137l-1.479-4.061a.888.888 0 0 0-1.137-.529"
      />
    </Svg>
  );
}

const Svg = styled.svg<{
  size?: number;
  highlight?: string;
  hovered?: boolean;
  link?: boolean;
}>`
  height: ${(props) => `${props.size}px`};
  cursor: ${(props) => (props.link ? 'default' : 'pointer')};
  transition: opacity 0.2s ease-out;
  transition: color 0.2s ease-out;

  :hover {
    color: ${(props) => (props.highlight ? props.highlight : '')};
    opacity: 100%;
  }
`;
