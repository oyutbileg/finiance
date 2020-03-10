//user controller
var uiController = (function() {})();

//finiance controller
var finianceController = (function() {})();

//connector controller
var appController = (function(uiController, finianceController) {
  var ctrlAddItem = function() {
    //1.oruulsan ugugduliig delgetsees avah
    console.log("Delgetsees medeelel avah");
    //2.Olj avsan ugugduluu sanhuugiin controllert damjuulj tend hadgalna
    //3.Olj avsan ugugduluu web deeree ali tohirohod ni haruulna
    //4.Tusuwiig tootsoolno
    //5.Etssiin uldegdel, Tootsoog delgetsend gargana.
  };
  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, finianceController);
