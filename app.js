//user controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addbtn: ".add__btn",
    incomeList: ".income__list",
    expensesList: ".expenses__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp,inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      //convert List to array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });
      //cursor bairluulah
      fieldsArr[0].focus();
      // for (i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },
    getDOMstring: function() {
      return DOMstrings;
    },
    addListItem: function(item, type) {
      //Income Expense iin elemtiig aguulsan HTML iig beltgen
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">+%Value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i> </button></div></div></div>';
      } else {
        list = DOMstrings.expensesList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">-%Value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i> </button></div></div></div>';
      }
      //Ter HTML dotroo orlogo zarlagiin utgiig replace ashiglaj uurchilj ugnu
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("%Value%", item.value);

      //Beltegsen HTML ee DOM ruu Hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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
    },
    tusuv: 0,
    huvi: 0
  };
  return {
    tusuvTootsooloh: function() {
      //niit orlogiin nilber tootsooloh
      calculateTotal("inc");
      calculateTotal("exp");
      //Tusuw tootsooloh
      data.tusuv = data.totals.inc - data.totals.exp;
      //Orlog zarlagiin huwiig tootsoolon
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusuviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        toalExp: data.totals.exp
      };
    },
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
      return item;
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
    if (input.description !== "" && input.value !== "") {
      //2.Olj avsan ugugduluu sanhuugiin controllert damjuulj tend hadgalna
      var item = finianceController.addItem(
        input.type,
        input.description,
        input.value
      );
      //3.Olj avsan ugugduluu web deeree ali tohirohod ni haruulna
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      //4.Tusuwiig tootsoolno
      finianceController.tusuvTootsooloh();
      //5.Etssiin uldegdel,
      var tusuv = finianceController.tusuviigAvah();

      //Tootsoog delgetsend gargana.
      console.log(tusuv);
    }
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
