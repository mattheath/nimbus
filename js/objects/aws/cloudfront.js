/**
 * Cloudfront - Amazon's CDN Service
 *
 * Provides icons and objects for Cloudfront
 */

/**
 * Cloudfront returns an icon representing a Cloudfront edge location
 */
Cloudfront = function (origin) {

	var cf = new Isomer.Object3D();

	// Define final size
	var y = 1;
	var x = y/2;
	var z = y * 1.5;

	// Defines how large our edging is
	var edgeSize = y*0.1;

	// Create base prism, with origin in centre
	var dx = x - edgeSize;
	var dy = y - edgeSize;
	var dz = z;
	var base = Isomer.Shape.Prism(origin, dx, dy, dz).translate(-dx/2, -dy/2, 0);

	// Make edging around bottom
	var face1 = new Isomer.Path([
		new Isomer.Point(origin.x - dx/2, origin.y + dy/2, origin.z + edgeSize),
		new Isomer.Point(origin.x - dx/2, origin.y - dy/2, origin.z + edgeSize),
		new Isomer.Point(origin.x - dx/2 - edgeSize, origin.y - dy/2, origin.z),
		new Isomer.Point(origin.x - dx/2 - edgeSize, origin.y + dy/2, origin.z),
	])
	var face2 = new Isomer.Path([
		new Isomer.Point(origin.x - dx/2, origin.y - dy/2 - edgeSize, origin.z),
		new Isomer.Point(origin.x + dx/2, origin.y - dy/2 - edgeSize, origin.z),
		new Isomer.Point(origin.x + dx/2, origin.y - dy/2, origin.z + edgeSize),
		new Isomer.Point(origin.x - dx/2, origin.y - dy/2, origin.z + edgeSize),
	])
	var triface = new Isomer.Path([
		new Isomer.Point(origin.x - dx/2, origin.y - dy/2, origin.z + edgeSize),
		new Isomer.Point(origin.x - dx/2, origin.y - dy/2 - edgeSize, origin.z),
		new Isomer.Point(origin.x - dx/2 - edgeSize, origin.y - dy/2, origin.z),
	])


	// Push in order to prevent clipping
  	cf.push(face1.rotateZ(origin, Math.PI).reverse(), new Isomer.Color(195, 195, 195))
  	cf.push(face2.rotateZ(origin, Math.PI), new Isomer.Color(195, 195, 195))
	cf.push(base, new Isomer.Color(195, 195, 195));
	cf.push(face1, new Isomer.Color(195, 195, 195));
	cf.push(face2, new Isomer.Color(195, 195, 195));

	// Triangular faces
	cf.push(triface, new Isomer.Color(195, 195, 195));
	cf.push(triface.rotateZ(new Isomer.Point(origin.x - dx/2, origin.y - dy/2, 0), -Math.PI/2).translate(0, dy, 0),
		new Isomer.Color(195, 195, 195))
	cf.push(triface.rotateZ(new Isomer.Point(origin.x - dx/2, origin.y - dy/2, 0), Math.PI/2).translate(dx, 0, 0).reverse(),
		new Isomer.Color(195, 195, 195))

	// Add a logo on top
	cf.push(new Isomer.Path([
		origin.translate(-dx/2, 0.2, z/2 - 0.3 + edgeSize),
		origin.translate(-dx/2, 0.2, z/2 + 0.3 + edgeSize),
		origin.translate(-dx/2, -0.2, z/2 + 0.3 + edgeSize),
		origin.translate(-dx/2, -0.2, z/2 - 0.3 + edgeSize),
	]), new Isomer.Color(72, 72, 72));

	return cf
}