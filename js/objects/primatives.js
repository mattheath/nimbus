Cuboctahedron = function (origin, w, h, c, bc) {

  var clipBuffer = 0.0000001;
  var w = w || 1
  var h = h || w
  var faces = [];

  // Corner sizes, for a full cuboctahedron these should be equal,
  // and set to 0.4999999 to prevent clipping

  // Fix clipping for Top corner radius
  if (c == undefined || c >= w/2) {
    c = w/2 - clipBuffer;
  }
  if (c == 0) {
    c = clipBuffer;
  }

  // Fix clipping for Bottom corner radius
  if (bc == undefined || bc >= w/2) {
    bc = w/2 - clipBuffer;
  }
  if (bc == 0) {
    bc = clipBuffer;
  }

  /* Draw the side faces */
  var sideFace = new Path([
    origin.translate(w/2, w/2, 0 + bc),
    origin.translate(w/2 - bc, w/2, 0),
    origin.translate(-w/2 + bc, w/2, 0),
    origin.translate(-w/2, w/2, 0 + bc),
    origin.translate(-w/2, w/2, h - c), // left lower corner of top
    origin.translate(-w/2 + c, w/2, h), // left top corner
    origin.translate(w/2 - c, w/2, h),  // right top corner
    origin.translate(w/2, w/2, h - c),  // right lower corner of top
  ]);
  var topTriangleFace = new Path([
    origin.translate(-w/2, w/2, h - c),
    origin.translate(-w/2 + c, w/2, h),
    origin.translate(-w/2, w/2 - c, h),
  ]);
  var bottomTriangleFace = new Path([
    origin.translate(-w/2, w/2, 0 + bc),
    origin.translate(-w/2 + bc, w/2, 0),
    origin.translate(-w/2, w/2 - bc, 0),
  ]);

  /* Draw the top */
  var topFace = new Path([
    origin.translate(w/2, w/2 - c, h),
    origin.translate(w/2 - c, w/2, h),
    origin.translate(-w/2 + c, w/2, h),
    origin.translate(-w/2, w/2 - c, h),
    origin.translate(-w/2, -w/2 + c, h),
    origin.translate(-w/2 + c, -w/2, h),
    origin.translate(w/2 - c, -w/2, h),
    origin.translate(w/2, -w/2 + c, h),
  ]);

  /* Draw the bottom */
  var bottomFace = new Path([
    origin.translate(w/2, w/2 - bc, 0),
    origin.translate(w/2 - bc, w/2, 0),
    origin.translate(-w/2 + bc, w/2, 0),
    origin.translate(-w/2, w/2 - bc, 0),
    origin.translate(-w/2, -w/2 + bc, 0),
    origin.translate(-w/2 + bc, -w/2, 0),
    origin.translate(w/2 - bc, -w/2, 0),
    origin.translate(w/2, -w/2 + bc, 0),
  ]);

  // Push in all the faces
  for (var i = 0; i < 4; i++) {
    faces.push(sideFace.rotateZ(origin, i * Math.PI / 2));
    if (c > 0) {
      faces.push(topTriangleFace.rotateZ(origin, i * Math.PI / 2));
    }
    if (bc > 0) {
      faces.push(bottomTriangleFace.rotateZ(origin, i * Math.PI / 2));
    }
  }
  faces.push(topFace);
  faces.push(bottomFace);

  // Build shape
  var s = new Shape(faces)
  s.setColor(new Isomer.Color(195, 195, 195));

  return s
}

