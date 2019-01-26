const {ParticlesInBox} = require('./processes');
const {HtmlFinder} = require('./html-finder');
const variables = require('./variables');

const indexToElement = HtmlFinder().getIndexToElement();

console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);

//Initialize
const particlesInBox = ParticlesInBox(variables, indexToElement);
var animate = async () => {
  requestAnimationFrame(animate);
  await particlesInBox.update();
  particlesInBox.renderer.render(particlesInBox.scene, particlesInBox.camera);
};

animate();