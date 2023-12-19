document.getElementById("elastic").oninput = function () {
    let val = this.value.trim().toLowerCase();
    let elasticItems = document.querySelectorAll(".catalog-table-names");
  
    elasticItems.forEach(function (elem) {
      if (!elem.originalTextContent) {
        elem.originalTextContent = elem.textContent;
      }
  
      let textContent = elem.originalTextContent.toLowerCase();
      let pos = textContent.indexOf(val);
  
      if (pos !== -1) {
        elem.innerHTML = insertMask(elem.originalTextContent, pos, val.length);
      } else {
        elem.textContent = elem.originalTextContent;
      }
    });
  };
  
  function insertMask(string, pos, len) {
    return (
      string.slice(0, pos) +
      "<mark>" +
      string.slice(pos, pos + len) +
      "</mark>" +
      string.slice(pos + len)
    );
  };
  
  document.getElementById("scrollToButton").onclick = function () {
    let highlightedElement = document.querySelector(".catalog-table-names mark");
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  
  