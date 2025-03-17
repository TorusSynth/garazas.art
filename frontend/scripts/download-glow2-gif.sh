#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download a glow2.gif for the background
# This downloads a starfield animation from giphy as a placeholder
echo "Downloading glow2 animation GIF..."
curl -L -o public/images/glow2.gif https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXcwZWtvY2hqOHVlNjc2cmQ0YzRpNnV3MngzbG1wNmx0cXp2Y3VwbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YWUpVw86AtIbe/giphy.gif

echo "Download complete. GIF saved to public/images/glow2.gif" 