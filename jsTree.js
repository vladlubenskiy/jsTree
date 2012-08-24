var jsTreeNS = new function() {

   /* 
    *
    * Interface section
    *
   */ 
   
   this.makeSVGElementDragable = function(element) {
         element._dragged = false;
         document.body._dragedElement = null;
         document.body.addEventListener('mousemove', mouseMoveHandler);
         element.addEventListener('mousedown', mouseDownHandler(element));
         element.addEventListener('mouseup', mouseUpHandler);
   }

   // Tree class
   this.Tree = function (nodeValue, trees) {
      // It's surrounded by try-catch to prevent crash of tree when any of subtree crashes.
      try {
         trees = getValue(trees);
         if (validateChildren(trees)) {
            this.children = trees;
         } else {
            throw "Wrong type of subtree";
         }
      } catch (error) {
         console.log("Error while processing children of " + nodeValue);
      }
      this.nodeValue = nodeValue;
   }

   this.Tree.prototype.isLeaf = function() {
      return !(this.children);
   }

   this.Tree.prototype.getNodeValue = function() {
      getValue(this.nodeValue);
   }

   /* 
    *
    * Utilities section
    *
   */ 

   // Tree utilities
   function validateChildren(trees) {
      if (!trees) return true;
      for (var i = 0; i < trees.length; i++) {
         if (!(trees[i] instanceof jsTreeNS.Tree))
            return false;
      }
      return true;
   }

  
   function getValue(value) {
      return (value instanceof Function) ? value() : value;
   }

   
   // DragNDrop utilities
   function mouseDownHandler(element) {
      return function(evt) {
         document.body._dragedElement = element;
         element._dragged = true;
         element._dX = element._initX - evt.clientX;
         element._dY = element._initY - evt.clientY;
         sendToFront(element);
      };
   }

   function mouseMoveHandler(evt) {
      var element = document.body._dragedElement;
      if (element && element._dragged) {
         dx = evt.clientX + element._dX;
         dy = evt.clientY + element._dY;
         moveElement(element, dx, dy);
         // element.setAttributeNS(null, "transform", "translate(" + dx + "," + dy + ")");
      }
   }

   function mouseUpHandler(evt) {
      var element = document.body._dragedElement;
      element._dragged = false;
      element._initX = evt.clientX + element._dX;
      element._initY = evt.clientY + element._dY;
   }

   function sendToFront(element) {
      var parent = element.parentNode;
      // parent.removeChild(element);
      parent.insertBefore(element, parent.firstChildElement);
   }

   function moveElement(element, dx, dy) {
      var transform = element.getAttributeNS(null, "transform")
      var translate = transform.match(/translate\(\s*\d*\s*,\s*\d*\s*\)/);
      // Searching for "translate(number,number)"
      if (translate && translate[0].length) {
         var i = transform.indexOf(translate[0]);
         var result = transform.substr(0, i);
         result += transform.substr(i + translate[0].length, transform.length);
         result += "translate("+dx+","+dy+")" 
      }   
      element.setAttributeNS(null, "transform", result);  
   }
}();