/**
 * Create a cuboid
 */
function createCube(width, height, x, y, z, opacity) {

     return createOblong(width, width, height, x, y, z, opacity);

}

/**
 * Create an oblong
 */
function createOblong(width, length, height, x, y, z, opacity) {

     // Defaults
     //var width = 50;
     //var height = 28.5;
     //var x = 75;
     //var z = 75;

     // Adjust registration point to be at the bottom of the cube
     // So that cubes sit on the plane
     y = y + height / 2;

     // Default opacity to non-transparent
     opacity = opacity || 1;

     // Amount to separate objects by to ensure no clipping
     var clipBufferAmount = 0.3;

     // Container object
     var cube = new THREE.Object3D(); //create an empty container

     // Cube

     var geometry = new THREE.CubeGeometry( width, height, length );
     var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xE6E6E6, wireframe: false, opacity: opacity, transparent: true } );
     var cubeMesh = new THREE.Mesh( geometry, cubeMaterial );
     cubeMesh.position.x = x;
     cubeMesh.position.y = y;
     cubeMesh.position.z = z;
     cube.add( cubeMesh );

     // Outline

     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(x + width/2, y - height/2, z - length/2)); // Bottom right corner
     geometry.vertices.push(new THREE.Vector3(x + width/2, y + height/2, z - length/2)); // Top right corner
     geometry.vertices.push(new THREE.Vector3(x - width/2, y + height/2, z - length/2)); // Top back corner
     geometry.vertices.push(new THREE.Vector3(x - width/2, y + height/2, z + length/2)); // Top left corner
     geometry.vertices.push(new THREE.Vector3(x - width/2, y - height/2, z + length/2)); // Bottom left corner
     geometry.vertices.push(new THREE.Vector3(x + width/2, y - height/2, z + length/2)); // Bottom front corner
     geometry.vertices.push(new THREE.Vector3(x + width/2, y - height/2, z - length/2)); // Bottom right corner

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 6 });
     var line = new THREE.Line(geometry, lineMaterial);
     cube.add(line);

     // Inner lines

     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y - height/2 + clipBufferAmount, z + length/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z + length/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z + length/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z + length/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z - length/2 + clipBufferAmount));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
     var line = new THREE.Line(geometry, lineMaterial);
     cube.add(line);

     // Back inner lines (occluded unless transparent)

     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y + height/2 + clipBufferAmount, z - length/2 - clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y - height/2 - clipBufferAmount, z - length/2 - clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y - height/2 - clipBufferAmount, z + length/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y - height/2 - clipBufferAmount, z - length/2 - clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y - height/2 - clipBufferAmount, z - length/2 - clipBufferAmount));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
     var line = new THREE.Line(geometry, lineMaterial);
     cube.add(line);

     return cube;

 }


