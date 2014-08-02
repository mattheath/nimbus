Cuboctahedron = function (origin, w, h, c, bc) {

  var w = w || 1
  var h = h || w

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
      center.translate(w/2, w/2, 0 + bc),
      center.translate(w/2 - bc, w/2, 0),
      center.translate(-w/2 + bc, w/2, 0),
      center.translate(-w/2, w/2, 0 + bc),
      center.translate(-w/2, w/2, h - c), // left lower corner of top
      center.translate(-w/2 + c, w/2, h), // left top corner
      center.translate(w/2 - c, w/2, h),  // right top corner
      center.translate(w/2, w/2, h - c),  // right lower corner of top
    ]);
  } else {
    // paths with multiple points that are the same current render as black
    var sideFace = new Path([
      center.translate(w/2, w/2, 0 + bc),
      center.translate(-w/2, w/2, 0 + bc),
      center.translate(-w/2, w/2, h - c), // left lower corner of top
      center.translate(-w/2 + c, w/2, h), // left top corner
      center.translate(w/2 - c, w/2, h),  // right top corner
      center.translate(w/2, w/2, h - c),  // right lower corner of top
    ]);
  }

  var topTriangleFace = new Path([
    center.translate(-w/2, w/2, h - c),
    center.translate(-w/2 + c, w/2, h),
    center.translate(-w/2, w/2 - c, h),
  ]);
  var bottomTriangleFace = new Path([
    center.translate(-w/2, w/2, 0 + bc),
    center.translate(-w/2 + bc, w/2, 0),
    center.translate(-w/2, w/2 - bc, 0),
  ]);

  /* Draw the top */
  var topFace = new Path([
    center.translate(w/2, w/2 - c, h),
    center.translate(w/2 - c, w/2, h),
    center.translate(-w/2 + c, w/2, h),
    center.translate(-w/2, w/2 - c, h),
    center.translate(-w/2, -w/2 + c, h),
    center.translate(-w/2 + c, -w/2, h),
    center.translate(w/2 - c, -w/2, h),
    center.translate(w/2, -w/2 + c, h),
  ]);

  /* Draw the bottom */
  if (bc == 0) {
    var bottomFace = new Path([
      center.translate(w/2, w/2 - bc, 0),
      center.translate(-w/2, w/2 - bc, 0),
      center.translate(-w/2, -w/2 + bc, 0),
      center.translate(w/2, -w/2 + bc, 0),
    ]);
  } else {
    var bottomFace = new Path([
      center.translate(w/2, w/2 - bc, 0),
      center.translate(w/2 - bc, w/2, 0),
      center.translate(-w/2 + bc, w/2, 0),
      center.translate(-w/2, w/2 - bc, 0),
      center.translate(-w/2, -w/2 + bc, 0),
      center.translate(-w/2 + bc, -w/2, 0),
      center.translate(w/2 - bc, -w/2, 0),
      center.translate(w/2, -w/2 + bc, 0),
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

OutlinedCuboctahedron = function (origin, w, h, c, bc) {

  var w = w || 1
  var h = h || w

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
  var co = new Cuboctahedron(origin, w, h, c, bc)
  oc.push(co)

  // Draw crufty outline
  var outline = new Isomer.Object3D()
  outline.push([
    new Path([
      origin.translate(-w/2, w/2, h - c),
      origin.translate(-w/2, w/2, 0 + bc),
      origin.translate(-w/2, w/2, h - c),
    ]),
    new Path([
      origin.translate(-w/2, w/2, 0 + bc),
      origin.translate(-w/2, w/2 - bc, 0),
      origin.translate(-w/2, w/2, 0 + bc),
    ]),
    new Path([
      origin.translate(-w/2, w/2 - bc, 0),
      origin.translate(-w/2, -w/2 + bc, 0),
      origin.translate(-w/2, w/2 - bc, 0),
    ]),
    new Path([
      origin.translate(-w/2, -w/2 + bc, 0),
      origin.translate(-w/2 + bc, -w/2, 0),
      origin.translate(-w/2, -w/2 + bc, 0),
    ]),
    new Path([
      origin.translate(-w/2 + bc, -w/2, 0),
      origin.translate(w/2 - bc, -w/2, 0),
      origin.translate(-w/2 + bc, -w/2, 0),
    ]),
    new Path([
      origin.translate(w/2 - bc, -w/2, 0),
      origin.translate(w/2, -w/2, 0 + bc),
      origin.translate(w/2 - bc, -w/2, 0),
    ]),
    new Path([
      origin.translate(w/2, -w/2, 0 + bc),
      origin.translate(w/2, -w/2, h - c),
      origin.translate(w/2, -w/2, 0 + bc),
    ]),
    new Path([
      origin.translate(w/2, -w/2, h - c),
      origin.translate(w/2, -w/2 + c, h),
      origin.translate(w/2, -w/2, h - c),
    ]),
    new Path([
      origin.translate(w/2, -w/2 + c, h),
      origin.translate(w/2, w/2 - c, h),
      origin.translate(w/2, -w/2 + c, h),
    ]),
    new Path([
      origin.translate(w/2, w/2 - c, h),
      origin.translate(w/2 - c, w/2, h),
      origin.translate(w/2, w/2 - c, h),
    ]),
    new Path([
      origin.translate(w/2 - c, w/2, h),
      origin.translate(-w/2 + c, w/2, h),
      origin.translate(w/2 - c, w/2, h),
    ]),
    new Path([
      origin.translate(-w/2 + c, w/2, h),
      origin.translate(-w/2, w/2, h - c),
      origin.translate(-w/2 + c, w/2, h),
    ]),
  ]);
  oc.push(outline);

  return oc
}

OutlinedCross = function (origin, w, h, c, t) {

  var cross = new Isomer.Object3D();

  w = w || 2; // width
  h = h || w; // overall height
  c = c || 0; // corner radius
  t = t || h; // height of top (centre)
  var faces = [];

  /* Draw the bottom */
  var bottomFace = new Path([
    origin.translate(-w/2 + c, -w/2, 0),
    origin.translate(w/2 - c, -w/2, 0),
    origin.translate(w/2 - c, -w/2 + c, 0),
    origin.translate(w/2, -w/2 + c, 0),
    origin.translate(w/2, w/2 - c, 0),
    origin.translate(w/2 - c, w/2 - c, 0),
    origin.translate(w/2 - c, w/2, 0),
    origin.translate(-w/2 + c, w/2, 0),
    origin.translate(-w/2 + c, w/2 - c, 0),
    origin.translate(-w/2, w/2 - c, 0),
    origin.translate(-w/2, -w/2 + c, 0),
    origin.translate(-w/2 + c, -w/2 + c, 0),
  ]);

  /* Draw the side faces for each section which we then rotate into position */

  // Outward face
  var face1 = new Path([
    origin.translate(-w/2 + c, -w/2, 0),
    origin.translate(w/2 - c, -w/2, 0),
    origin.translate(w/2 - c, -w/2, h),
    origin.translate(-w/2 + c, -w/2, h),
  ]);

  // Side face
  var face2 = new Path([
    origin.translate(-w/2 + c, -w/2 + c, 0),
    origin.translate(-w/2 + c, -w/2, 0),
    origin.translate(-w/2 + c, -w/2, h),
    origin.translate(-w/2 + c, -w/2 + c, t),
  ]);

  // Move and flip to make opposing side
  var face3 = face2.translate(w - 2*c, 0, 0).reverse();

  // Top sloping face
  var face4 = new Path([
    origin.translate(w/2 - c, -w/2, h),
    origin.translate(w/2 - c, -w/2 + c, t),
    origin.translate(-w/2 + c, -w/2 + c, t),
    origin.translate(-w/2 + c, -w/2, h),
  ]);

  /* Draw the top */
  var topFace = new Path([
    origin.translate(w/2 - c, -w/2 + c, t),
    origin.translate(w/2 - c, w/2 - c, t),
    origin.translate(-w/2 + c, w/2 - c, t),
    origin.translate(-w/2 + c, -w/2 + c, t),
  ]);

  // Push in all the faces
  for (var i = 0; i < 4; i++) {
    faces.push(face1.rotateZ(origin, i * Math.PI / 2));
    faces.push(face2.rotateZ(origin, i * Math.PI / 2));
    faces.push(face3.rotateZ(origin, i * Math.PI / 2));
    faces.push(face4.rotateZ(origin, i * Math.PI / 2));
  }
  faces.push(bottomFace);
  faces.push(topFace);

  // Build the shape from our faces
  var s = new Shape(faces)
  s.setColor(new Isomer.Color(195, 195, 195));
  cross.push(s)

  // Draw outline
  var outline = new Isomer.Object3D()
  outline.push([
    new Path([
      origin.translate(-w/2 + c, -w/2 + c, 0),
      origin.translate(-w/2 + c, -w/2, 0),
      origin.translate(-w/2 + c, -w/2 + c, 0),
    ]),
    new Path([
      origin.translate(-w/2 + c, -w/2, 0),
      origin.translate(w/2 - c, -w/2, 0),
      origin.translate(-w/2 + c, -w/2, 0),
    ]),
    new Path([
      origin.translate(w/2 - c, -w/2, 0),
      origin.translate(w/2 - c, -w/2, h),
      origin.translate(w/2 - c, -w/2, 0),
    ]),
    new Path([
      origin.translate(w/2, -w/2 + c, 0),
      origin.translate(w/2, -w/2 + c, h),
      origin.translate(w/2, -w/2 + c, 0),
    ]),
    new Path([
      origin.translate(w/2, -w/2 + c, h),
      origin.translate(w/2, w/2 - c, h),
      origin.translate(w/2, -w/2 + c, h),
    ]),
    new Path([
      origin.translate(w/2, w/2 - c, h),
      origin.translate(w/2 - c, w/2 - c, t),
      origin.translate(w/2, w/2 - c, h),
    ]),
    new Path([
      origin.translate(w/2 - c, w/2 - c, t),
      origin.translate(w/2 - c, w/2, h),
      origin.translate(w/2 - c, w/2 - c, t),
    ]),
    new Path([
      origin.translate(w/2 - c, w/2, h),
      origin.translate(-w/2 + c, w/2, h),
      origin.translate(w/2 - c, w/2, h),
    ]),
    new Path([
      origin.translate(-w/2 + c, w/2, h),
      origin.translate(-w/2 + c, w/2, 0),
      origin.translate(-w/2 + c, w/2, h),
    ]),
    new Path([
      origin.translate(-w/2, w/2 - c, h),
      origin.translate(-w/2, w/2 - c, 0),
      origin.translate(-w/2, w/2 - c, h),
    ]),
    new Path([
      origin.translate(-w/2, w/2 - c, 0),
      origin.translate(-w/2, -w/2 + c, 0),
      origin.translate(-w/2, w/2 - c, 0),
    ]),
    new Path([
      origin.translate(-w/2, -w/2 + c, 0),
      origin.translate(-w/2 + c, -w/2 + c, 0),
      origin.translate(-w/2, -w/2 + c, 0),
    ]),
  ])
  cross.push(outline)

  return cross
}
