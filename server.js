// Javascript Image Manipulation Program
const Jimp = require("jimp");

// NodeJS Express Server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.raw());

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// https://expressjs.com/en/starter/basic-routing.html
app.post("/image", (request, response) => {
  
  const { varname = "large_matrix" } = request.query; // URL parameter input
  const colors = {}
  for(let i = 1; !!request.query["c"+i]; i++) {
    colors[request.query["c"+i]] = "c"+i
  }
  
  Jimp.read(request.body) // Binary input
    .then(image => {
      const namedPixels = [];
      const rgbPixels = [];
      const definitions = {};
      let results = "";
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image

        const red = this.bitmap.data[idx + 0]
        const green = this.bitmap.data[idx + 1]
        const blue = this.bitmap.data[idx + 2]
        const hex = rgbToHex(red, green, blue)

        if(colors[hex]) {
          namedPixels.push([x, y, colors[hex]])
          definitions[colors[hex]] = `${colors[hex]} = (${red}, ${green}, ${blue})\r\n`
        } 
        
        rgbPixels.push([x, y, `(${red}, ${green}, ${blue})`]);
        
      });

      for (const [x, y, colorName] of namedPixels) {
        results += `${varname}[${y}][${x}] = ${colorName}\r\n`; // flip pairs so that rows become level 1 array, columns level 2 array
      }
    
      const colorsNotFound = results.length === 0
      
      if(colorsNotFound) { 
        for (const [x, y, rgbValue] of rgbPixels) {
          results += `${varname}[${y}][${x}] = ${rgbValue}\r\n`
        }
      } else {
        results = `# Colors used in ${varname}:\r\n` 
          +  Object.values(definitions).join("")
          + '\r\n' + results
      }
    
      response.status(200).end(results);
    })
    .catch(error => {
      response.status(500);
      response.json({
        message: "unable to process request",
        error: error.toString()
      });
    });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}