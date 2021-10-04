from PIL import Image, ImageDraw, ImageFont
from colour import Color
from PyQt5.QtWidgets import QProgressBar
import os

def converter(in_f: str, SC: float, GCF: int, bgcolor='white', more_shades: bool=True, greyscale: bool=False, progress_bar: QProgressBar=None) -> tuple:
    gscale1 = " .`^\",:;Il!i~+_-?][}{1)(|\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B" #70 shades of gray
    gscale2 = " .:-=+*#" #10 shades of gray

    # The array of ascii symbols from white to black
    chars = list(gscale1 if more_shades else gscale2)

    # Load the fonts and then get the the height and width of a typical symbol 
    # You can use different fonts here
    font = ImageFont.load_default()
    fill = "x"
    w_fill, h_fill = font.getsize(fill)

    WCF = h_fill/w_fill

    #open the input file
    img = Image.open(in_f)

    #Based on the desired output image size, calculate how many ascii letters are needed on the width and height
    widthByLetter=round(img.size[0]*SC*WCF)
    heightByLetter = round(img.size[1]*SC)
    S = (widthByLetter, heightByLetter)

    #Resize the image based on the symbol width and height
    rgb_img = img.resize(S)

    grayscale_img = rgb_img.convert("L")

    if greyscale:
        color_palette = grayscale_img.getpalette()
    else:
        color_palette = rgb_img.getpalette()

    #Create an image object, set its width and height
    newImg_width = w_fill * widthByLetter
    newImg_height = h_fill * heightByLetter
    scrapImg = Image.new("RGBA", (w_fill*2, h_fill), bgcolor)
    draw = ImageDraw.Draw(scrapImg)
    resultImg = Image.new("RGBA", (newImg_width, newImg_height), bgcolor)

    if progress_bar:
        progress_bar.setMaximum(rgb_img.size[1] * 2)
        progress_bar.setValue(0)

    lines = []
    for h in range(rgb_img.size[1]):
        line = ''
        colors = []
        
        for w in range(rgb_img.size[0]):
			# get brightness value
            brightness = grayscale_img.getpixel((w, h)) / 255
            if greyscale:
                pixel = grayscale_img.getpixel((w, h))
                # getpixel() may return an int, instead of tuple of ints, if the
                # source img is a PNG with a transparency layer
                if isinstance(pixel, int):
                    pixel = (pixel, pixel, pixel) if color_palette is None else tuple(color_palette[pixel*3:pixel*3 + 3])
            else:
                pixel = rgb_img.getpixel((w, h))
                if isinstance(pixel, int):
                    pixel = (pixel, pixel, 255) if color_palette is None else tuple(color_palette[pixel*3:pixel*3 + 3])

            srgb = tuple((v/255.0)**GCF for v in pixel)
            colors.append(srgb)

            char = chars[int(brightness * (len(chars) - 1))]
            line += char
        lines.append((line, colors))

        if progress_bar:
            progress_bar.setValue(progress_bar.value() + 1)

    y_draw, y_paste = 0, 0
    for line, colors in lines:
        x_draw, x_paste = 0, 0
        for ch, colorNum in zip(line, range(len(colors))):
            draw.rectangle((0, 0, w_fill * widthByLetter * 5, h_fill), fill=bgcolor)
            w_full, h_full = draw.textsize(fill+ch, font=font)
            w = w_full - w_fill # the width of the character on its own
            h = h_full - h_fill # the hight of the character on its own
            draw.text((x_draw, y_draw), fill+ch, Color(rgb=colors[colorNum]).hex, font=font)
            iletter = scrapImg.crop((x_draw + w_fill, y_draw, x_draw + w_full, h_full))
            resultImg.paste(iletter, (x_paste, y_paste))
            x_paste += w
        y_paste += h_fill

        if progress_bar:
            progress_bar.setValue(progress_bar.value() + 1)
        
        resline = ''
        for line in lines:
            resline += '\n' + line[0]

    return(resultImg, resline)

if __name__=='__main__':

    #inputf = os.path.join("images", "examples", "strawberry_elephant.png")
    #inputf = os.path.join("images", "examples", "fat_rat.jpg")
    inputf = os.path.join("images", "examples", "kot.jpg")

    SC = 1 # pixel sampling rate in width
    GCF = 1 # contrast adjustment

    converter(inputf, SC, GCF, bgcolor='white', greyscale=False)