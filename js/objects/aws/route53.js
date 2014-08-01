/**
 * Route53 - Amazon's DNS Service
 *
 * Provides icons and objects for Route53
 */

/**
 * Route53 returns an icon representing a Route 53 endpoint
 */
Route53 = function (origin) {

  var r53 = new Isomer.Object3D();

  var a = 2; // triangle side length
  var h = a * (Math.sqrt(3)/2);
  var b = a * 0.17; // corner cutoff amount
  var h1 = b * (Math.sqrt(3)/2);
  var h2 = h - h1; // final shape height
  var z = a / 1.8; // Height to width ratio

  // Move the centre to the centre point of the shape
  var centre = origin.translate(-h2/2, 0, 0);

  // Calculate path vertices & extrude

  r53.push(Shape.extrude(new Path([
    Point(h2, b/2, 0), // z
    Point(h1, a/2 - b/2, 0), // gamma
    Point(0, a/2 - b, 0), // alpha
    Point(0, b - a/2, 0), // beta
    Point(h1, b/2 - a/2, 0), // x
    Point(h2, -b/2, 0), // y
  ]), z).translate(centre.x, centre.y, centre.z),
    new Isomer.Color(195, 195, 195));

  var outline = new Isomer.Object3D()
  outline.push([
    new Path([
      new Point(h2, -b/2, 0), // y
      new Point(h2, -b/2, z), // y
      new Point(h2, -b/2, 0), // y
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(h2, -b/2, 0), // z
      new Point(h1, b/2 - a/2, 0), // x
      new Point(h2, -b/2, 0), // z
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(h1, b/2 - a/2, 0), // x
      new Point(0, b - a/2, 0), // beta
      new Point(h1, b/2 - a/2, 0), // x
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(0, b - a/2, 0), // beta
      new Point(0, a/2 - b, 0), // alpha
      new Point(0, b - a/2, 0), // beta
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(0, a/2 - b, 0), // alpha
      new Point(0, a/2 - b, z), // alpha
      new Point(0, a/2 - b, 0), // alpha
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(0, a/2 - b, z), // alpha
      new Point(h1, a/2 - b/2, z), // gamma
      new Point(0, a/2 - b, z), // alpha
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(h1, a/2 - b/2, z), // gamma
      new Point(h2, b/2, z), // z
      new Point(h1, a/2 - b/2, z), // gamma
    ]).translate(centre.x, centre.y, centre.z),
    new Path([
      new Point(h2, b/2, z), // z
      new Point(h2, -b/2, z), // y
      new Point(h2, b/2, z), // z
    ]).translate(centre.x, centre.y, centre.z)
  ]);
  r53.push(outline);

  // Add a logo on top - currenly a square
  r53.push(new Isomer.Path([
    origin.translate(-0.2, -0.2, z),
    origin.translate(0.2, -0.2, z),
    origin.translate(0.2, 0.2, z),
    origin.translate(-0.2, 0.2, z)
  ]), new Isomer.Color(72, 72, 72));

  return r53
}