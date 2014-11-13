#!/bin/bash

gulp
git add generated/*
git commit -m "Site built"
git subtree split --prefix generated -b gh-pages
git push -f origin gh-pages:gh-pages
git branch -D gh-pages
