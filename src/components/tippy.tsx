import TippyReact, { TippyProps } from '@tippyjs/react';

export function Tippy(props: TippyProps) {
  return (
    <TippyReact className="bg-white text-black dark:text-white dark:bg-neutral-700 drop-shadow-lg p-3 rounded-md" duration={0} {...props}>
      {props.children}
    </TippyReact>
  );
}