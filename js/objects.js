

function createCube(width, height, x, y, z, opacity) {

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

     // Container object
     var cube = new THREE.Object3D(); //create an empty container

     // Cube

     var geometry = new THREE.CubeGeometry( width, height, width );
     var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xE6E6E6, wireframe: false, opacity: opacity, transparent: true } );
     var cubeMesh = new THREE.Mesh( geometry, cubeMaterial );
     cubeMesh.position.x = x;
     cubeMesh.position.y = y;
     cubeMesh.position.z = z;
     cube.add( cubeMesh );

     // Outline

     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(x + width/2, y - height/2, z - width/2)); // Bottom right corner
     geometry.vertices.push(new THREE.Vector3(x + width/2, y + height/2, z - width/2)); // Top right corner
     geometry.vertices.push(new THREE.Vector3(x - width/2, y + height/2, z - width/2)); // Top back corner
     geometry.vertices.push(new THREE.Vector3(x - width/2, y + height/2, z + width/2)); // Top left corner
     geometry.vertices.push(new THREE.Vector3(x - width/2, y - height/2, z + width/2)); // Bottom left corner
     geometry.vertices.push(new THREE.Vector3(x + width/2, y - height/2, z + width/2)); // Bottom front corner
     geometry.vertices.push(new THREE.Vector3(x + width/2, y - height/2, z - width/2)); // Bottom right corner

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 6 });
     var line = new THREE.Line(geometry, lineMaterial);
     cube.add(line);

     // Inner lines

     var geometry = new THREE.Geometry();
     var clipBufferAmount = 0.1;
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y - height/2 + clipBufferAmount, z + width/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z + width/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z + width/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z + width/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y + height/2 + clipBufferAmount, z - width/2 + clipBufferAmount));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
     var line = new THREE.Line(geometry, lineMaterial);
     cube.add(line);

     // Back inner lines (occluded unless transparent)

     var geometry = new THREE.Geometry();
     var clipBufferAmount = 0.1;
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y + height/2 + clipBufferAmount, z - width/2 - clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y - height/2 - clipBufferAmount, z - width/2 - clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y - height/2 - clipBufferAmount, z + width/2 + clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x - width/2 - clipBufferAmount, y - height/2 - clipBufferAmount, z - width/2 - clipBufferAmount));
     geometry.vertices.push(new THREE.Vector3(x + width/2 + clipBufferAmount, y - height/2 - clipBufferAmount, z - width/2 - clipBufferAmount));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
     var line = new THREE.Line(geometry, lineMaterial);
     cube.add(line);

     // Add square logo to top of the cube

     // Calculate size & position of the square, relative to the cube size
     var squareSize = width * 0.1333333333;
     var squareBorderSpacing = squareSize * 0.6;
     var squarePosX = x + width / 2 - squareSize - squareBorderSpacing;
     var squarePosY = y + clipBufferAmount*2 + height / 2;
     var squarePosZ = z + width / 2 - squareSize - squareBorderSpacing;

     var squareGeometry = new THREE.Geometry();
     squareGeometry.vertices.push(new THREE.Vector3(-1 * squareSize, 0, squareSize));
     squareGeometry.vertices.push(new THREE.Vector3(squareSize, 0,  squareSize));
     squareGeometry.vertices.push(new THREE.Vector3(squareSize, 0, -1 * squareSize));
     squareGeometry.vertices.push(new THREE.Vector3(-1 * squareSize, 0, -1 * squareSize));
     squareGeometry.faces.push(new THREE.Face4(0, 1, 2, 3));

     var squareMaterial = new THREE.MeshBasicMaterial( { color: 0x707071, side: THREE.DoubleSide, opacity: opacity, transparent: true } );
     var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
     squareMesh.position.set(squarePosX, squarePosY, squarePosZ);
     cube.add( squareMesh );

     return cube;

 }


