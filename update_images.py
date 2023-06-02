import os
import json

images_dir = 'images/'

# Get a list of image filenames in the images directory
image_files = [filename for filename in os.listdir(images_dir) if os.path.isfile(os.path.join(images_dir, filename))]

# Create a list of image objects with the filenames
images = [{'filename': filename} for filename in image_files]

# Create a dictionary to store the images list
data = {'images': images}

# Write the data to the images.json file
with open('images.json', 'w') as json_file:
    json.dump(data, json_file)
