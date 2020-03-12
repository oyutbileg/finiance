//user controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addbtn: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        describtion: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstring: function() {
      return DOMstrings;
    }
  };
})();

//finiance controller
var finianceController = (function() {
  var Income = function(id, description, value) {
    this.id = "id";
    this.description = "description";
    this.value = "value";
  };
  var Expense = function(id, description, value) {
    this.id = "id";
    this.description = "description";
    this.value = "value";
  };

  var data = {
    allItems: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
})();

//connector controller
var appController = (function(uiController, finianceController) {
  var ctrlAddItem = function() {
    //1.oruulsan ugugduliig delgetsees avah
    console.log(uiController.getInput());
    //2.Olj avsan ugugduluu sanhuugiin controllert damjuulj tend hadgalna
    //3.Olj avsan ugugduluu web deeree ali tohirohod ni haruulna
    //4.Tusuwiig tootsoolno
    //5.Etssiin uldegdel, Tootsoog delgetsend gargana.
  };
  var setupEventListeners = function() {
    //css class uudiin hayaguud
    var DOM = uiController.getDOMstring();
    document.querySelector(DOM.addbtn).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function() {
      console.log("Application started...");
      setupEventListeners();
    }
  };
})(uiController, finianceController);
//Application started
appController.init();
