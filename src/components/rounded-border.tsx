import { HTMLProps } from 'react';
import useRoundedBorder from './use-rounded-border.tsx';
import IgnoreBorder from './ignore-border.tsx';

export default function (props: HTMLProps<HTMLDivElement>) {
  const { containerRef } = useRoundedBorder();

  return (
    <>
      <svg />
      <IgnoreBorder>
        <div ref={containerRef} {...props}>
          {props.children}
        </div>
      </IgnoreBorder>
    </>
  );
}
