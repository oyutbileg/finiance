//user controller
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addbtn: ".add__btn",
    incomeList: ".income__list",
    expensesList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLable: ".budget__expenses--value",
    percentageLable: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  var nodeListForeach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  var formatMoney = function(too, type) {
    too = "" + too;
    var x = too
      .split("")
      .reverse()
      .join("");

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    var z = y
      .split("")
      .reverse()
      .join("");

    if (z[0] === ",") z = z.substr(1, z.length - 1);
    if (type === "inc") z = "+ " + z;
    else z = "- " + z;
    return z;
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp,inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    changeType: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputType +
          ", " +
          DOMstrings.inputDescription +
          ", " +
          DOMstrings.inputValue
      );
      nodeListForeach(fields, function(el) {
        el.classList.toggle("red-focus");
      });
      document.querySelector(DOMstrings.addbtn).classList.toggle("red");
    },
    displayDate: function() {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() +
        "-ийн " +
        unuudur.getMonth() +
        " сарийн өрхийн санхүү";
    },
    displayPercentages: function(allPersentages) {
      //Zarlagiin Nodelist iig oloh
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      //Element bolgonii huwid zarlagiin % iig massive aas avch shivj oruulah
      nodeListForeach(elements, function(el, index) {
        el.textContent = allPersentages[index];
      });
    },
    getDOMstring: function() {
      return DOMstrings;
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
    deleteListItem: function(id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    tusuviigzUzuuleh: function(tusuv) {
      var type;

      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMstrings.expenseLable).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentageLable).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentageLable).textContent =
          tusuv.huvi;
      }
    },
    addListItem: function(item, type) {
      //Income Expense iin elemtiig aguulsan HTML iig beltgen
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%Value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i> </button></div></div></div>';
      } else {
        list = DOMstrings.expensesList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%Value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i> </button></div></div></div>';
      }
      //Ter HTML dotroo orlogo zarlagiin utgiig replace ashiglaj uurchilj ugnu
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("%Value%", formatMoney(item.value, type));

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
  var Expense = function(id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    }
  };
  Expense.prototype.getPercentage = function() {
    return this.percentage;
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
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      }
    },
    calculatePercentages: function() {
      data.items.exp.forEach(function(el) {
        el.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function() {
      var allPersentages = data.items.exp.map(function(el) {
        return el.getPercentage();
      });
      return allPersentages;
    },

    tusuviigAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });
      var index = ids.indexOf(id);
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
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
      //Tusuv shinchleh
      updateTusuv();
    }
  };
  var updateTusuv = function() {
    //4.Tusuwiig tootsoolno
    finianceController.tusuvTootsooloh();
    //5.Etssiin uldegdel,
    var tusuv = finianceController.tusuviigAvah();

    //Tootsoog delgetsend gargana.
    uiController.tusuviigzUzuuleh(tusuv);
    //huwiig tootsoolon
    finianceController.calculatePercentages();
    //Element uudiin % iig huleen avna
    var allPersentages = finianceController.getPercentages();
    //Edgeer % iig delgetsend gargan
    uiController.displayPercentages(allPersentages);
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
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiController.changeType);
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          //Sanhuugiin modulaas type,id ashiglaad ustgan
          finianceController.deleteItem(type, itemId);
          //delgets deerees element iig ustgan
          uiController.deleteListItem(id);
          //uldegdel tootsoog shinchilj haruulna
          //Tusuv shinchleh
          updateTusuv();
        }
      });
  };
  return {
    init: function() {
      console.log("Application started...");
      uiController.displayDate();
      uiController.tusuviigzUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0
      });
      setupEventListeners();
    }
  };
})(uiController, finianceController);
//Application started
appController.init();
