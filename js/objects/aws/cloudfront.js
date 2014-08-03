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
	var faces = [];

	// Define final size
	var y = 1.05;
	var x = 0.57; //y/2;
	var z = 1.5; // y * 1.3636363636;

	// Defines how large our edging is
	var edgeSize = 0.1 //y*0.9090909091;

	// Main prism is scaled down by the size of the edging
	var dx = x - edgeSize;
	var dy = y - edgeSize;
	var dz = z - edgeSize;

	// Push in bottom & top faces
	faces.push(new Isomer.Path([
		origin.translate(-dx/2 - edgeSize, -dy/2, 0),
		origin.translate(-dx/2, -dy/2 - edgeSize, 0),
		origin.translate(dx/2, -dy/2 - edgeSize, 0),
		origin.translate(dx/2 + edgeSize, -dy/2, 0),
		origin.translate(dx/2 + edgeSize, dy/2, 0),
		origin.translate(dx/2, dy/2 + edgeSize, 0),
		origin.translate(-dx/2, dy/2 + edgeSize, 0),
		origin.translate(-dx/2 - edgeSize, dy/2, 0),
	]));
	faces.push(new Isomer.Path([
		origin.translate(-dx/2, -dy/2, z),
		origin.translate(dx/2, -dy/2, z),
		origin.translate(dx/2, dy/2, z),
		origin.translate(-dx/2, dy/2, z),
	]));

	// Make edging around bottom
	var longedge = new Isomer.Path([
		origin.translate(-dx/2 - edgeSize, dy/2, 0),
		origin.translate(-dx/2 - edgeSize, -dy/2, 0),
		origin.translate(-dx/2, -dy/2, edgeSize),
		origin.translate(-dx/2, dy/2, edgeSize),
	]);
	var shortedge = new Isomer.Path([
		origin.translate(-dx/2, -dy/2 - edgeSize, 0),
		origin.translate(dx/2, -dy/2 - edgeSize, 0),
		origin.translate(dx/2, -dy/2, edgeSize),
		origin.translate(-dx/2, -dy/2, edgeSize),
	]);
	var triface = new Isomer.Path([
		origin.translate(-dx/2 - edgeSize, -dy/2, 0),
		origin.translate(-dx/2, -dy/2 - edgeSize, 0),
		origin.translate(-dx/2, -dy/2, edgeSize),
	]);

	// Main prism faces
	var frontface = new Isomer.Path([
		origin.translate(-dx/2, dy/2, edgeSize),
		origin.translate(-dx/2, -dy/2, edgeSize),
		origin.translate(-dx/2, -dy/2, z),
		origin.translate(-dx/2, dy/2, z),
	]);
	var sideface = new Isomer.Path([
		origin.translate(-dx/2, -dy/2, edgeSize),
		origin.translate(dx/2, -dy/2, edgeSize),
		origin.translate(dx/2, -dy/2, z),
		origin.translate(-dx/2, -dy/2, z),
	]);

	// Push main faces
	faces.push(frontface);
	faces.push(frontface.translate(dx, 0, 0).reverse());
	faces.push(sideface);
	faces.push(sideface.translate(0, dy, 0).reverse());

	// Push bottom edging into shape
	faces.push(longedge.rotateZ(origin, Math.PI))
	faces.push(shortedge.rotateZ(origin, Math.PI))
	faces.push(longedge);
	faces.push(shortedge);
	faces.push(triface);
	faces.push(triface.rotateZ(origin.translate(-dx/2, -dy/2, 0), -Math.PI/2).translate(0, dy, 0))
	faces.push(triface.rotateZ(origin.translate(-dx/2, -dy/2, 0), Math.PI/2).translate(dx, 0, 0))
	faces.push(triface.rotateZ(origin.translate(-dx/2, -dy/2, 0), Math.PI).translate(dx, dy, 0))

	// Build final shape
	var s = new Isomer.Shape(faces);
	s.setColor(new Isomer.Color(195, 195, 195));
	cf.push(s)

	// Add a logo to the front face
	var logocentre = origin.translate(-dx/2, 0,edgeSize + dz/2)
	cf.push(new Isomer.Path.Circle(
		new Isomer.Point(
			logocentre.x,
			logocentre.y,
			logocentre.z
		),
		0.33,
		20
	).rotateY(logocentre, Math.PI/2));

	// Add outline
	var outline = new Isomer.Object3D()
	outline.push([
		new Path([
			origin.translate(-dx/2, dy/2, edgeSize),
			origin.translate(-dx/2, dy/2 + edgeSize, 0),
			origin.translate(-dx/2, dy/2, edgeSize),
		]),
		new Path([
			origin.translate(-dx/2, dy/2 + edgeSize, 0),
			origin.translate(-dx/2 - edgeSize, dy/2, 0),
			origin.translate(-dx/2, dy/2 + edgeSize, 0),
		]),
		new Path([
			origin.translate(-dx/2 - edgeSize, dy/2, 0),
			origin.translate(-dx/2 - edgeSize, -dy/2, 0),
			origin.translate(-dx/2 - edgeSize, dy/2, 0),
		]),
		new Path([
			origin.translate(-dx/2 - edgeSize, -dy/2, 0),
			origin.translate(-dx/2, -dy/2 - edgeSize, 0),
			origin.translate(-dx/2 - edgeSize, -dy/2, 0),
		]),
		new Path([
			origin.translate(-dx/2, -dy/2 - edgeSize, 0),
			origin.translate(dx/2, -dy/2 - edgeSize, 0),
			origin.translate(-dx/2, -dy/2 - edgeSize, 0),
		]),
		new Path([
			origin.translate(dx/2, -dy/2 - edgeSize, 0),
			origin.translate(dx/2 + edgeSize, -dy/2, 0),
			origin.translate(dx/2, -dy/2 - edgeSize, 0),
		]),
		new Path([
			origin.translate(dx/2, -dy/2 - edgeSize, 0),
			origin.translate(dx/2 + edgeSize, -dy/2, 0),
			origin.translate(dx/2, -dy/2 - edgeSize, 0),
		]),
		new Path([
			origin.translate(dx/2 + edgeSize, -dy/2, 0),
			origin.translate(dx/2, -dy/2, edgeSize),
			origin.translate(dx/2 + edgeSize, -dy/2, 0),
		]),
		new Path([
			origin.translate(dx/2, -dy/2, edgeSize),
			origin.translate(dx/2, -dy/2, z),
			origin.translate(dx/2, -dy/2, edgeSize),
		]),
		new Path([
			origin.translate(dx/2, -dy/2, z),
			origin.translate(dx/2, dy/2, z),
			origin.translate(dx/2, -dy/2, z),
		]),
		new Path([
			origin.translate(dx/2, dy/2, z),
			origin.translate(-dx/2, dy/2, z),
			origin.translate(dx/2, dy/2, z),
		]),
		new Path([
			origin.translate(-dx/2, dy/2, z),
			origin.translate(-dx/2, dy/2, edgeSize),
			origin.translate(-dx/2, dy/2, z),
		]),
	])

	cf.push(outline)


	return cf
}