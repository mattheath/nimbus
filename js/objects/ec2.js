
/**
 * Builds an EC2 Instance object
 */
EC2Instance = function (origin, size) {

  // Set z based on instance size
  var z = 0.5;
  switch (size) {
    case 'large':
      z = 2;
    break;
    case 'medium':
      z = 1;
    break;
  }

  // Make a collection object to hold everything
  var i = new Isomer.Object3D()

  // Push in a base prism
  i.push(Isomer.Shape.Prism(origin, 1, 1, z),
    new Isomer.Color(195, 195, 195, 1));

  // Add a logo on top
  i.push(new Isomer.Path([
    origin.translate(0.1, 0.1, z),
    origin.translate(0.3, 0.1, z),
    origin.translate(0.3, 0.3, z),
    origin.translate(0.1, 0.3, z)
  ]), new Isomer.Color(72, 72, 72));

  // Draw outline...
  // Must be a better way to do this
  i.push([
      new Path([
        new Point(origin.x, origin.y + 1, 0),
        new Point(origin.x, origin.y + 1, z),
        new Point(origin.x, origin.y + 1, 0)
      ]),
      new Path([
        new Point(origin.x, origin.y + 1, z),
        new Point(origin.x + 1, origin.y + 1, z),
        new Point(origin.x, origin.y + 1, z)
      ]),
      new Path([
        new Point(origin.x + 1, origin.y + 1, z),
        new Point(origin.x + 1, origin.y, z),
        new Point(origin.x + 1, origin.y + 1, z)
      ]),
      new Path([
        new Point(origin.x + 1, origin.y, 0),
        new Point(origin.x + 1, origin.y, z),
        new Point(origin.x + 1, origin.y, 0)
      ]),
      new Path([
        new Point(origin.x + 1, origin.y, 0),
        new Point(origin.x, origin.y, 0),
        new Point(origin.x + 1, origin.y, 0)
      ]),
      new Path([
        new Point(origin.x, origin.y, 0),
        new Point(origin.x, origin.y + 1, 0),
        new Point(origin.x, origin.y, 0)
      ])
  ], new Isomer.Color(33, 33, 33));

  return i
}

/**
 * Builds a rudimetary S3 object
 */
S3 = function (origin) {

  // Make a collection object to hold everything
  var s = new Isomer.Object3D()

  // Sizing
  var w = 1.5;
  var h = z = w;
  var l = w * 1.5;

  // Make our base shape
  s.push(Isomer.Shape.Prism(origin, l, w, h),
    new Isomer.Color(195, 195, 195));

  // Add a logo on top - currenly a square
  s.push(new Isomer.Path([
    origin.translate(l/2 - 0.2, w/2 - 0.2, h),
    origin.translate(l/2 + 0.2, w/2 - 0.2, h),
    origin.translate(l/2 + 0.2, w/2 + 0.2, h),
    origin.translate(l/2 - 0.2, w/2 + 0.2, h)
  ]), new Isomer.Color(72, 72, 72));

  // Outline
  s.push([
      new Path([
        new Point(origin.x, origin.y + w, 0),
        new Point(origin.x, origin.y + w, z),
        new Point(origin.x, origin.y + w, 0)
      ]),
      new Path([
        new Point(origin.x, origin.y + w, z),
        new Point(origin.x + l, origin.y + w, z),
        new Point(origin.x, origin.y + w, z)
      ]),
      new Path([
        new Point(origin.x + l, origin.y + w, z),
        new Point(origin.x + l, origin.y, z),
        new Point(origin.x + l, origin.y + w, z)
      ]),
      new Path([
        new Point(origin.x + l, origin.y, 0),
        new Point(origin.x + l, origin.y, z),
        new Point(origin.x + l, origin.y, 0)
      ]),
      new Path([
        new Point(origin.x + l, origin.y, 0),
        new Point(origin.x, origin.y, 0),
        new Point(origin.x + l, origin.y, 0)
      ]),
      new Path([
        new Point(origin.x, origin.y, 0),
        new Point(origin.x, origin.y + w, 0),
        new Point(origin.x, origin.y, 0)
      ])
  ], new Isomer.Color(33, 33, 33));

  // Inner lines
  s.push([
      new Path([
        new Point(origin.x + l/3, origin.y, z),
        new Point(origin.x + l/3, origin.y + w, z),
        new Point(origin.x + l/3, origin.y, z)
      ]),
      new Path([
        new Point(origin.x + 2 * l/3, origin.y, z),
        new Point(origin.x + 2 * l/3, origin.y + w, z),
        new Point(origin.x + 2 * l/3, origin.y, z)
      ]),
      new Path([
        new Point(origin.x + l/3, origin.y, 0),
        new Point(origin.x + l/3, origin.y, z),
        new Point(origin.x + l/3, origin.y, 0)
      ]),
      new Path([
        new Point(origin.x + 2 * l/3, origin.y, 0),
        new Point(origin.x + 2 * l/3, origin.y, z),
        new Point(origin.x + 2 * l/3, origin.y, 0)
      ]),
      new Path([
        new Point(origin.x, origin.y + w/2, 0),
        new Point(origin.x, origin.y + w/2, z),
        new Point(origin.x, origin.y + w/2, 0)
      ]),
      new Path([
        new Point(origin.x, origin.y + w/2, z),
        new Point(origin.x + l/3, origin.y + w/2, z),
        new Point(origin.x, origin.y + w/2, z)
      ]),
      new Path([
        new Point(origin.x + 2 * l / 3, origin.y + w/2, z),
        new Point(origin.x + l, origin.y + w/2, z),
        new Point(origin.x + 2 * l / 3, origin.y + w/2, z)
      ])
  ]);


  return s
}

