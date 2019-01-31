This repository is a semi dynamic page linked to a sub domain. In this can the root domain.

It is composed of a graphql endpoint, html generator.

The html generator uses the graphql endpoint to get the data to fill the page.
The html generator runs during development and deployment.

Deployment at the moment is nothing more than uploading a html and js file to s3 through cloudfront.

# Further development

We could add a pipelines to generate the code or have the graphql endpoint be triggered at runtime not build time.

# Reference

https://github.com/mrdoob/three.js/blob/master/examples/css3d_molecules.html
https://subscription.packtpub.com/book/web_development/9781783981182/1/ch01lvl1sec12/getting-started-with-the-css-3d-renderer

