import { HTMLProps } from 'react';
import IncludeBorder from './include-border.tsx';

export default function ({ ...props }: HTMLProps<HTMLDivElement> & {}) {
  return (
    <div {...props}>
      <IncludeBorder>
        <span text-rounded-border='' rounded-border='true'>
          {props.children}
        </span>
      </IncludeBorder>
    </div>
  );
}
