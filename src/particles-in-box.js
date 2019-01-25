const {ParticlesInBox} = require('./processes');
const variables = require('./variables');

console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);

//Initialize
const particlesInBox = ParticlesInBox(variables);
var animate = async () => {
  requestAnimationFrame(animate);
  await particlesInBox.update();
  particlesInBox.renderer.render(particlesInBox.scene, particlesInBox.camera);
};

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

  particlesInBox.camera.aspect = window.innerWidth / window.innerHeight;
  particlesInBox.camera.updateProjectionMatrix();

  particlesInBox.renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();