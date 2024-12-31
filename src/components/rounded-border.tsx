import { HTMLProps } from 'react';
import useRoundedBorder from './use-rounded-border.tsx';

export interface RoundedBorderProps {
  padding?: number;
  minBorderRadius?: number;
  borderRadius?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  paddingRight?: number;
  fill?: string;
  stroke?: string;
}

export default function ({
  padding = 0,
  paddingTop,
  paddingLeft,
  paddingBottom,
  paddingRight,
  minBorderRadius = 0,
  borderRadius = 0,
  fill = 'white',
  stroke = 'none',
  ...props
}: HTMLProps<HTMLDivElement> & RoundedBorderProps) {
  const { containerRef, svgRef } = useRoundedBorder({
    minBorderRadius,
    borderRadius,
    paddingBottom: paddingBottom ?? padding,
    paddingRight: paddingRight ?? padding,
    paddingLeft: paddingLeft ?? padding,
    paddingTop: paddingTop ?? padding,
    fill,
    stroke
  });

  return (
    <div
      ref={containerRef}
      {...props}
      className={`relative test z-50 ${props.className}`}
    >
      <svg
        ref={svgRef}
        className='absolute top-0 w-full h-full left-0 z-[-1]'
      />
      {props.children}
    </div>
  );
}
