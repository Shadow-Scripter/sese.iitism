import os
from PIL import Image

folder_path = "c:/Users/darsh/Documents/Website/SESE-Website/sese_web_2/public/images/trees"

for filename in os.listdir(folder_path):
    if filename.endswith(".png"):
        img_path = os.path.join(folder_path, filename)
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Check if pixel is white or very close to white
            if item[0] > 220 and item[1] > 220 and item[2] > 220:
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                newData.append(item)
                
        img.putdata(newData)
        # We will save it back, maybe prefixing with "tree_" and a number for easier usage
        new_filename = f"tree_{len([f for f in os.listdir(folder_path) if f.startswith('tree_')]) + 1}.png"
        img.save(os.path.join(folder_path, new_filename), "PNG")
        # Remove the old screenshot file
        os.remove(img_path)

print("Processed all trees.")
