Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
  // return this.filter(function(i) {return a.indexOf(i) >= 0;});
};

console.log([1,2,3,4,5,6].diff( [3,4,5] ))
console.log(["test1", "test2","test3","test4","test5","test6"].diff(["test1","test2","test3","test4"]))
