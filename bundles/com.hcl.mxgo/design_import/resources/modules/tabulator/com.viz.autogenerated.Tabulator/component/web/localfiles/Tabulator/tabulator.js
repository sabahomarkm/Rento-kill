/***************************************************

*Licensed Materials - Property of HCL.

*(c)Copyright HCL America, Inc. 2023

****************************************************/


function initTabulator(rowData, finalCol, objService, viewGrid, showResponseHierarchy, groupByCol, fieldWithArray) {
  var enableDataTree = showResponseHierarchy ? showResponseHierarchy : false;
  var groupByKey = groupByCol ? groupByCol : false;

  var tabulator = new Tabulator("#tabulator-table", {
    data: rowData,
    columns: finalCol,
    dataTree: enableDataTree,
    responsiveLayout:"collapse", 
    layout:"fitDataFill",
    dataTreeStartExpanded: true,
    rowClickMenu: [
      {
        label: "Edit",
        action: function (e, row) {
          var rowdata = row.getData();

          editRow(rowdata, objService);
        }
      },
      {
        label: "Delete",
        action: function (e, row) {
          var rowdata = row.getData();

          deleteRow(rowdata, objService, viewGrid);

        }
      }
    ]
  });

  tabulator.on("tableBuilt", function () {
    if (groupByKey) {
      tabulator.setGroupBy(groupByKey);
    }


    formatFieldArrayToBulletList(tabulator, fieldWithArray);
    setFilterColumnOptions(finalCol);
    addFilter(tabulator);
  });
}

function setFilterColumnOptions(finalCol) {
  var colArray = finalCol.filter(item => item.visible);
  var selectElem = document.getElementById('filter-field');
  colArray.map(col => {
    var op = new Option(col.title, col.field)
    selectElem.add(op);
  });
}

function formatFieldArrayToBulletList(table, fieldarr) {
  // set field array to bulletlist 
  var fieldArr = JSON.parse(fieldarr);

  if (fieldArr && fieldArr.length) {
    fieldArr.forEach(itm => {
      table.updateColumnDefinition(itm, {
        formatter: function (cell, formatterParams, onRendered) {
          const arr = toBulletListIfArray(cell.getValue());

          return arr; //return the contents of the cell;
        }
      })
    })
  }
}

function isNativePlatform() {
  if (navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)) {
     return true ;
  } else {
     return false ;
  }
}

function toBulletListIfArray(output) {

  if (!output) {
    return ''
  }

  try {
    const arr = [];
    const items = JSON.parse(output);
    
    if (items && items.length) {
      items.forEach(function (element) {
        arr.push("<li style='margin-left: 13px'>" + element + "</li>");
      });

      if (arr && arr.length) {
        arr.unshift("<ul style='max-height: 150px;overflow-y: auto;display: block;overflow-x: hidden;list-style: disc;'>");
        arr.push("</ul>");

        output = arr.join('');
      }
    } else {
      return ''
    }

  } catch (e) {
    console.log(e);
  }
  
  return output;
}

function addFilter(table) {
  //Define variables for input elements
  var fieldEl = document.getElementById("filter-field");
  var valueEl = document.getElementById("filter-value");


  //Trigger setFilter function with correct parameters
  function updateFilter() {
    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;

    if (filterVal) {
      table.setFilter(filterVal, "like", valueEl.value);
    }
  }

  //Update filters on value change
  document.getElementById("filter-field").addEventListener("change", updateFilter);
  document.getElementById("filter-value").addEventListener("keyup", updateFilter);

  //Clear filters on "Clear Filters" button click
  document.getElementById("filter-clear").addEventListener("click", function () {
    fieldEl.value = "";
    valueEl.value = "";

    table.clearFilter();
  });
}


function editRow(rowdata, objService) {
  var rowDataStr = JSON.stringify(rowdata);
  var isNative = isNativePlatform();

  // calling it from TabulatorModule.js
  if (isNative) {
    var arr = [rowdata, objService];
    voltmx.evaluateJavaScriptInNativeContext("editRowDominoView", JSON.stringify(arr));
  } else {
    voltmx.evaluateJavaScriptInNativeContext(`this.editRowDominoView(${rowDataStr}, '${objService}')`);
  }
}

function deleteRow(rowdata, objService, formGrid) {
  var rowDataStr = JSON.stringify(rowdata);
  var isNative = isNativePlatform();
  
   // calling it from TabulatorModule.js
  if (isNative) {
    var arr = [rowdata, objService, formGrid];
    voltmx.evaluateJavaScriptInNativeContext("deleteRowDominoView", JSON.stringify(arr));
  } else {
    voltmx.evaluateJavaScriptInNativeContext(`this.deleteRowDominoView(${rowDataStr}, '${objService}', '${formGrid}')`);
  }
}