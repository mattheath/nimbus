
/**
 * Builds an EC2 Instance object
 */
EC2Instance = function (origin, size) {

  // Set height based on instance size
  var height = 0.5;
  switch (size) {
    case 'large':
      height = 2;
    break;
    case 'medium':
      height = 1;
    break;
  }

  // Make a collection object to hold everything
  var i = new Isomer.Object3D()

  // Push in a base prism
  var base = Isomer.Shape.Prism(origin, 1, 1, height)
  base.setColor(new Isomer.Color(195, 195, 195))
  i.push(base);

  // Add a logo on top
  var l = new Isomer.Path([
    origin.translate(0.1, 0.1, height),
    origin.translate(0.3, 0.1, height),
    origin.translate(0.3, 0.3, height),
    origin.translate(0.1, 0.3, height)
  ])
  l.setColor(new Isomer.Color(72, 72, 72))
  i.push(l)

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
  var h = w;
  var l = w * 1.5;

  // Make our base shape
  var base = Isomer.Shape.Prism(origin, l, w, h)
  base.setColor(new Isomer.Color(195, 195, 195))
  s.push(base);

  // Add a logo on top - currenly a square
  var l = new Isomer.Path([
    origin.translate(l/2 - 0.2, w/2 - 0.2, h),
    origin.translate(l/2 + 0.2, w/2 - 0.2, h),
    origin.translate(l/2 + 0.2, w/2 + 0.2, h),
    origin.translate(l/2 - 0.2, w/2 + 0.2, h)
  ])
  l.setColor(new Isomer.Color(72, 72, 72))
  s.push(l)

  return s
}