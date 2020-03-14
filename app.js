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
        type: document.querySelector(DOMstrings.inputType).value, //exp,inc
        description: document.querySelector(DOMstrings.inputDescription).value,
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
  //private function
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private data
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
  return {
    addItem: function(type, desc, val) {
      var item, id;
      //identification
      if (data.items[type].length === 0) {
        id = 1;
      } else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      //income uu expense iig medeed items ruu push hiih
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
    },
    seeData: function() {
      return data;
    }
  };
})();

//connector controller
var appController = (function(uiController, finianceController) {
  var ctrlAddItem = function() {
    //1.oruulsan ugugduliig delgetsees avah
    var input = uiController.getInput();
    //2.Olj avsan ugugduluu sanhuugiin controllert damjuulj tend hadgalna
    finianceController.addItem(input.type, input.description, input.value);
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
