/**
 * Dynamo - Amazon's managed NoSQL database service
 *
 * Provides icons and objects for DynamoDB
 */

/**
 * DynamoDB returns an icon representing a DynamoDB instance
 */
DynamoDB = function (origin) {

	// Sizing settings for the DynamoDB icon
	var w = 2;         // width
	var h = w*0.75;    // overall height
	var c = 0.5;       // corner radius
	var t = h - c*0.5; // height of top (centre)

	// Get base shape
	var ddb = new OutlinedCross(origin, w, h, c, t)

	// Add a logo on top
	ddb.push(new Isomer.Path([
		origin.translate(-0.3, 0.3, t),
		origin.translate(0.3, 0.3, t),
		origin.translate(0.3, -0.3, t),
		origin.translate(-0.3, -0.3, t),
	]).reverse(), new Isomer.Color(72, 72, 72));

	return ddb
}

/**
 * SimpleDB returns an icon representing a SimpleDB instance/domain
 */
SimpleDB = function (origin) {

	// Sizing settings for the SimpleDB icon
	var w = 2;         // width
	var h = w*0.75 ;   // overall height
	var c = 0.5;       // corner radius

	var o = h - c*0.5
	var i = h; // inner height

	// Get base shape
	var ddb = new OutlinedCross(origin, w, o, c, i)

	// Add a logo on top
	ddb.push(new Isomer.Path([
		origin.translate(-0.3, 0.3, i),
		origin.translate(0.3, 0.3, i),
		origin.translate(0.3, -0.3, i),
		origin.translate(-0.3, -0.3, i),
	]).reverse(), new Isomer.Color(72, 72, 72));

	return ddb
}