OutlinedCuboctahedron = function (origin, w, h, c, bc) {

  var clipBuffer = 0.0000001;
  var w = w || 1
  var h = h || w

  // Corner sizes, for a full cuboctahedron these should be equal,
  // and set to just under w/2 eg. 0.4999999 to prevent clipping

  // Fix clipping for Top corner radius
  if (c == undefined || c >= w/2) {
    c = w/2 - clipBuffer;
  }
  if (c == 0) {
    c = clipBuffer;
  }

  // Fix clipping for Bottom corner radius
  if (bc == undefined || bc >= w/2) {
    bc = w/2 - clipBuffer;
  }
  if (bc == 0) {
    bc = clipBuffer;
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

Frustum = function (origin, w, h, cr, bh) {

  var f = new Isomer.Object3D();
  var faces = [];

  w = w || 1;     // width
  h = h || w * 2; // overall height
  cr = cr || 0.25; // corner radius - how much the top is pulled in
  bh = bh || 0;   // base height - allows a raised flat edge around the base

  // defend against clipping
  if (cr >= w/2) {
    cr = w/2 - 0.0000001
  }

  // Draw the bottom
  faces.push(new Path([
    origin.translate(w/2, -w/2, 0),
    origin.translate(w/2, w/2, 0),
    origin.translate(-w/2, w/2, 0),
    origin.translate(-w/2, -w/2, 0),
  ]));

  // Draw the top
  faces.push(new Path([
    origin.translate(w/2 - cr, -w/2 + cr, h),
    origin.translate(w/2 - cr, w/2 - cr, h),
    origin.translate(-w/2 + cr, w/2 - cr, h),
    origin.translate(-w/2 + cr, -w/2 + cr, h),
  ]));

  // Draw the side faces for each section which we then rotate into position

  // Base edge face
  var face1 = new Path([
    origin.translate(-w/2, -w/2, 0),
    origin.translate(w/2, -w/2, 0),
    origin.translate(w/2, -w/2, bh),
    origin.translate(-w/2, -w/2, bh),
  ]);

  // Side face
  var face2 = new Path([
    origin.translate(w/2 - cr, -w/2 + cr, h),
    origin.translate(-w/2 + cr, -w/2 + cr, h),
    origin.translate(-w/2, -w/2, bh),
    origin.translate(w/2, -w/2, bh),
  ]);

  // Push in all the faces
  for (var i = 0; i < 4; i++) {
    faces.push(face1.rotateZ(origin, i * Math.PI / 2));
    faces.push(face2.rotateZ(origin, i * Math.PI / 2));
  }

  // Build the shape from our faces
  var s = new Shape(faces)
  s.setColor(new Isomer.Color(195, 195, 195));
  f.push(s)

  return f
}

OutlinedFrustum = function (origin, w, h, cr, bh) {

  var of = new Isomer.Object3D();

  w = w || 1;     // width
  h = h || w * 2; // overall height
  cr = cr || 0.25; // corner radius - how much the top is pulled in
  bh = bh || 0;   // base height - allows a raised flat edge around the base

  // defend against clipping
  if (cr >= w/2) {
    cr = w/2 - 0.0000001
  }

  // Get a Frustum
  of.push(new Frustum(origin, w, h, cr, bh));

  // Draw outline
  var outline = new Isomer.Object3D()
  outline.push([
    new Path([
      origin.translate(-w/2, w/2, 0),
      origin.translate(-w/2, -w/2, 0),
      origin.translate(-w/2, w/2, 0),
    ]),
    new Path([
      origin.translate(-w/2, -w/2, 0),
      origin.translate(w/2, -w/2, 0),
      origin.translate(-w/2, -w/2, 0),
    ]),
    new Path([
      origin.translate(w/2, -w/2, 0),
      origin.translate(w/2, -w/2, bh),
      origin.translate(w/2, -w/2, 0),
    ]),
    new Path([
      origin.translate(w/2, -w/2, bh),
      origin.translate(w/2 - cr, -w/2 + cr, h),
      origin.translate(w/2, -w/2, bh),
    ]),
    new Path([
      origin.translate(w/2 - cr, -w/2 + cr, h),
      origin.translate(w/2 - cr, w/2 - cr, h),
      origin.translate(w/2 - cr, -w/2 + cr, h),
    ]),
    new Path([
      origin.translate(w/2 - cr, w/2 - cr, h),
      origin.translate(-w/2 + cr, w/2 - cr, h),
      origin.translate(w/2 - cr, w/2 - cr, h),
    ]),
    new Path([
      origin.translate(-w/2 + cr, w/2 - cr, h),
      origin.translate(-w/2, w/2, bh),
      origin.translate(-w/2 + cr, w/2 - cr, h),
    ]),
    new Path([
      origin.translate(-w/2, w/2, bh),
      origin.translate(-w/2, w/2, 0),
      origin.translate(-w/2, w/2, bh),
    ]),
  ]);
  of.push(outline);

  return of
}
