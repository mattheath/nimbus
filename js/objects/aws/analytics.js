/**
 * OpaqueElasticMapReduce - Managed Hadoop Framework
 *
 * OpaqueElasticMapReduce returns an ElasticMapReduce instance at a given position
 * without exposing internal instances
 *
 * Origin is located on the base place, in the centre of the object
 */
OpaqueElasticMapReduce = function (origin) {

  var emr = new Isomer.Object3D()

  var w = 2.5;
  var h = w;
  var c = w * 0.2;
  var bc = 0;

  // Outlined cuboctahedron with flat base
  emr.push(new OutlinedCuboctahedron(origin, w, h, c, bc))

  // Add a logo on top - currenly a square
  var logowidth = w * 0.45;

  emr.push(new Isomer.Path([
    origin.translate(-logowidth/2, -logowidth/2, h),
    origin.translate(logowidth/2, -logowidth/2, h),
    origin.translate(logowidth/2, logowidth/2, h),
    origin.translate(-logowidth/2, logowidth/2, h)
  ]), new Isomer.Color(72, 72, 72));

  return emr
}

/**
 * ElasticMapReduce - Managed Hadoop Framework
 *
 * This object displays a configurable number of instances
 * which may correspond to master, core or worker nodes
 *
 * Note, as the number of instances may increase or decrease
 * the origin is set at the centre point of the EMR object,
 * and instances will scale out along the +x and -y axis:

-----------------------
|                     |
|                     |
|                     |
|-------------|       |
|             |       |
|             |       |
|      x      |       |
|             |       |
|             |       |
-----------------------

 */
ElasticMapReduce = function (origin) {}