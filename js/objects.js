

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
