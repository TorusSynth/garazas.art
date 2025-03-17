#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download a placeholder GIF for the hero section
# This is a placeholder URL. Replace with an actual art-related GIF URL in production
echo "Downloading hero animation GIF..."
curl -o public/images/hero-animation.gif https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHk3Zmp5YXMyOWJzeW9uNGN3Ymx0Y2VmM3dpM3dtOGplcTc3Nm91NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMfn35NL1llPm8/giphy.gif

echo "Download complete. GIF saved to public/images/hero-animation.gif" 