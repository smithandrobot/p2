# P2 Static Site

## Summary

Install: `npm install`
Build: `gulp`
Deploy: `./build_deploy.sh`

## Editing Content

All content is edited on prismic.io

## Site Build

Site is built using the default prismic.io task provided by baked.js. Run `gulp` to generate the site or `gulp serve` to build, watch and serve the site locally.

## Build and Deploy

Running `./build_deploy.sh` will generate the site and push the correct files to origin:gh-pages. This is done generating the site, creating a new local gh-pages branch, pushing the build folder into gh-pages, force pushing gh-pages to origin and removing the local gh-pages branch.
