var file, image, imageSize, statusMessage, actionButton;
var colorVariables, varname;
var canvas, ctx;


window.onload = function init() {
  
  imageSize = document.getElementById('image_size');
  statusMessage = document.getElementById('status_text');
  actionButton = document.getElementById('action_button');
  canvas = document.getElementById('color-picker-canvas');
  varname = document.getElementById('varname');
  
  /* global addColor */
  addColor();
  addColor();
  addColor();
  
  const exampleImages = Array.from(document.querySelectorAll(".example-column > div > button"))
  for(const example of exampleImages) {
    example.addEventListener("click", selectExample);
  }

  const addColorButton = document.getElementById("add-color");
  addColorButton.addEventListener("click", function(event) {
    addColor();
  });
  
  /* global openColorPicker */
  const expandButton = document.getElementById("canvas-expand-button")
    expandButton.addEventListener("click",  function () {
      this.style.display = "none";
      openColorPicker(undefined, true);
    })
}


function srcToFile(src, mimeType){
  return (fetch(src)
    .then((res) => res.arrayBuffer())
    .then((buf) => {
      return new Blob([buf], {type: mimeType});
    })
  );
}

function selectExample (event) {
  const info = event.currentTarget.children[0];
  
  srcToFile( info.src, info.dataset.format ).then(newFile => {
    /* global fileSelected*/
    fileSelected(newFile);

    colorVariables.forEach(node => {
      node.color.value = node.text.value = info.dataset[node.color.id] || "";
    });
    varname.value = info.id || "large_matrix";
 })
}