function createOctagon(scene, width, height, x, y, z, opacity) {

     // Container object
     var octagon = new THREE.Object3D(); //create an empty container

     // Adjust registration point to bottom of object
     y = y + height / 2;

     // Default opacity to non-transparent
     opacity = opacity || 1;

     // Amount to separate objects by to ensure no clipping
     var clipBufferAmount = 0.5;

     // Calculate distance from edge of a cube the octagonal side starts

     // This gives a true octagonal prism
     var cornerRadius = (width - (width / (1 + Math.sqrt(2)))) / 2;

     // Adjust to match ELB shape
     cornerRadius = cornerRadius * 0.85;

     // Boundaries
     var xMin = x - width / 2;
     var xMax = x + width / 2;
     var zMin = z - width / 2;
     var zMax = z + width / 2;
     var yMin = y;
     var yMax = y + height;

     // Calculate vertices

     var vertices = [];

     vertices.push( new THREE.Vector3(xMax - cornerRadius, yMin, zMin) );
     vertices.push( new THREE.Vector3(xMin + cornerRadius, yMin, zMin) );
     vertices.push( new THREE.Vector3(xMin, yMin, zMin + cornerRadius) );
     vertices.push( new THREE.Vector3(xMin, yMin, zMax - cornerRadius) );
     vertices.push( new THREE.Vector3(xMin + cornerRadius, yMin, zMax) );
     vertices.push( new THREE.Vector3(xMax - cornerRadius, yMin, zMax) );
     vertices.push( new THREE.Vector3(xMax, yMin, zMax - cornerRadius) );
     vertices.push( new THREE.Vector3(xMax, yMin, zMin + cornerRadius) );

     vertices.push( new THREE.Vector3(xMax - cornerRadius, yMax, zMin) );
     vertices.push( new THREE.Vector3(xMin + cornerRadius, yMax, zMin) );
     vertices.push( new THREE.Vector3(xMin, yMax, zMin + cornerRadius) );
     vertices.push( new THREE.Vector3(xMin, yMax, zMax - cornerRadius) );
     vertices.push( new THREE.Vector3(xMin + cornerRadius, yMax, zMax) );
     vertices.push( new THREE.Vector3(xMax - cornerRadius, yMax, zMax) );
     vertices.push( new THREE.Vector3(xMax, yMax, zMax - cornerRadius) );
     vertices.push( new THREE.Vector3(xMax, yMax, zMin + cornerRadius) );

     // Start building our Geometry
     var geometry = new THREE.Geometry();

     // Push in all the vertices
     geometry.vertices.push(vertices[0]);
     geometry.vertices.push(vertices[1]);
     geometry.vertices.push(vertices[2]);
     geometry.vertices.push(vertices[3]);
     geometry.vertices.push(vertices[4]);
     geometry.vertices.push(vertices[5]);
     geometry.vertices.push(vertices[6]);
     geometry.vertices.push(vertices[7]);

     geometry.vertices.push(vertices[8]);
     geometry.vertices.push(vertices[9]);
     geometry.vertices.push(vertices[10]);
     geometry.vertices.push(vertices[11]);
     geometry.vertices.push(vertices[12]);
     geometry.vertices.push(vertices[13]);
     geometry.vertices.push(vertices[14]);
     geometry.vertices.push(vertices[15]);

     // Add faces, top and bottom need 3 polygons as we can only create faces
     // with 4 vertices

     // Bottom face
     geometry.faces.push(new THREE.Face4(0, 1, 2, 3));
     geometry.faces.push(new THREE.Face4(0, 3, 4, 7));
     geometry.faces.push(new THREE.Face4(4, 5, 6, 7));

     // Top face
     geometry.faces.push(new THREE.Face4(8, 9, 10, 11));
     geometry.faces.push(new THREE.Face4(8, 11, 12, 15));
     geometry.faces.push(new THREE.Face4(12, 13, 14, 15));

     // And each side
     geometry.faces.push(new THREE.Face4(0, 1, 9, 8));
     geometry.faces.push(new THREE.Face4(1, 2, 10, 9));
     geometry.faces.push(new THREE.Face4(2, 3, 11, 10));
     geometry.faces.push(new THREE.Face4(3, 4, 12, 11));
     geometry.faces.push(new THREE.Face4(4, 5, 13, 12));
     geometry.faces.push(new THREE.Face4(5, 6, 14, 13));
     geometry.faces.push(new THREE.Face4(6, 7, 15, 14));
     geometry.faces.push(new THREE.Face4(7, 0, 8, 15));

     // FUCK YOU FACE NORMALS
     // http://stackoverflow.com/questions/16138088/three-js-raycaster-not-intersecting-custom-mesh/
     geometry.computeFaceNormals();

     var octagonMaterial = new THREE.MeshBasicMaterial( { color: 0xE6E6E6, side: THREE.DoubleSide, opacity: opacity, transparent: true } );
     var mesh = new THREE.Mesh(geometry, octagonMaterial);
     octagon.add( mesh );


     // Calculate expanded vertex location to avoid outline clipping
     // This is an extremely naive implementation which just increases along
     // the X Y and Z axis, this should actually increase along a diagonal
     // from the object's centre point

     var clipPos = []

     _.each(vertices, function(vertex) {

          if (vertex.x > x) {
               var newX = vertex.x + clipBufferAmount;
          } else {
               var newX = vertex.x - clipBufferAmount;
          }

          if (vertex.y > y) {
               var newY = vertex.y + clipBufferAmount;
          } else {
               var newY = vertex.y - clipBufferAmount;
          }

          if (vertex.z > z) {
               var newZ = vertex.z + clipBufferAmount;
          } else {
               var newZ = vertex.z - clipBufferAmount;
          }

          clipPos.push( new THREE.Vector3(newX, newY, newZ) );

     });

     // Outline

     var outlineGeometry = new THREE.Geometry();
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[4].x, clipPos[4].y, clipPos[4].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[5].x, clipPos[5].y, clipPos[5].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[6].x, clipPos[6].y, clipPos[6].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[7].x, clipPos[7].y, clipPos[7].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[15].x, clipPos[15].y, clipPos[15].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[8].x, clipPos[8].y, clipPos[8].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[9].x, clipPos[9].y, clipPos[9].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[10].x, clipPos[10].y, clipPos[10].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[11].x, clipPos[11].y, clipPos[11].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[12].x, clipPos[12].y, clipPos[12].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[4].x, clipPos[4].y, clipPos[4].z));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 6 });
     var outline = new THREE.Line(outlineGeometry, lineMaterial);
     octagon.add(outline);


     // Inner lines

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });

     // Front lines

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[5].x, clipPos[5].y, clipPos[5].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[13].x, clipPos[13].y, clipPos[13].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[6].x, clipPos[6].y, clipPos[6].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[14].x, clipPos[14].y, clipPos[14].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[15].x, clipPos[15].y, clipPos[15].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[14].x, clipPos[14].y, clipPos[14].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[13].x, clipPos[13].y, clipPos[13].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[12].x, clipPos[12].y, clipPos[12].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     // Back lines - hidden unless transparent

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[3].x, clipPos[3].y, clipPos[3].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[11].x, clipPos[11].y, clipPos[11].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[2].x, clipPos[2].y, clipPos[2].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[10].x, clipPos[10].y, clipPos[10].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[1].x, clipPos[1].y, clipPos[1].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[9].x, clipPos[9].y, clipPos[9].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[0].x, clipPos[0].y, clipPos[0].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[8].x, clipPos[8].y, clipPos[8].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[7].x, clipPos[7].y, clipPos[7].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[0].x, clipPos[0].y, clipPos[0].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[1].x, clipPos[1].y, clipPos[1].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[2].x, clipPos[2].y, clipPos[2].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[3].x, clipPos[3].y, clipPos[3].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[4].x, clipPos[4].y, clipPos[4].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     // How about an ELB logo

     // Calculate size & position of the circle, relative to the cube size
     var radius = (width * 0.7) / 2;
     var circleMaterial = new THREE.MeshBasicMaterial( { color: 0x707071, side: THREE.DoubleSide, opacity: opacity, transparent: true } );
     var circleMesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0, 50, 50), circleMaterial);
     circleMesh.position.set(x, yMax + clipBufferAmount, z);
     octagon.add( circleMesh );


     // We're done!

     return octagon;

}



