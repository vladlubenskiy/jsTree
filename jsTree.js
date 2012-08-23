var jsTreeNS = new function() {
   this.Tree = function (nodeValue, trees) {
      // It's surrounded by try-catch to prevent crash of tree when any of subtree crashes.
      try {
         trees = getValue(trees);
         if (this.validateChildren(trees)) {
            this.children = trees;
         } else {
            throw "Wrong type of subtree";
         }
      } catch (error) {
         console.log("Error while processing children of " + nodeValue);
      }
      this.nodeValue = nodeValue;
   }
   // Candidate to make it static
   this.Tree.prototype.validateChildren = function(trees) {
      if (!trees) return true;
      for (var i = 0; i < trees.length; i++) {
         if (!(trees[i] instanceof jsTreeNS.Tree))
            return false;
      }
      return true;
   }

   this.Tree.prototype.isLeaf = function() {
      return !(this.children);
   }

   // I try to make it more functional.
   // Every input data can be both value and function.
   function getValue(value) {
      return (value instanceof Function) ? value() : value;
   }
}()