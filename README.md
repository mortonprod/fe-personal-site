# Introduction

A portfolio site for a software developer. Expanded from the single page hence the misnomer of a github name.
This frontend can be served from my repository portfolioNodeBackend. 

# Build
```
npm run build
npm run docs
```

# Development and Testing
```
npm run start
npm run tests
```

# Note 
Never put opacity to 0 for initial state for transition. JS might not be defined to change it.
This means google could crawl the portfolio even if js disabled crawl render was a bit weird.

If service worker is working in background then index.html will be served by default.
Therefore can't test with google chrome. Does it work with truly js dead browser? 