function createCubeWithCutoffCorners(scene, width, height, x, y, z, opacity) {

     // Container object
     var base = new THREE.Object3D(); //create an empty container

     // Adjust registration point to bottom of object
     y = y + height / 2;

     // Default opacity to non-transparent
     opacity = opacity || 1;

     // Amount to separate objects by to ensure no clipping
     var clipBufferAmount = 0.5;

     // Calculate distance from edge of a cube the octagonal side starts

     // This gives a true octagonal prism
     var cornerRadius = width * 0.2;

     // Boundaries
     var xMin = x - width / 2;
     var xMax = x + width / 2;
     var zMin = z - width / 2;
     var zMax = z + width / 2;
     var yMin = y;
     var yMax = y + height;

     // Calculate vertices

     var vertices = [];

     // Bottom
     vertices.push( new THREE.Vector3(xMin, yMin, zMin) );
     vertices.push( new THREE.Vector3(xMax, yMin, zMin) );
     vertices.push( new THREE.Vector3(xMax, yMin, zMax) );
     vertices.push( new THREE.Vector3(xMin, yMin, zMax) );

     // Lower points on sides
     vertices.push( new THREE.Vector3(xMin, yMax - cornerRadius, zMin) );
     vertices.push( new THREE.Vector3(xMax, yMax - cornerRadius, zMin) );
     vertices.push( new THREE.Vector3(xMax, yMax - cornerRadius, zMax) );
     vertices.push( new THREE.Vector3(xMin, yMax - cornerRadius, zMax) );

     // Corner points
     vertices.push( new THREE.Vector3(xMin + cornerRadius, yMax, zMin) );
     vertices.push( new THREE.Vector3(xMax - cornerRadius, yMax, zMin) );
     vertices.push( new THREE.Vector3(xMax, yMax, zMin + cornerRadius) );
     vertices.push( new THREE.Vector3(xMax, yMax, zMax - cornerRadius) );
     vertices.push( new THREE.Vector3(xMax - cornerRadius, yMax, zMax) );
     vertices.push( new THREE.Vector3(xMin + cornerRadius, yMax, zMax) );
     vertices.push( new THREE.Vector3(xMin, yMax, zMax - cornerRadius) );
     vertices.push( new THREE.Vector3(xMin, yMax, zMin + cornerRadius) );


     // Start building our Geometry
     var geometry = new THREE.Geometry();

     // Push in all the vertices
     _.each(vertices, function(vertex){
          geometry.vertices.push(vertex);
     });

     // Add faces, top and bottom need 3 polygons
     // Sides need 2 polygons, and

     // Bottom face
     geometry.faces.push(new THREE.Face4(0, 1, 2, 3));

     // Sides
     geometry.faces.push(new THREE.Face4(0, 4, 8, 1));
     geometry.faces.push(new THREE.Face4(8, 9, 5, 1));
     geometry.faces.push(new THREE.Face4(1, 5, 10, 2));
     geometry.faces.push(new THREE.Face4(2, 6, 11, 10));
     geometry.faces.push(new THREE.Face4(2, 6, 12, 3));
     geometry.faces.push(new THREE.Face4(3, 7, 13, 12));
     geometry.faces.push(new THREE.Face4(3, 7, 14, 0));
     geometry.faces.push(new THREE.Face4(14, 15, 4, 0));

     // Corners
     geometry.faces.push(new THREE.Face3(5, 9, 10));
     geometry.faces.push(new THREE.Face3(6, 11, 12));
     geometry.faces.push(new THREE.Face3(7, 13, 14));
     geometry.faces.push(new THREE.Face3(4, 8, 15));

     //Top
     geometry.faces.push(new THREE.Face4(9, 10, 11, 12));
     geometry.faces.push(new THREE.Face4(9, 12, 13, 8));
     geometry.faces.push(new THREE.Face4(13, 14, 15, 8));


     // FUCK YOU FACE NORMALS
     // http://stackoverflow.com/questions/16138088/three-js-raycaster-not-intersecting-custom-mesh/
     geometry.computeFaceNormals();

     var baseMaterial = new THREE.MeshBasicMaterial( { color: 0xE6E6E6, side: THREE.DoubleSide, opacity: opacity, transparent: true } );
     var mesh = new THREE.Mesh(geometry, baseMaterial);
     base.add( mesh );


     // Calculate expanded vertex location to avoid outline clipping
     // This is an extremely naive implementation which just increases along
     // the X Y and Z axis, this should actually increase along a diagonal
     // from the object's centre point

     var clipPos = []

     _.each(vertices, function(vertex) {

          if (vertex.x > x) {
               var newX = vertex.x + clipBufferAmount;
          } else {
               var newX = vertex.x - clipBufferAmount;
          }

          if (vertex.y > y) {
               var newY = vertex.y + clipBufferAmount;
          } else {
               var newY = vertex.y - clipBufferAmount;
          }

          if (vertex.z > z) {
               var newZ = vertex.z + clipBufferAmount;
          } else {
               var newZ = vertex.z - clipBufferAmount;
          }

          clipPos.push( new THREE.Vector3(newX, newY, newZ) );

     });

     // Outline

     var outlineGeometry = new THREE.Geometry();
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[1].x, clipPos[1].y, clipPos[1].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[2].x, clipPos[2].y, clipPos[2].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[3].x, clipPos[3].y, clipPos[3].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[7].x, clipPos[7].y, clipPos[7].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[14].x, clipPos[14].y, clipPos[14].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[15].x, clipPos[15].y, clipPos[15].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[8].x, clipPos[8].y, clipPos[8].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[9].x, clipPos[9].y, clipPos[9].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[5].x, clipPos[5].y, clipPos[5].z));
     outlineGeometry.vertices.push(new THREE.Vector3(clipPos[1].x, clipPos[1].y, clipPos[1].z));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 6 });
     var outline = new THREE.Line(outlineGeometry, lineMaterial);
     base.add(outline);


     // Inner lines

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });

     // Front lines

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[5].x, clipPos[5].y, clipPos[5].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[10].x, clipPos[10].y, clipPos[10].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[11].x, clipPos[11].y, clipPos[11].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[6].x, clipPos[6].y, clipPos[6].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[2].x, clipPos[2].y, clipPos[2].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     base.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[6].x, clipPos[6].y, clipPos[6].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[12].x, clipPos[12].y, clipPos[12].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[13].x, clipPos[13].y, clipPos[13].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[7].x, clipPos[7].y, clipPos[7].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     base.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[9].x, clipPos[9].y, clipPos[9].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[10].x, clipPos[10].y, clipPos[10].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[11].x, clipPos[11].y, clipPos[11].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[12].x, clipPos[12].y, clipPos[12].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[13].x, clipPos[13].y, clipPos[13].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[14].x, clipPos[14].y, clipPos[14].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     base.add(line);

     // Back lines

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(clipPos[3].x, clipPos[3].y, clipPos[3].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[0].x, clipPos[0].y, clipPos[0].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[1].x, clipPos[1].y, clipPos[1].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[0].x, clipPos[0].y, clipPos[0].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[4].x, clipPos[4].y, clipPos[4].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[8].x, clipPos[8].y, clipPos[8].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[15].x, clipPos[15].y, clipPos[15].z));
     innerLine.vertices.push(new THREE.Vector3(clipPos[4].x, clipPos[4].y, clipPos[4].z));
     var line = new THREE.Line(innerLine, lineMaterial);
     base.add(line);

     // We're done!

     return base;


}

