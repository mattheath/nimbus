function ec2Instance(data) {

    var width = 50;

    if (data.size == 'small') {
      var height = 35;
    }

    var opacity = data.opacity || 1;

    var clipBufferAmount = 0.2;

    var x = data.x;
    var y = 0;
    var z = data.z;

    var base = createCube(width, height, x, y, z);

     // Add square logo to top of the cube

     // Calculate size & position of the square, relative to the cube size
     var squareSize = width * 0.1333333333;
     var squareBorderSpacing = squareSize * 0.6;
     var squarePosX = x + width / 2 - squareSize - squareBorderSpacing;
     var squarePosY = y + clipBufferAmount + height;
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
     base.add( squareMesh );


  return base;
}

function s3() {

  var base = 0;


}

