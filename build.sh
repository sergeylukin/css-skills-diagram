#!/bin/sh

# Install dependencies
bundle

# Compile CSS stylesheets
compass compile -e production --force
