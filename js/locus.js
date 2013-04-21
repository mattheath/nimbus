
function drawOriginMarker(scene, size) {

     size = size || 500;

     // X AXIS IS RED
     var lineMaterial = new THREE.LineBasicMaterial({ color: 0xCC0000, linewidth: 5 });
     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(0,0,0));
     geometry.vertices.push(new THREE.Vector3(size, 0, 0));
     var line = new THREE.Line(geometry, lineMaterial);
     scene.add(line);

     // Z AXIS IS GREEN
     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x00CC00, linewidth: 5 });
     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(0,0,0));
     geometry.vertices.push(new THREE.Vector3(0, 0, size));
     var line = new THREE.Line(geometry, lineMaterial);
     scene.add(line);

     // Y AXIS IS BLUE
     var lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000CC, linewidth: 5 });
     var geometry = new THREE.Geometry();
     geometry.vertices.push(new THREE.Vector3(0,0,0));
     geometry.vertices.push(new THREE.Vector3(0, size, 0));
     var line = new THREE.Line(geometry, lineMaterial);
     scene.add(line);

}
