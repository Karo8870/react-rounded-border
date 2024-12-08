import { ReactNode, useEffect, useRef } from 'react';

const useRoundedBorder = (children: ReactNode) => {
  const divRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {}, [children]);

  return {
    divRef,
    svgRef
  };
};

export default useRoundedBorder;
