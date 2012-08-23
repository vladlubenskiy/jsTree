var jsTreeNS = new function() {
   this.Tree = function (nodeValue, trees) { // make posssible to take Function and Tree parameters
      if (this.validateChildren(trees)) {
         this.children = trees;    
      // todo: It's need to reduce tree's list if it has null references.
      } else {
         throw "Wrong type of subtree";
      }   
      this.nodeValue = nodeValue;
   }
   // Candidate to make it static
   this.Tree.prototype.validateChildren = function(trees) {
      if (!trees) return true;
      for (var i = 0; i < trees.length; i++) {
         if (!(trees[i] instanceof jsTreeNS.Tree) && trees[i] !== null) 
            return false;
      } 
      return true;
   }

   this.Tree.prototype.isLeaf = function() {
      return !(this.children);
   }
}()