function ec2Instance(data) {

    var width = data.width || 50;

    var height;

    // Set height based on instance size
    switch (data.size) {
      case 'large':
        height = 70;
      break;
      case 'medium':
        height = 50;
      break;
      case 'small':
      default:
        height = 35;
    }

    var opacity = data.opacity || 1;

    var clipBufferAmount = 0.2;

    var x = data.x;
    var y = data.y || 0;
    var z = data.z;

    var base = createCube(width, height, x, y, z, opacity);

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

function s3(data) {

    var opacity = data.opacity || 1;

    var clipBufferAmount = 0.2;

    var x = 350; //data.x;
    var y = data.y || 0;
    var z = 250; //data.z;

    var width = 100;
    var height = width;
    var length = width * 1.5;

    var xMin = x - width/2;
    var xMax = x + width/2;
    var yMin = y;
    var yMax = y + height;
    var zMin = z - length / 2;
    var zMax = z + length / 2;

    // First get an oblong which is the correct size
    // height and width are the same, but the oblong is 1.5 times longer
    var base = createOblong(width, length, height, x, y, z, opacity);

    // Now add additional inner borders

    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x, yMin - clipBufferAmount, zMax + clipBufferAmount));
    geometry.vertices.push(new THREE.Vector3(x, yMax + clipBufferAmount, zMax + clipBufferAmount));
    geometry.vertices.push(new THREE.Vector3(x, yMax + clipBufferAmount, z + length / 6));
    var line = new THREE.Line(geometry, lineMaterial);
    base.add(line);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(xMin - clipBufferAmount, yMin - clipBufferAmount, z + length / 6));
    geometry.vertices.push(new THREE.Vector3(xMin - clipBufferAmount, yMax + clipBufferAmount, z + length / 6));
    geometry.vertices.push(new THREE.Vector3(xMax + clipBufferAmount, yMax + clipBufferAmount, z + length / 6));
    geometry.vertices.push(new THREE.Vector3(xMax + clipBufferAmount, yMin - clipBufferAmount, z + length / 6));
    var line = new THREE.Line(geometry, lineMaterial);
    base.add(line);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(xMin - clipBufferAmount, yMin - clipBufferAmount, z - length / 6));
    geometry.vertices.push(new THREE.Vector3(xMin - clipBufferAmount, yMax + clipBufferAmount, z - length / 6));
    geometry.vertices.push(new THREE.Vector3(xMax + clipBufferAmount, yMax + clipBufferAmount, z - length / 6));
    geometry.vertices.push(new THREE.Vector3(xMax + clipBufferAmount, yMin - clipBufferAmount, z - length / 6));
    var line = new THREE.Line(geometry, lineMaterial);
    base.add(line);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x, yMin - clipBufferAmount, zMin - clipBufferAmount));
    geometry.vertices.push(new THREE.Vector3(x, yMax + clipBufferAmount, zMin - clipBufferAmount));
    geometry.vertices.push(new THREE.Vector3(x, yMax + clipBufferAmount, z - length / 6));
    var line = new THREE.Line(geometry, lineMaterial);
    base.add(line);

    // And a placeholder square - should be a bucket logo!

    // Calculate size & position of the square, relative to the cube size
    var squareSize = width * 0.1;
    var squarePosX = x;
    var squarePosY = y + clipBufferAmount + height;
    var squarePosZ = z;

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

