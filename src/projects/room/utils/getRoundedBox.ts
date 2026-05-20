import { ExtrudeGeometry, Shape } from 'three';

export function getRoundedBoxGeometry({
  width,
  height,
  depth,
  radius
}: {
  width: number,
  height: number,
  depth: number,
  radius: number
}) {
  const shape = new Shape();

  const x = -width / 2;
  const y = -depth / 2;

  // Start at the bottom edge, moving right
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);

  // Bottom-Right corner
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);

  // Right edge moving up
  shape.lineTo(x + width, y + depth - radius);

  // Top-Right corner
  shape.quadraticCurveTo(x + width, y + depth, x + width - radius, y + depth);

  // Top edge moving left
  shape.lineTo(x + radius, y + depth);

  // Top-Left corner
  shape.quadraticCurveTo(x, y + depth, x, y + depth - radius);

  // Left edge moving down
  shape.lineTo(x, y + radius);

  // Bottom-Left corner
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false
  });

  geometry.rotateX(-0.5 * Math.PI);

  return geometry;
}
