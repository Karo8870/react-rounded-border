import { useEffect, useRef } from 'react';
import union from '@turf/union';
import { featureCollection, polygon } from '@turf/helpers';

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

function getPolygons(nodes: HTMLElement[], padding: number) {
  const polygons: ReturnType<typeof polygon>[] = [];

  for (const node of nodes) {
    if (node.getAttribute('text-rounded-border') !== null) {
      for (const rect of node.getClientRects()) {
        polygons.push(
          polygon([
            [
              [rect.left - padding, rect.top - padding],
              [rect.right + padding, rect.top - padding],
              [rect.right + padding, rect.bottom + padding],
              [rect.left - padding, rect.bottom + padding],
              [rect.left - padding, rect.top - padding]
            ]
          ])
        );
      }
    } else {
      const rect = node.getBoundingClientRect();

      polygons.push(
        polygon([
          [
            [rect.left - padding, rect.top - padding],
            [rect.right + padding, rect.top - padding],
            [rect.right + padding, rect.bottom + padding],
            [rect.left - padding, rect.bottom + padding],
            [rect.left - padding, rect.top - padding]
          ]
        ])
      );
    }
  }

  return polygons;
}

function getPoints(
  polygons: ReturnType<typeof polygon>[]
): [number, number][][] {
  if (polygons.length === 0) {
    return [];
  }

  if (polygons.length === 1) {
    return polygons[0].geometry.coordinates as [number, number][][];
  }

  const uni = union(featureCollection(polygons));

  if (uni!.geometry.type === 'Polygon') {
    return uni!.geometry.coordinates as [number, number][][];
  }

  return uni!.geometry.coordinates.flat() as [number, number][][];
}

export default function ({
  padding,
  minBorderRadius,
  borderRadius
}: {
  padding: number;
  minBorderRadius: number;
  borderRadius: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const svg = svgRef.current!;

    const nodes = getNodes(container);
    const polygons = getPolygons(nodes, padding);
    const result = getPoints(polygons);

    let content = '';

    for (const pol of result) {
      let path = '';

      for (const point of pol) {

      }

      content += `<path d="${path}" stroke="white" fill="red" />`;
    }

    svg.innerHTML += content;
  }, []);

  return { containerRef, svgRef };
}
