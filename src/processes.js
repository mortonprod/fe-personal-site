const THREE = require('three');
const $ = require('jquery');
const OrbitControls = require('three-orbit-controls')(THREE)
const get = require('lodash.get');
const set = require('lodash.set');
const Worker = require('./physics.worker.js');
// worker.addEventListener("message", function (event) {});
// worker.terminate();

const ID = 'canvas';

const visibleHeightAtZDepth = (depth, camera) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

const visibleWidthAtZDepth = (depth, camera) => {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
};

function ParticlesInBox(variables, htmlObjects) {
  const worker = new Worker();
  // Create canvas element and attach to dom
  var renderer = new THREE.WebGLRenderer();
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  const container = document.getElementById(ID);
  container.appendChild(renderer.domElement);
  const WIDTH = container.clientWidth;
  const HEIGHT = container.clientHeight;
  var camera = new THREE.PerspectiveCamera(variables.camera.fov, WIDTH / HEIGHT, variables.camera.near, variables.camera.far);
  const depth = variables.camera.initial.position.z;
  let boxWidth = visibleWidthAtZDepth(depth, camera);
  let boxHeight = visibleHeightAtZDepth(depth, camera);
  variables.box.boxWidth = boxWidth;
  variables.box.boxHeight = boxHeight;
  console.debug(`WIDTH/HEIGHT: ${WIDTH}/${HEIGHT}`);
  var scene = new THREE.Scene();
  const material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });
  // Create the lines
  for (let key of htmlObjects.keys()) {
    const obj = htmlObjects.get(key);
    console.debug(`${key} ::: ${JSON.stringify(obj)}`);
    const geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(obj.x, obj.y, 0)
    );
    var line = new THREE.Line(geometry, material);
    scene.add(line);
  }


  let light
  switch (variables.light.type) {
    case 'point':
      light = new THREE.PointLight(variables.light.color, variables.light.intensity);
      light.position.set(variables.light.position.x, variables.light.position.y, variables.light.position.z);
      break;
    case 'directional':
      light = new THREE.DirectionalLight(variables.light.color, variables.light.intensity);
      light.position.set(variables.light.position.x, variables.light.position.y, variables.light.position.z);
      break;
    case 'ambient':
      light = new THREE.AmbientLight(0x404040);
      break;
  }
  scene.add(light);
  console.debug(`Width/Height: ${boxWidth}/${boxHeight} at visible at depth ${depth}`);
  renderer.setSize(WIDTH, HEIGHT);
  camera.position.z = depth;
  const controls = new OrbitControls(camera);
  controls.target.set(0, 0, 0)

  // Set properties and object variables. 
  variables.spheres.properties = new Map();
  const indexToObject = new Map();


  const setInitialProperties = () => {
    for (let key = 0; key < variables.spheres.number; key++) {
      if (!variables.spheres.properties.has(key)) {
        variables.spheres.properties.set(key, {});
      }
      const property = variables.spheres.properties.get(key);
      set(property, 'velocity.x', getRandom() * variables.spheres.maxSpeed);
      set(property, 'velocity.y', getRandom() * variables.spheres.maxSpeed);
      set(property, 'velocity.z', getRandom() * variables.spheres.maxSpeed);
      set(property, 'position.x', getRandom() * variables.box.widthFactor * boxWidth);
      set(property, 'position.y', getRandom() * variables.box.heightFactor * boxHeight);
      set(property, 'position.z', getRandom() * variables.box.depth);
      variables.spheres.properties.set(key, property);
    }
  }

  const getSafe = (key, prop) => {
    return get(variables.spheres.properties.get(key), prop, get(variables.spheres.initial, prop));
  }

  const setObjects = () => {
    for (let i = 0; i < variables.spheres.number; i++) {
      const colors = variables.spheres.colors;
      var color = colors[Math.floor(Math.random() * colors.length)];
      let material;
      // const material = new THREE.MeshBasicMaterial({
      //   color: color
      // });
      switch (variables.spheres.material.type) {
        case 'standard':
          material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: variables.spheres.material.metalness,
            roughness: variables.spheres.material.roughness
          });
          break;
        case 'normal':
          material = new THREE.MeshNormalMaterial();
          break;
        case 'phong':
          material = new THREE.MeshPhongMaterial();
          break;
        case 'basic':
          material = new new THREE.MeshBasicMaterial({
            color
          });
          break;
      }
      const sphereGeometry = new THREE.SphereGeometry(
        variables.spheres.initial.radius,
        variables.spheres.initial.widthSegments,
        variables.spheres.initial.heightSegments,
        variables.spheres.initial.phiStart,
        variables.spheres.initial.phiLength,
        variables.spheres.initial.thetaStart,
        variables.spheres.initial.thetaLength
      );
      const sphereMesh = new THREE.Mesh(sphereGeometry, material)
      scene.add(sphereMesh);
      indexToObject.set(i, sphereMesh);
      indexToObject.get(i).position.set(getSafe(i, 'position.x'), getSafe(i, 'position.y'), getSafe(i, 'position.z'));
    }
  }

  const getRandom = () => {
    return -(Math.random() - 0.5);
  }
  setInitialProperties();
  setObjects();
  ///////////////////////////////////////////////////////////////////Raycasting

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function handleManipulationUpdate() {
    // cleanup previous results, mouse moved and they're obsolete now
    // latestMouseIntersection = undefined;
    // hoveredObj = undefined;

    raycaster.setFromCamera(mouse, camera); {
      var intersects = raycaster.intersectObjects(Array.from( indexToObject.values() ));
      for (var i = 0; i < intersects.length; i++) {

        intersects[i].object.material.color.set('pink');
        console.log(`Point: ${JSON.stringify(intersects[i].point)}`);
        const point = intersects[i].point
        const canvasHalfWidth = renderer.domElement.offsetWidth / 2;
        const canvasHalfHeight = renderer.domElement.offsetHeight / 2;
        var pointVector = new THREE.Vector3( point.x, point.y, point.z );
        const tooltipPosition = pointVector.clone().project(camera);
        tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
        tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;
        var divElement = $("#tooltip");
        var tootipWidth = divElement[0].offsetWidth;
        var tootipHeight = divElement[0].offsetHeight;
        divElement.css({
          left: `${tooltipPosition.x - tootipWidth/2}px`,
          top: `${tooltipPosition.y - tootipHeight - 5}px`
        });
      }
    }
  }

  // Following two functions will convert mouse coordinates
  // from screen to three.js system (where [0,0] is in the middle of the screen)
  function updateMouseCoords(event, coordsObj) {
    coordsObj.x = ((event.clientX - renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
    coordsObj.y = -((event.clientY - renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
  }

  function onMouseMove(event) {
    updateMouseCoords(event, mouse);
    handleManipulationUpdate();
  }

  window.addEventListener('mousemove', onMouseMove, false);

  ////////////////////////////////////////////////////////////////////
  worker.postMessage({
    type: 'initial',
    variables
  });
  const update = () => {
    return new Promise((resolve, reject) => {
      worker.postMessage({}); // Post a message with the current variables
      worker.onmessage = function (event) {
        variables = event.data.variables; // Must set new value for next loop
        for (let key of variables.spheres.properties.keys()) { // Now set value in three js.
          if (indexToObject.has(key)) {
            const property = variables.spheres.properties.get(key);
            const mesh = indexToObject.get(key);
            // if(key === 0) {
            // console.debug(`${key} ${property.position.x} ${property.position.y} ${property.position.z}`)
            // }
            mesh.position.set(property.position.x, property.position.y, property.position.z);
            // mesh.position.set(2,2,2);        
          }
        }
      };
      resolve();
    })
  }
  // What ever we need to refresh do it here for these objects
  // window.addEventListener('resize', onWindowResize, false);

  // function onWindowResize() {
  //   boxWidth = visibleWidthAtZDepth(depth, camera);
  //   boxHeight = visibleHeightAtZDepth(depth, camera);
  //   setInitialProperties();
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }
  return {
    update,
    scene,
    camera,
    renderer
  }
}

export {
  ParticlesInBox
}