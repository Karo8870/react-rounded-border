import { CordLine, Line, Point, Rectangle } from './models';

const loadRectangle = (points: Point[], lines: Line[], rect: Rectangle) => {
  points.push({
    x: rect.x,
    y: rect.y
  });

  points.push({
    x: rect.x + rect.width,
    y: rect.y
  });

  points.push({
    x: rect.x,
    y: rect.y + rect.height
  });

  points.push({
    x: rect.x + rect.width,
    y: rect.y + rect.height
  });

  const len = points.length;

  lines.push({
    p1: len - 1,
    p2: len - 2
  });

  lines.push({
    p1: len - 2,
    p2: len - 3
  });

  lines.push({
    p1: len - 3,
    p2: len - 4
  });

  lines.push({
    p1: len - 4,
    p2: len - 1
  });
};

const getVertical = (rectangles: Rectangle[]) => {
  const lines: CordLine[] = [];

  for (const rect of rectangles) {
    lines.push({
      a: rect.y,
      b: rect.y + rect.height
    });
  }

  return lines;
};

const getHorizontal = (rectangles: Rectangle[]) => {
  const lines: CordLine[] = [];

  for (const rect of rectangles) {
    lines.push({
      a: rect.x,
      b: rect.x + rect.width
    });
  }

  return lines;
};

const roundedBorderPath = (rectangles: Rectangle[]) => {
  const points: Point[] = [];
  const lines: Line[] = [];

  for (const rect of rectangles) {
    loadRectangle(points, lines, rect);
  }

  const verticals: CordLine[] = getVertical(rectangles);
  const horizontals: CordLine[] = getHorizontal(rectangles);
};

const test = (rectangles: Rectangle[]) => {
  const points: { [key: number]: Point } = {}; // x, y
  const lines: { [key: number]: CordLine } = {}; // p1, p2

  let k = 0,
    l = 0;

  for (const rect of rectangles) {
    points[k++] = {
      x: rect.x,
      y: rect.y
    };

    points[k++] = {
      x: rect.x + rect.width,
      y: rect.y
    };

    points[k++] = {
      x: rect.x,
      y: rect.y + rect.height
    };

    points[k++] = {
      x: rect.x + rect.width,
      y: rect.y + rect.height
    };

    lines[l++] = {
      a: k - 4,
      b: k - 3
    };

    lines[l++] = {
      a: k - 3,
      b: k - 2
    };

    lines[l++] = {
      a: k - 2,
      b: k - 1
    };

    lines[l++] = {
      a: k - 1,
      b: k - 4
    };
  }
};

export default {
  roundedBorderPath
};
