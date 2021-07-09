# Image to pixels

This tool was created to make cool animations for [imagiCharm](https://www.instagram.com/tv/CFhRebmJcgl/?mc_cid=2287058dce&mc_eid=981284f4fa)

When coding in python in [the imagilabs app](https://imagilabs.com/pages/get-started), there is no way to open image files directly 😵

But there are ways have images converted – to copy-paste into the app!
💪

## How to use

 ##### ☝ It is important to know that images do not automatically fit into the imagiCharm! 

 * most images need to be adapted in an image editor beforehand
 * when using images larger than 8 * 8 pixels, you may need some advanced code techniques
 * large images results in many lines of code. For example: `8 * 8 = 64` but `16 * 16 = 256`! – Too many lines can cause your app to become slow or crash. 

### Normal image 

1. Open [Image to pixels](https://image-pixels.glitch.me/) in the same mobile where you have your Imagilabs App. 
2. Select an image file (supported types: png, jpg, gif, tiff, bmp)
3. Change python variable name to *m*
4. Click `Generate` and wait until *Done ✅* is displayed. 
5. Hold your finger on the yellow box so that you can choose **Select all**, then **Copy**
6. Paste into your Project! 👍

### Dynamically colored image

Experimenting with changing colors can be fun. ImagiCharm is fantastic with colors, so there! With following steps you can change colors in the image after you have copy-pasted the image code into Imagilabs app. 

1. The image must be a color-reduced gif or png (not a photo)
2. Note down all the colors that should show in image, as [hexadecimal colors](https://www.shutterstock.com/blog/how-hex-colors-work)
3. Put those colors in the text fields C1, C2, C3. Extra colors can be added. 

### Scrolling large image

This is one nice way to show a picture that is larger than the screen! Images are put into movement, by shifting the pixels one step for each animation frame. 

1. The image is prepared like in the examples above, with two differences: 
  * The size can be up to 100 pixels
  * The variable name must be something else than 'm'
2. Generated image code is pasted into designated place of the following code 🤖: 

```Python
import math

bg = off

# image size (max 100)
rows = 100
cols = 100

# image speed (in millisec)
step_duration = 40

# image movement
up = [1, 0]
down = [-1, 0]
left = [0, 1]
right = [0, -1]
up_left = [1, 1]
up_right = [1, -1]
down_left = [-1, 1]
down_right = [-1, -1]

direction = left

large_matrix = [ [ off for y in range( cols ) ] for x in range( rows ) ]

# PASTE GENERATED IMAGE CODE HERE

def get_step(y, x):
  for i in range(y, y+8):
    for j in range(x, x+8):
      if (is_inside_circle(i-y, j-x) == False  ):
        m[i-y][j-x] = off
      elif (large_matrix[i%rows][j%cols] != off):
        m[i-y][j-x] = large_matrix[i%rows][j%cols]
  return m

a = Animation()

# use same as direction
# if diagonal, use the largest
max = cols

for i in range(0, max): 
  clear()
  background(bg)
  a.add_frame( get_step( i*direction[0], i*direction[1] ), step_duration)
```

## Made with [Glitch](https://glitch.com/)

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

( ᵔ ᴥ ᵔ )