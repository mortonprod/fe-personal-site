const get = require('lodash.get');
const set = require('lodash.set');
const updateVelocity = (key, properties) => {
  const x = get(properties.get(key), 'position.x') + get(properties.get(key), 'velocity.x');
  const y = get(properties.get(key), 'position.y') + get(properties.get(key), 'velocity.y');
  const z = get(properties.get(key), 'position.z') + get(properties.get(key), 'velocity.z');
  set(properties.get(key), 'position.x', x);
  set(properties.get(key), 'position.y', y);
  set(properties.get(key), 'position.z', z);
}

const updateWall = (key, properties, boxWidth,boxHeight, widthFactor, heightFactor, depth) => {
  let x = get(properties.get(key), 'position.x');
  let y = get(properties.get(key), 'position.y');
  let z = get(properties.get(key), 'position.z');
  let vx = get(properties.get(key), 'velocity.x');
  let vy = get(properties.get(key), 'velocity.y');
  let vz = get(properties.get(key), 'velocity.z');
  if (Math.abs(x) >= widthFactor * boxWidth) {
    vx = -1 * vx
    set(properties.get(key), 'velocity.x', vx);
  }
  if (Math.abs(y) >= heightFactor * boxHeight) {
    vy = -1 * vy
    set(properties.get(key), 'velocity.y', vy);
  }
  if (Math.abs(z) >= depth) {
    vz = -1 * vz
    set(properties.get(key), 'velocity.z', vz);
  }
}
let variables;
self.addEventListener('message', function(e) {
  if(e.data.type === 'initial') {
    variables = e.data.variables;
  } else {
    const properties = variables.spheres.properties;
    // console.debug(`Start calculation ${JSON.stringify([...properties])}`);
    for (let key of properties.keys()) {
      updateWall(key,properties, variables.box.boxWidth, variables.box.boxHeight, variables.box.widthFactor, variables.box.heightFactor, variables.box.depth);
      updateVelocity(key,properties);
    }
    variables.spheres.properties = properties;
    // console.debug(`Send variables back ${JSON.stringify(variables.properties)}`);
    self.postMessage({variables});
  }
});




