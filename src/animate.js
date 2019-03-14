const {SplashPage} = require('./splash-page');
const variables = require('./variables');

console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);

//Initialize
const splashPage = SplashPage(variables);
var animate = async () => {
  requestAnimationFrame(animate);
  await splashPage.update();
  splashPage.renderer.render(splashPage.scene, splashPage.camera);
};

animate();