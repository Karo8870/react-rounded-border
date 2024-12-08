import { HTMLAttributes, ReactNode } from 'react';
import './RoundedBorder.scss';
import useRoundedBorder from './useRoundedBorder';

interface RoundedBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const RoundedBorder = (props: RoundedBorderProps) => {
  const { divRef, svgRef } = useRoundedBorder(props.children);

  return (
    <div
      {...props}
      ref={divRef}
      className={`${props.className || ''} rounded-border-wrapper`}
    >
      <svg ref={svgRef} className="rounded-border-svg"></svg>
      {props.children}
    </div>
  );
};

export default RoundedBorder;
