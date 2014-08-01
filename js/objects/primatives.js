Cuboctahedron = function (origin, c, bc) {
  /* Declare the center of the shape to make rotations easy */
  var center = origin; //.translate(0.5, 0.5, 0);
  var faces = [];

  // Corner sizes, for a full cuboctahedron these should be equal,
  // and set to 0.4999999 to prevent clipping

  // Top corner radius
  if (c == undefined) {
    c = 0.4999999;
  }

  // Bottom corner radius
  if (bc == undefined) {
    bc = 0.4999999;
  }

  console.log(bc)

  /* Draw the side faces */
  if (bc > 0) {
    var sideFace = new Path([
      center.translate(0.5, 0.5, 0 + bc),
      center.translate(0.5 - bc, 0.5, 0),
      center.translate(-0.5 + bc, 0.5, 0),
      center.translate(-0.5, 0.5, 0 + bc),
      center.translate(-0.5, 0.5, 1 - c), // left lower corner of top
      center.translate(-0.5 + c, 0.5, 1), // left top corner
      center.translate(0.5 - c, 0.5, 1),  // right top corner
      center.translate(0.5, 0.5, 1 - c),  // right lower corner of top
    ]);
  } else {
    // paths with multiple points that are the same current render as black
    var sideFace = new Path([
      center.translate(0.5, 0.5, 0 + bc),
      center.translate(-0.5, 0.5, 0 + bc),
      center.translate(-0.5, 0.5, 1 - c), // left lower corner of top
      center.translate(-0.5 + c, 0.5, 1), // left top corner
      center.translate(0.5 - c, 0.5, 1),  // right top corner
      center.translate(0.5, 0.5, 1 - c),  // right lower corner of top
    ]);
  }

  var topTriangleFace = new Path([
    center.translate(-0.5, 0.5, 1 - c),
    center.translate(-0.5 + c, 0.5, 1),
    center.translate(-0.5, 0.5 - c, 1),
  ]);
  var bottomTriangleFace = new Path([
    center.translate(-0.5, 0.5, 0 + bc),
    center.translate(-0.5 + bc, 0.5, 0),
    center.translate(-0.5, 0.5 - bc, 0),
  ]);

  /* Draw the top */
  var topFace = new Path([
    center.translate(0.5, 0.5 - c, 1),
    center.translate(0.5 - c, 0.5, 1),
    center.translate(-0.5 + c, 0.5, 1),
    center.translate(-0.5, 0.5 - c, 1),
    center.translate(-0.5, -0.5 + c, 1),
    center.translate(-0.5 + c, -0.5, 1),
    center.translate(0.5 - c, -0.5, 1),
    center.translate(0.5, -0.5 + c, 1),
  ]);

  /* Draw the bottom */
  if (bc == 0) {
    var bottomFace = new Path([
      center.translate(0.5, 0.5 - bc, 0),
      center.translate(-0.5, 0.5 - bc, 0),
      center.translate(-0.5, -0.5 + bc, 0),
      center.translate(0.5, -0.5 + bc, 0),
    ]);
  } else {
    var bottomFace = new Path([
      center.translate(0.5, 0.5 - bc, 0),
      center.translate(0.5 - bc, 0.5, 0),
      center.translate(-0.5 + bc, 0.5, 0),
      center.translate(-0.5, 0.5 - bc, 0),
      center.translate(-0.5, -0.5 + bc, 0),
      center.translate(-0.5 + bc, -0.5, 0),
      center.translate(0.5 - bc, -0.5, 0),
      center.translate(0.5, -0.5 + bc, 0),
    ]);
  }

  // Push in all the faces
  faces.push(bottomFace);
  for (var i = 0; i < 4; i++) {
    faces.push(sideFace.rotateZ(center, i * Math.PI / 2));
    faces.push(topTriangleFace.rotateZ(center, i * Math.PI / 2));
    if (bc > 0) {
      faces.push(bottomTriangleFace.rotateZ(center, i * Math.PI / 2));
    }
  }
  faces.push(topFace);

  // Build shape
  var s = new Shape(faces)
  s.setColor(new Isomer.Color(195, 195, 195));

  return s
}

OutlinedCuboctahedron = function (origin, c, bc) {

  // Top corner radius
  if (c == undefined) {
    c = 0.4999999;
  }

  // Bottom corner radius
  if (bc == undefined) {
    bc = 0.4999999;
  }

  var oc = new Isomer.Object3D()

  // Get a basic cuboctahedron
  var co = new Cuboctahedron(origin, c, bc)
  oc.push(co)

  // Draw crufty outline
  var outline = new Isomer.Object3D()
  outline.push([
    new Path([
      origin.translate(-0.5, 0.5, 1 - c),
      origin.translate(-0.5, 0.5, 0 + bc),
      origin.translate(-0.5, 0.5, 1 - c),
    ]),
    new Path([
      origin.translate(-0.5, 0.5, 0 + bc),
      origin.translate(-0.5, 0.5 - bc, 0),
      origin.translate(-0.5, 0.5, 0 + bc),
    ]),
    new Path([
      origin.translate(-0.5, 0.5 - bc, 0),
      origin.translate(-0.5, -0.5 + bc, 0),
      origin.translate(-0.5, 0.5 - bc, 0),
    ]),
    new Path([
      origin.translate(-0.5, -0.5 + bc, 0),
      origin.translate(-0.5 + bc, -0.5, 0),
      origin.translate(-0.5, -0.5 + bc, 0),
    ]),
    new Path([
      origin.translate(-0.5 + bc, -0.5, 0),
      origin.translate(0.5 - bc, -0.5, 0),
      origin.translate(-0.5 + bc, -0.5, 0),
    ]),
    new Path([
      origin.translate(0.5 - bc, -0.5, 0),
      origin.translate(0.5, -0.5, 0 + bc),
      origin.translate(0.5 - bc, -0.5, 0),
    ]),
    new Path([
      origin.translate(0.5, -0.5, 0 + bc),
      origin.translate(0.5, -0.5, 1 - c),
      origin.translate(0.5, -0.5, 0 + bc),
    ]),
    new Path([
      origin.translate(0.5, -0.5, 1 - c),
      origin.translate(0.5, -0.5 + c, 1),
      origin.translate(0.5, -0.5, 1 - c),
    ]),
    new Path([
      origin.translate(0.5, -0.5 + c, 1),
      origin.translate(0.5, 0.5 - c, 1),
      origin.translate(0.5, -0.5 + c, 1),
    ]),
    new Path([
      origin.translate(0.5, 0.5 - c, 1),
      origin.translate(0.5 - c, 0.5, 1),
      origin.translate(0.5, 0.5 - c, 1),
    ]),
    new Path([
      origin.translate(0.5 - c, 0.5, 1),
      origin.translate(-0.5 + c, 0.5, 1),
      origin.translate(0.5 - c, 0.5, 1),
    ]),
    new Path([
      origin.translate(-0.5 + c, 0.5, 1),
      origin.translate(-0.5, 0.5, 1 - c),
      origin.translate(-0.5 + c, 0.5, 1),
    ]),
  ]);
  oc.push(outline);

  return oc
}
