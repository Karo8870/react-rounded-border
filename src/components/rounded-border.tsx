import { HTMLProps } from 'react';
import useRoundedBorder from './use-rounded-border.tsx';

export default function ({
  padding = 0,
  paddingTop,
  paddingLeft,
  paddingBottom,
  paddingRight,
  minBorderRadius = 0,
  borderRadius = 0,
  ...props
}: HTMLProps<HTMLDivElement> & {
  padding?: number;
  minBorderRadius?: number;
  borderRadius?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  paddingRight?: number;
}) {
  const { containerRef, svgRef } = useRoundedBorder({
    padding,
    minBorderRadius,
    borderRadius,
    paddingBottom,
    paddingRight,
    paddingLeft,
    paddingTop
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
