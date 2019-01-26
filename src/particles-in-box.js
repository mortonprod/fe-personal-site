const {ParticlesInBox} = require('./processes');
const {HtmlFinder} = require('./html-finder');
const variables = require('./variables');

const htmlObjects = HtmlFinder().calc();

console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);

//Initialize
const particlesInBox = ParticlesInBox(variables, htmlObjects);
var animate = async () => {
  requestAnimationFrame(animate);
  await particlesInBox.update();
  particlesInBox.renderer.render(particlesInBox.scene, particlesInBox.camera);
};

animate();