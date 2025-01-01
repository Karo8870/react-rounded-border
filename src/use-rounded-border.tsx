import { useEffect, useRef } from 'react';
import union from '@turf/union';
import { featureCollection, polygon } from '@turf/helpers';

type Point = [number, number];

function getRecursiveNodes(node: Element, nodes: Element[]) {
  if (node.getAttribute('rounded-border') !== null) {
    nodes.push(node);
  }

  for (const n of node.children) {
    getRecursiveNodes(n, nodes);
  }
}

function getNodes(node: Element) {
  const nodes: HTMLElement[] = [];

  getRecursiveNodes(node, nodes);

  return nodes;
}

function getPolygons(
  nodes: HTMLElement[],
  paddingLeft: number,
  paddingTop: number,
  paddingRight: number,
  paddingBottom: number
) {
  const polygons: ReturnType<typeof polygon>[] = [];

  for (const node of nodes) {
    if (node.getAttribute('text-rounded-border') !== null) {
      for (const rect of node.getClientRects()) {
        polygons.push(
          polygon([
            [
              [rect.left - paddingLeft, rect.top - paddingTop],
              [rect.right + paddingRight, rect.top - paddingTop],
              [rect.right + paddingRight, rect.bottom + paddingBottom],
              [rect.left - paddingLeft, rect.bottom + paddingBottom],
              [rect.left - paddingLeft, rect.top - paddingTop]
            ]
          ])
        );
      }
    } else {
      const rect = node.getBoundingClientRect();

      polygons.push(
        polygon([
          [
            [rect.left - paddingLeft, rect.top - paddingTop],
            [rect.right + paddingRight, rect.top - paddingTop],
            [rect.right + paddingRight, rect.bottom + paddingBottom],
            [rect.left - paddingLeft, rect.bottom + paddingBottom],
            [rect.left - paddingLeft, rect.top - paddingTop]
          ]
        ])
      );
    }
  }

  return polygons;
}

function getPoints(polygons: ReturnType<typeof polygon>[]): Point[][] {
  if (polygons.length === 0) {
    return [];
  }

  if (polygons.length === 1) {
    return polygons[0].geometry.coordinates as Point[][];
  }

  const uni = union(featureCollection(polygons));

  if (uni!.geometry.type === 'Polygon') {
    return uni!.geometry.coordinates as Point[][];
  }

  return uni!.geometry.coordinates.flat() as Point[][];
}

function fastDist(A: Point, B: Point): number {
  if (A[0] === B[0]) {
    return Math.abs(A[1] - B[1]);
  }

  return Math.abs(A[0] - B[0]);
}

function orientation(A: Point, B: Point, C: Point) {
  return (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]) > 0;
}

interface UseRoundedBorderProps {
  minBorderRadius: number;
  borderRadius: number;
  paddingTop: number;
  paddingLeft: number;
  paddingBottom: number;
  paddingRight: number;
  fill: string;
  stroke: string;
}

export default function ({
  minBorderRadius,
  borderRadius,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  fill,
  stroke
}: UseRoundedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const svg = svgRef.current!;

    const nodes = getNodes(container);

    const polygons = getPolygons(
      nodes,
      paddingLeft,
      paddingTop,
      paddingRight,
      paddingBottom
    );

    const result = getPoints(polygons);

    let content = '';

    let endX, endY;

    for (const pol of result) {
      let path = '';

      pol.push(pol[1]);

      for (let i = 1; i < pol.length - 1; i++) {
        const prev = pol[i - 1],
          cur = pol[i],
          next = pol[i + 1];

        const radius = Math.min(
          fastDist(prev, cur) / 2,
          fastDist(cur, next) / 2,
          borderRadius
        );

        if (radius < minBorderRadius) {
          // Merge lines
        }

        if (prev[0] === cur[0]) {
          // equal X, vertical
          if (cur[1] > prev[1]) {
            path += `L${cur[0]} ${cur[1] - radius}`;
          } else {
            path += `L${cur[0]} ${cur[1] + radius}`;
          }
        } else {
          // equal Y, horizontal
          if (cur[0] > prev[0]) {
            path += `L${cur[0] - radius} ${cur[1]}`;
          } else {
            path += `L${cur[0] + radius} ${cur[1]}`;
          }
        }

        if (next[0] === cur[0]) {
          // equal X, vertical
          endX = cur[0];

          if (cur[1] > next[1]) {
            endY = cur[1] - radius;
          } else {
            endY = cur[1] + radius;
          }
        } else {
          // equal Y, horizontal
          endY = cur[1];

          if (cur[0] > next[0]) {
            endX = cur[0] - radius;
          } else {
            endX = cur[0] + radius;
          }
        }

        path += `A${radius} ${radius} 0 0 ${+orientation(prev, cur, next)} ${endX} ${endY}`;
      }

      content += `<path d="M ${endX} ${endY} ${path}" stroke="${stroke}" fill="${fill}" />`;
    }

    svg.innerHTML += content;
  }, []);

  return { containerRef, svgRef };
}
