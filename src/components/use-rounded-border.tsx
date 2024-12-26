import { useEffect, useRef } from 'react';
import union from '@turf/union';
import { featureCollection, polygon } from '@turf/helpers';

function getRecursiveNodes(node: Element, nodes: Element[]) {
  if (node.getAttribute('data-ignore-all-borders') !== null) {
    return;
  }

  if (node.getAttribute('data-ignore-border') === null) {
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

function getPolygons(nodes: HTMLElement[]) {
  const polygons: any[] = [];

  for (const node of nodes) {
    const rect = node.getBoundingClientRect();

    polygons.push(
      polygon([
        [
          [rect.left, rect.top],
          [rect.right, rect.top],
          [rect.right, rect.bottom],
          [rect.left, rect.bottom],
          [rect.left, rect.top]
        ]
      ])
    );
  }

  return polygons;
}

export default function () {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const nodes = getNodes(container);

    const polygons = getPolygons(nodes);

    const result = union(featureCollection(polygons));

    console.log(result, featureCollection(polygons), nodes);
  }, []);

  return { containerRef };
}
