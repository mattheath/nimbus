/**
 * Various changes, or additional features for Isomer
 * @todo back port these
 *
 */

/**
 * Sets the color of a path
 */
Isomer.Path.prototype.setColor = function (color) {
  this.color = color;
};

/**
 * Sets the color of a shape, by setting the color of each path
 */
Isomer.Shape.prototype.setColor = function (color) {
  var paths = this.paths;
  for (i = 0; i < paths.length; i++) {
    paths[i].color = color;
  }
  this.paths = paths
}

/**
 * Returns a new path rotated along the Y axis by a given origin
 *
 * Simply a forward to Point#rotateY
 */
Isomer.Path.prototype.rotateY = function () {
  var args = arguments;

  return new Path(this.points.map(function (point) {
    return point.rotateY.apply(point, args);
  }));
};

/**
 * Rotate about origin on the Y axis
 */
Isomer.Point.prototype.rotateY = function (origin, angle) {
  var p = this.translate(-origin.x, -origin.y, -origin.z);

  var x = p.x * Math.cos(angle) - p.z * Math.sin(angle);
  var z = p.x * Math.sin(angle) + p.z * Math.cos(angle);
  p.x = x;
  p.z = z;

  return p.translate(origin.x, origin.y, origin.z);
};

/**
 * Returns a new path rotated along the X axis by a given origin
 *
 * Simply a forward to Point#rotateX
 */
Isomer.Path.prototype.rotateX = function () {
  var args = arguments;

  return new Path(this.points.map(function (point) {
    return point.rotateX.apply(point, args);
  }));
};

/**
 * Rotate about origin on the X axis
 */
Isomer.Point.prototype.rotateX = function (origin, angle) {
  var p = this.translate(-origin.x, -origin.y, -origin.z);

  var z = p.z * Math.cos(angle) - p.y * Math.sin(angle);
  var y = p.z * Math.sin(angle) + p.y * Math.cos(angle);
  p.z = z;
  p.y = y;

  return p.translate(origin.x, origin.y, origin.z);
};

/**
 * Build out a collection object which can contain lots of objects
 */

function Object3D(shapes) {
   if (Object.prototype.toString.call(shapes) === '[object Array]') {
    this.items = shapes;
  } else {
    this.items = Array.prototype.slice.call(arguments);
  }
}

Object3D.prototype.push = function (item, color) {
  if (Object.prototype.toString.call(item) == '[object Array]') {
    for (var i = 0; i < item.length; i++) {
      this.push(item[i], color);
    }
  } else {
    if (color instanceof Isomer.Color) {
      item.setColor(color);
    }
    this.items.push(item);
  }
}

/**
 * Translates a given object
 *
 * Simply a forward to Shape#translate
 */
Object3D.prototype.translate = function () {
  var args = arguments;
  console.log(args)
  return new Object3D(this.items.map(function (shape) {
    return shape.translate.apply(shape, args);
  }));
}

Isomer.Object3D = Object3D;

/**
 * Helpers
 */

function originMarker() {

  var o = new Isomer.Object3D()

  var x = new Path([
      new Point(0, 0, 0),
      new Point(1, 0, 0),    // x
      new Point(1, 0.01, 0), // x
      new Point(0, 0.01, 0),
  ])
  x.setColor(new Color(255, 0, 0))

  var y = new Path([
      new Point(0, 0, 0),
      new Point(0, 1, 0),    // y
      new Point(0.01, 1, 0), // y
      new Point(0.01, 0, 0),
  ])
  y.setColor(new Color(0, 255, 0))

  var z = new Path([
      new Point(0, 0, 0),
      new Point(0, 0, 1),    // z
      new Point(0.01, 0, 1), // z
      new Point(0.01, 0, 0),
  ])
  z.setColor(new Color(0, 0, 255))

  o.push([x, y, z])
  return o
}