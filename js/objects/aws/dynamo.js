/**
 * Dynamo - Amazon's managed NoSQL database service
 *
 * Provides icons and objects for DynamoDB
 */

/**
 * DynamoDB returns an icon representing a DynamoDB instance
 */
DynamoDB = function (origin) {

	var ddb = new Isomer.Object3D();

	var w = 2;         // width
	var h = w*0.75;    // overall height
	var c = 0.5;       // corner radius
	var t = h - c*0.5; // height of top (centre)
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
	var face1 = new Path([
		origin.translate(-w/2 + c, -w/2, 0),
		origin.translate(w/2 - c, -w/2, 0),
		origin.translate(w/2 - c, -w/2, h),
		origin.translate(-w/2 + c, -w/2, h),
	]);
	var face2 = new Path([
		origin.translate(-w/2 + c, -w/2 + c, 0),
		origin.translate(-w/2 + c, -w/2, 0),
		origin.translate(-w/2 + c, -w/2, h),
		origin.translate(-w/2 + c, -w/2 + c, t),
	]);
	var face3 = new Path([
		origin.translate(w/2 - c, -w/2 + c, 0),
		origin.translate(w/2 - c, -w/2, 0),
		origin.translate(w/2 - c, -w/2, h),
		origin.translate(w/2 - c, -w/2 + c, t),
	]);
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
  	ddb.push(s)

	// Add a logo on top
	ddb.push(new Isomer.Path([
		origin.translate(-0.3, 0.3, t),
		origin.translate(0.3, 0.3, t),
		origin.translate(0.3, -0.3, t),
		origin.translate(-0.3, -0.3, t),
	]).reverse(), new Isomer.Color(72, 72, 72));

	// Draw outline
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
	ddb.push(outline)

	return ddb
}