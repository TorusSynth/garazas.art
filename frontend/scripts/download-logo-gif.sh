#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download a placeholder GIF for the logo
# This is a placeholder URL. Replace with an actual art-related GIF URL in production
echo "Downloading logo animation GIF..."
curl -o public/images/logo-animation.gif https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXJ3NHd2eTgxbDE1cXNjZmVjeTBlZ3ZwbGR2eWoxY2tjNTBmZW1pdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRvILmSIWwhXLlS/giphy.gif

echo "Download complete. GIF saved to public/images/logo-animation.gif" 