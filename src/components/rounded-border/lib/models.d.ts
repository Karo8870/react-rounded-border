export interface Point {
  x: number;
  y: number;
}

export interface Rectangle extends Point {
  width: number;
  height: number;
}

export interface Line {
  p1: number;
  p2: number;
}

export interface CordLine {
  a: number;
  b: number;
}
