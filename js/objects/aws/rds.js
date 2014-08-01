/**
 * RDS - Relational Database Service
 *
 * Provides icons and objects for RDS
 */

/**
 * RDS returns an RDS instance at a given position
 */
RDS = function (origin) {

  var rds = new Isomer.Object3D()

  // Outlined cuboctahedron with flat base
  rds.push(new OutlinedCuboctahedron(origin, 0.25, 0))

  // Add a logo on top - currenly a square
  rds.push(new Isomer.Path([
    origin.translate(-0.2, -0.2, 1),
    origin.translate(0.2, -0.2, 1),
    origin.translate(0.2, 0.2, 1),
    origin.translate(-0.2, 0.2, 1)
  ]), new Isomer.Color(72, 72, 72));

  return rds
}
