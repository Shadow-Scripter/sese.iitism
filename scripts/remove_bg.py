from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if pixel is white or very close to white
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

remove_white_bg("c:/Users/darsh/Documents/Website/SESE-Website/sese_web_2/public/logo.png", "c:/Users/darsh/Documents/Website/SESE-Website/sese_web_2/public/logo_transparent.png")
print("Background removed successfully.")
