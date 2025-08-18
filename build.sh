#!/bin/bash

# Install dependencies
npm install

# Build the React app
npm run build

# Copy build files to Django static directory
cp -r build/* ../static/

echo "Build completed successfully!"