function createOctagon(scene, width, height, x, y, z, opacity) {

     // Container object
     var octagon = new THREE.Object3D(); //create an empty container

     // Adjust registration point to bottom of object
     y = y + height / 2;

     var cornerRadius = (width - (width / (1 + Math.sqrt(2)))) / 2;
     console.log(cornerRadius);

     // Boundaries
     var xMin = x - width / 2;
     var xMax = x + width / 2;
     var zMin = z - width / 2;
     var zMax = z + width / 2;
     var yMin = y;
     var yMax = y + height;

     // Calculate vertices
     var v0 = new THREE.Vector3(xMax - cornerRadius, yMin, zMin);
     var v1 = new THREE.Vector3(xMin + cornerRadius, yMin, zMin);
     var v2 = new THREE.Vector3(xMin, yMin, zMin + cornerRadius);
     var v3 = new THREE.Vector3(xMin, yMin, zMax - cornerRadius);
     var v4 = new THREE.Vector3(xMin + cornerRadius, yMin, zMax);
     var v5 = new THREE.Vector3(xMax - cornerRadius, yMin, zMax);
     var v6 = new THREE.Vector3(xMax, yMin, zMax - cornerRadius);
     var v7 = new THREE.Vector3(xMax, yMin, zMin + cornerRadius);

     var v8  = new THREE.Vector3(xMax - cornerRadius, yMax, zMin);
     var v9  = new THREE.Vector3(xMin + cornerRadius, yMax, zMin);
     var v10 = new THREE.Vector3(xMin, yMax, zMin + cornerRadius);
     var v11 = new THREE.Vector3(xMin, yMax, zMax - cornerRadius);
     var v12 = new THREE.Vector3(xMin + cornerRadius, yMax, zMax);
     var v13 = new THREE.Vector3(xMax - cornerRadius, yMax, zMax);
     var v14 = new THREE.Vector3(xMax, yMax, zMax - cornerRadius);
     var v15 = new THREE.Vector3(xMax, yMax, zMin + cornerRadius);

     // Start building our Geometry
     var geometry = new THREE.Geometry();

     // Push in all the vertices
     geometry.vertices.push(v0);
     geometry.vertices.push(v1);
     geometry.vertices.push(v2);
     geometry.vertices.push(v3);
     geometry.vertices.push(v4);
     geometry.vertices.push(v5);
     geometry.vertices.push(v6);
     geometry.vertices.push(v7);

     geometry.vertices.push(v8);
     geometry.vertices.push(v9);
     geometry.vertices.push(v10);
     geometry.vertices.push(v11);
     geometry.vertices.push(v12);
     geometry.vertices.push(v13);
     geometry.vertices.push(v14);
     geometry.vertices.push(v15);

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

     var octagonMaterial = new THREE.MeshBasicMaterial( { color: 0xE6E6E6, side: THREE.DoubleSide, opacity: opacity, transparent: true } );
     var mesh = new THREE.Mesh(geometry, octagonMaterial);
     octagon.add( mesh );


     // Outline

     var outlineGeometry = new THREE.Geometry();
     outlineGeometry.vertices.push(new THREE.Vector3(v4.x, v4.y, v4.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v5.x, v5.y, v5.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v6.x, v6.y, v6.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v7.x, v7.y, v7.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v15.x, v15.y, v15.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v8.x, v8.y, v8.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v9.x, v9.y, v9.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v10.x, v10.y, v10.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v11.x, v11.y, v11.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v12.x, v12.y, v12.z));
     outlineGeometry.vertices.push(new THREE.Vector3(v4.x, v4.y, v4.z));

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 6 });
     var outline = new THREE.Line(outlineGeometry, lineMaterial);
     octagon.add(outline);


     // Inner lines

     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });

     // Front lines

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v5.x, v5.y, v5.z));
     innerLine.vertices.push(new THREE.Vector3(v13.x, v13.y, v13.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v6.x, v6.y, v6.z));
     innerLine.vertices.push(new THREE.Vector3(v14.x, v14.y, v14.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v15.x, v15.y, v15.z));
     innerLine.vertices.push(new THREE.Vector3(v14.x, v14.y, v14.z));
     innerLine.vertices.push(new THREE.Vector3(v13.x, v13.y, v13.z));
     innerLine.vertices.push(new THREE.Vector3(v12.x, v12.y, v12.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     // Back lines - hidden unless transparent

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v3.x, v3.y, v3.z));
     innerLine.vertices.push(new THREE.Vector3(v11.x, v11.y, v11.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v2.x, v2.y, v2.z));
     innerLine.vertices.push(new THREE.Vector3(v10.x, v10.y, v10.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v1.x, v1.y, v1.z));
     innerLine.vertices.push(new THREE.Vector3(v9.x, v9.y, v9.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v0.x, v0.y, v0.z));
     innerLine.vertices.push(new THREE.Vector3(v8.x, v8.y, v8.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);

     var innerLine = new THREE.Geometry();
     innerLine.vertices.push(new THREE.Vector3(v7.x, v7.y, v7.z));
     innerLine.vertices.push(new THREE.Vector3(v0.x, v0.y, v0.z));
     innerLine.vertices.push(new THREE.Vector3(v1.x, v1.y, v1.z));
     innerLine.vertices.push(new THREE.Vector3(v2.x, v2.y, v2.z));
     innerLine.vertices.push(new THREE.Vector3(v3.x, v3.y, v3.z));
     innerLine.vertices.push(new THREE.Vector3(v4.x, v4.y, v4.z));
     var line = new THREE.Line(innerLine, lineMaterial);
     octagon.add(line);


     // We're done!

     return octagon;

}