/**
 * Basic ELB style object
 */
ELB = function (origin) {

  // Make a collection object to hold everything
  var elb = new Isomer.Object3D();

  // This gives a true octagonal prism
  var cornerRadius = (1 - (1 / (1 + Math.sqrt(2)))) / 2;

  // Adjust to match ELB shape
  cornerRadius = cornerRadius * 0.85;

  // Boundaries
  var xMin = origin.x - 1/2;
  var xMax = origin.x + 1/2;
  var yMin = origin.y - 1/2;
  var yMax = origin.y + 1/2;
  var zMin = 0;
  var zMax = 0.5;

  // Helpers
  var Path = Isomer.Path
  var Point = Isomer.Point
  var Shape = Isomer.Shape

  // Calculate path vertices & extrude
  elb.push(Shape.extrude(new Path([
    Point(xMax, yMin + cornerRadius, 0),
    Point(xMax, yMax - cornerRadius, 0),
    Point(xMax - cornerRadius, yMax, 0),
    Point(xMin + cornerRadius, yMax, 0),
    Point(xMin, yMax - cornerRadius, 0),
    Point(xMin, yMin + cornerRadius, 0),
    Point(xMin + cornerRadius, yMin, 0),
    Point(xMax - cornerRadius, yMin, 0),
  ]), zMax), new Isomer.Color(195, 195, 195));

  // Circular logo on top
  elb.push(Path.Circle(new Point(origin.x, origin.y, zMax), 0.33, 20),
    new Isomer.Color(72, 72, 72));

  // Push in outline
  elb.push([
      new Path([
        new Point(xMin, yMax - cornerRadius, zMin),
        new Point(xMin, yMax - cornerRadius, zMax),
        new Point(xMin, yMax - cornerRadius, zMin)
      ]),
      new Path([
        new Point(xMin, yMax - cornerRadius, zMax),
        new Point(xMin + cornerRadius, yMax, zMax),
        new Point(xMin, yMax - cornerRadius, zMax)
      ]),
      new Path([
        new Point(xMax - cornerRadius, yMax, zMax),
        new Point(xMin + cornerRadius, yMax, zMax),
        new Point(xMax - cornerRadius, yMax, zMax)
      ]),
      new Path([
        new Point(xMax - cornerRadius, yMax, zMax),
        new Point(xMax, yMax - cornerRadius, zMax),
        new Point(xMax - cornerRadius, yMax, zMax)
      ]),
      new Path([
        new Point(xMax, yMax - cornerRadius, zMax),
        new Point(xMax, yMin + cornerRadius, zMax),
        new Point(xMax, yMax - cornerRadius, zMax)
      ]),
      new Path([
        new Point(xMax, yMin + cornerRadius, zMax),
        new Point(xMax - cornerRadius, yMin, zMax),
        new Point(xMax, yMin + cornerRadius, zMax)
      ]),
      new Path([
        new Point(xMax - cornerRadius, yMin, zMax),
        new Point(xMax - cornerRadius, yMin, zMin),
        new Point(xMax - cornerRadius, yMin, zMax)
      ]),
      new Path([
        new Point(xMax - cornerRadius, yMin, zMin),
        new Point(xMin + cornerRadius, yMin, zMin),
        new Point(xMax - cornerRadius, yMin, zMin)
      ]),
      new Path([
        new Point(xMin + cornerRadius, yMin, zMin),
        new Point(xMin, yMin + cornerRadius, zMin),
        new Point(xMin + cornerRadius, yMin, zMin)
      ]),
      new Path([
        new Point(xMin, yMin + cornerRadius, zMin),
        new Point(xMin, yMax - cornerRadius, zMin),
        new Point(xMin, yMin + cornerRadius, zMin)
      ])
  ], new Isomer.Color(33, 33, 33));

  return elb
}

Route53 = function (origin) {

  var r53 = new Isomer.Object3D();

  var a = 2.5; // triangle side length
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

  return r53
}
