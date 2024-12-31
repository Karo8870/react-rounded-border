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
  backgroundProps?: HTMLProps<SVGSVGElement>;
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
  backgroundProps = {},
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
      style={{
        position: 'relative',
        zIndex: 10,
        ...props.style
      }}
    >
      <svg
        ref={svgRef}
        {...backgroundProps}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          ...backgroundProps?.style
        }}
      />
      {props.children}
    </div>
  );
}
