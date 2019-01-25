This repository is a semi dynamic page linked to a sub domain. In this can the root domain.

It is composed of a graphql endpoint, html generator.

The html generator uses the graphql endpoint to get the data to fill the page.
The html generator runs during development and deployment.

Deployment at the moment is nothing more than uploading a html and js file to s3 through cloudfront.

# Further development

We could add a pipelines to generate the code or have the graphql endpoint be triggered at runtime not build time.

