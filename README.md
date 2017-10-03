# Introduction
[![Build Status](https://travis-ci.org/mortonprod/welcome-page-react.svg?branch=master)](https://travis-ci.org/mortonprod/welcome-page-react)
[![Coverage Status](https://coveralls.io/repos/github/mortonprod/welcome-page-react/badge.svg?branch=master)](https://coveralls.io/github/mortonprod/welcome-page-react?branch=master)

A portfolio site for a software developer. Expanded from the single page hence the misnomer of a github name.


The repository can be ran by itself but if you are interested in its backend then checkout [PortfolioNodeBackend](https://github.com/mortonprod/portfolioNodeBackend) which will pull this repository automatically.


It is based using [Create-React-App](https://github.com/facebookincubator/create-react-app). You will need to install this as a global dependency for this to work.

# Github

```
git clone https://github.com/mortonprod/welcome-page-react welcome-page-react
```

# Build

To create the final production code with react-snapshot run:
```
npm run build
```
This is what is served from your backend.

# Testing
Testing requires watchman installed globally. I have this installed using homebrew but you can probably use npm.
However, be aware that for some operating systems you could have issues. 

```
npm run test
```

To check your test coverage do
```
npm run test:coverage
```

# Documentation

The website comes with it's own documentation through js docs.
```
npm run docs
```




