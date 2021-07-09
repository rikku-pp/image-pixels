/*global colorVariables file statusMessage varname*/

const reader = new FileReader();
const endpoint = '/image';

function upload(event) {
  const colors = colorVariables.reduce((acc, node) => ({
    ...acc,
    [node.color.id]: node.text.value
  }), {})
  
  const varnameValue = varname.value;
  const searchParams = new URLSearchParams({
    ...colors, varname: varnameValue
  }).toString()
  
  const resultsArea = document.getElementById("results")
  let spinnerInterval = setInterval( () => statusMessage.textContent = spin(), 40 );

  reader.onload = () => {
    fetch(endpoint+"?"+searchParams, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      body: file
    })
      .then(res => {
          if(res.ok) return res.text()
          throw new Error("Bad file");
        })
      .then(resultText => {
        clearInterval(spinnerInterval);
        statusMessage.textContent = " ✅ Done";
        resultsArea.value = resultText;
      })
      .catch(err => {
        clearInterval(spinnerInterval);
        statusMessage.textContent = " ❌ Something went wrong";
    })
  }

  reader.readAsBinaryString(file);
  return true;
}

var spin = (function spin () {
  let loadSpinner = "|";

  return function () {
    switch (loadSpinner) {
      case "|": loadSpinner = "/"; break;
      case "/": loadSpinner = "–"; break;
      case "–": loadSpinner = "\\"; break;
      case "\\": loadSpinner = "|"; break;
      default: loadSpinner = "|"; break;
    }
    return loadSpinner;
  }
})();