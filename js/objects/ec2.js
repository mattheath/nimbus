
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
  base.setColor(new Isomer.Color(160, 160, 160))
  i.push(base);

  // Add a logo on top
  var l = new Isomer.Path([
    origin.translate(0.1, 0.1, height),
    origin.translate(0.3, 0.1, height),
    origin.translate(0.3, 0.3, height),
    origin.translate(0.1, 0.3, height)
  ])
  l.setColor(new Isomer.Color(100, 100, 100))
  i.push(l)

  return i
}
