/**
 * SQS - Simple Queue Service
 *
 * SQS returns an SQS instance at a given position
 */
SQS = function (origin) {

  var sqs = new Isomer.Object3D()

  var w = 1.6
  var h = w * 1.1875
  var cr = w * 0.16875
  var bh = w * 0.3375

  // Outlined frustum with raised base
  sqs.push(new OutlinedFrustum(origin, w, h, cr, bh));

  // SQS has internal lines
  var internalLines = new Isomer.Object3D()
  internalLines.push([
    new Path([
      origin.translate(-w/2, 0, 0),
      origin.translate(-w/2, 0, bh),
      origin.translate(-w/2, 0, 0),
    ]),
    new Path([
      origin.translate(-w/2, 0, bh),
      origin.translate(-w/2 + cr, 0, h),
      origin.translate(-w/2, 0, bh),
    ]),
    new Path([
      origin.translate(-w/2 + cr, 0, h),
      origin.translate(w/2 - cr, 0, h),
      origin.translate(-w/2 + cr, 0, h),
    ]),
    new Path([
      origin.translate(0, -w/2, 0),
      origin.translate(0, -w/2, bh),
      origin.translate(0, -w/2, 0),
    ]),
    new Path([
      origin.translate(0, -w/2, bh),
      origin.translate(0, -w/2 + cr, h),
      origin.translate(0, -w/2, bh),
    ]),
    new Path([
      origin.translate(0, -w/2 + cr, h),
      origin.translate(0, w/2 - cr, h),
      origin.translate(0, -w/2 + cr, h),
    ]),
    new Path([
      origin.translate(-w/2, w/2, bh),
      origin.translate(-w/2, -w/2, bh),
      origin.translate(-w/2, w/2, bh),
    ]),
    new Path([
      origin.translate(-w/2, -w/2, bh),
      origin.translate(w/2, -w/2, bh),
      origin.translate(-w/2, -w/2, bh),
    ]),
  ]);
  sqs.push(internalLines);

  // Add a logo on top - currenly a rectangle
  sqs.push(new Isomer.Path([
    origin.translate(-0.2, -0.3, h),
    origin.translate(0.2, -0.3, h),
    origin.translate(0.2, 0.3, h),
    origin.translate(-0.2, 0.3, h)
  ]), new Isomer.Color(72, 72, 72));

  return sqs
}

