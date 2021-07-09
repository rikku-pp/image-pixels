const getColorNodes = () =>
  document.querySelectorAll(".color-variables > div:not(#add-color)");

/* global colorVariables */
function addColor() {
  const addColorButton = document.getElementById("add-color");
  const newColor = document.createElement("div");
  const nextNumber = getColorNodes().length + 1;

  newColor.innerHTML = `
    <label for="c${nextNumber}">C${nextNumber}</label>
    <input type="text" id="c${nextNumber}_text" />
    <input type="color" id="c${nextNumber}" />  
  `;
  addColorButton.parentNode.insertBefore(newColor, addColorButton);

  colorVariables = Array.from(getColorNodes()).map(node => {
    const [label, text, color] = node.children;

    text.addEventListener("input", event => (color.value = event.target.value));
    color.addEventListener("click", function(event) {
      event.preventDefault();
      openColorPicker(this.id);
    });

    return { text, color };
  });
}

/* global image imageSize canvas ctx */
var openColorPicker = (function openColorPicker(id) {
  var colorId, moveListener;

  return function(newColorId, expanded) {
    if (newColorId) colorId = newColorId;
    if (!moveListener) {
      canvas.addEventListener("mousemove", handleOnMove);
      canvas.addEventListener("mouseup", function(e){ return handleOnMove.call(this, e, "up")});
      moveListener = handleOnMove;
    }

    if (image) {
      
      const isLandscape = image.width > image.height;
      canvas.style.cursor = "crosshair";

      if (!expanded) {
        const expandButton = document.getElementById("canvas-expand-button");
        expandButton.style.display = "inline-block";
        canvas.height = canvas.width = 150;
      } else {
        canvas.height = !isLandscape
          ? (canvas.width * image.height) / image.width
          : 150;
        canvas.width = isLandscape
          ? (canvas.height * image.width) / image.height
          : 150;
      }

      ctx = canvas.getContext("2d");
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      const height =
        !expanded && !isLandscape
          ? (canvas.width * image.height) / image.width
          : canvas.height;
      const width =
        !expanded && isLandscape
          ? (canvas.height * image.width) / image.height
          : canvas.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, width, height);
      
    }
  };

  function handleOnMove(e, click) {
    
    let x = e.pageX - this.offsetLeft;
		let y = e.pageY - this.offsetTop;
    
    // transform screen coordinate into image coordinate
    // ie: 8px * fraction( click-position / full size )
    const xInImage = Math.floor(image.width * x / canvas.width)
    const yInImage = Math.floor(image.height * y / canvas.height)
    
    let imgData = ctx.getImageData(x, y, 1, 1).data;
  
    let R = imgData[0];
		let G = imgData[1];
		let B = imgData[2];
    let hex = rgbToHex(R,G,B);
  
    if(click==="up"){
      colorVariables[colorId[1]-1].text.value = hex
      canvas.removeEventListener("mousemove", handleOnMove)
    }
    colorVariables[colorId[1]-1].color.value = hex
  }
})();

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  let hex = c.toString(16) 
  return hex.length == 1 ? "0" + hex : hex;

}
