/*global file image imageSize reader actionButton statusMessage*/

function fileSelected(exampleImage) {
  file = exampleImage || document.getElementById('file').files[0];
  imageSize.textContent = '\xA0'; // escaped whitespace

  reader.readAsDataURL(file);
  reader.onload = function () {
    image = new Image();
    image.src = this.result;
    image.onload = function () {
      imageSize.textContent = ` width: ${this.width}px , height: ${this.height}px`;
      actionButton.disabled = false;
      statusMessage.textContent = "";
    }
  };
}