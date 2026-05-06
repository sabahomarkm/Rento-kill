/***************************************************

*Licensed Materials - Property of HCL.

*(c)Copyright HCL America, Inc. 2023

****************************************************/


function hasKey2(arr, key) {
  let index = -1;
  for (let x of arr) {
    if (x[key] != undefined) {
      index = x;
      break;
    }
  }
  return index;
}

function formatTabulatorArr(arr) {

  const obArr = [];

  arr.map((x) => {

    const values = Object.values(x);

    if (values[0]._children) {
      values[0]._children = formatTabulatorArr(values[0]._children);
    }

    obArr.push(values[0]);
  });

  return obArr;
}

// extract keys that has a value of array in data records
function extractKeyValueWithArray(records) {
  let recordTrims = records.slice(0, 10);
  let allKeysWithArr = [];

  recordTrims.forEach((test, i) => {
    const allKey = Object.keys(test);
    Object.values(test).forEach((val, x) => {
      const testArray = isArrayToBullet(val);
      if (testArray) {
        if (!allKeysWithArr.includes(allKey[x])) {
          allKeysWithArr.push(allKey[x]);
        }
      }
    });
  });

  return JSON.stringify(allKeysWithArr);
}

function isArrayToBullet(output) {
  try {
    const items = JSON.parse(output);

    if (typeof items != 'object') {
      // empty multivalue
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

function formatIndexIntoTabulatorArray(arr) {
  let output = [];
  for (let element of arr) {
    const refno = element.x_0040index;
    const refArr = element.x_0040index.split(".");
    let tempArr = output;

    let markSection = "";
    for (let ref of refArr) {
      markSection = markSection + ref;
      let ind = hasKey2(tempArr, ref);
      if (ind != -1) {
        tempArr = ind[ref]._children;

      } else {
        element._children = [];
        tempArr.push({
          [ref]: element
        });

        tempArr = tempArr[tempArr.length - 1][ref]._children;
      }
      markSection = markSection + ".";
    }


  }

  const formatArrObj = formatTabulatorArr(output);
  return formatArrObj;
}

function getGroupByColumnByMetadata(paramsInfo) {

  if (paramsInfo && paramsInfo.length) {
    var allTwistiesTrue = paramsInfo.map(col => {
      // check if twisties is true and not a response column
      if (col.metadata && col.metadata.twisties && !col.metadata.responsesonly) {
        return {
          name: col.metadata.title ? col.metadata.title : col.name,
          position: col.metadata.position,
          sort: col.metadata.sort ? col.metadata.sort : col.metadata.sorted ? col.metadata.sorted : false,
        }
      }

    });
    var removeUndefined = allTwistiesTrue ? allTwistiesTrue.filter(item => item !== undefined) : null;
    var sortColumn = removeUndefined ? removeUndefined.sort((pos1, pos2) => pos1.position - pos2.position) : [];
    return sortColumn && sortColumn[0] ? sortColumn[0].name : "";

  }
}

function getColumns(paramsInfo) {
  if (paramsInfo && paramsInfo.length) {
    var allTwistiesTrue = paramsInfo.map(col => {
      // var excludeCol = ['x_0040index', 'x_0040unid', 'x_0040form'];

      const sort = col.metadata && col.metadata.sort ? col.metadata.sort : col.metadata && col.metadata.sorted && col.metadata.sorted === "true" ? true : false;
      const sortDirection = col.metadata && col.metadata.sort ? col.metadata.sort : col.metadata && col.metadata.direction ? col.metadata.direction : null;
      const sortStartingDir = sortDirection ? sortDirection === 'ascending' ? 'asc' : 'desc' : null;

      return {
        title: col.metadata && col.metadata.columnTitle ? col.metadata.columnTitle.includes('x_00') ? '' : col.metadata && col.metadata.columnTitle : col.metadata && col.metadata.title ? col.metadata.title : col.name,
        field: col.name,
        position: col.metadata && col.metadata.position ? col.metadata.position : -1,
        headerSort: sort,
        headerSortStartingDir: sortStartingDir,
        visible:  col.metadata && col.metadata.position > -1 ? true : false //col.name && !col.name.includes('x_00') ? true : false
      }
    });
    var removeUndefined = allTwistiesTrue ? allTwistiesTrue.filter(item => item !== undefined) : null;
    var sortColumn = removeUndefined ? removeUndefined.sort((pos1, pos2) => pos1.position - pos2.position) : [];

    // remove invalid column config
    sortColumn.map(v => {
      delete v.position

      if (!v.headerSortStartingDir) {
        delete v.headerSortStartingDir
      }
    });
    return sortColumn;

  }
}

function formatObjectModelName(objectname) {
  if (!objectname.length) {
    return false;
  }
  var newObjName = objectname.replace(/[^a-zA-Z0-9]/g, '');
  return newObjName;
}

function formatObjectModelNameDelete(objectname) {

  if (!objectname.length) {
    return false;
  }
  // replace all spaces
  objectname = objectname.replace(/ /g, '');

  function firstLetter(str) {
    var latestStr = str;
    while (!/^[A-Za-z]*$/.test(latestStr[0])) {
      latestStr = latestStr.substring(1);
    }
    return latestStr;
  }

  function removeSpecialChar(str) {
    var charCodeArr = [];
    for (let i of str) {
      if (i && /^[A-Za-z0-9_]*$/.test(i)) {
        charCodeArr.push(i);
      } else {
        charCodeArr.push('_');
      }

    }
    return charCodeArr.join('');
  }
  var checkLetter = firstLetter(objectname);
  var rmSpecialchar = removeSpecialChar(checkLetter);

  if (rmSpecialchar.length >= 50) {
    return rmSpecialchar.substring(0, 50)
  } else {
    return rmSpecialchar;
  }
}


function editRowDominoView(rowdata, objService) {
  var intServScope = objService ? objService.split("_") : [];

  if ((intServScope && intServScope.length != 2) || !rowdata.x_0040form) {
    voltmx.ui.Alert(
      {
        alertType: constants.ALERT_TYPE_ERROR,
        message: "Missing parameters: object name or form name"
      },
      {
        iconPosition: constants.ALERT_ICON_POSITION_LEFT
      }
    );
  } else {
    voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var integrationSvc;
    try {
      integrationSvc = voltmx.sdk.getCurrentInstance().getIntegrationService(intServScope[0]);
    } catch (e) {
      voltmx.application.dismissLoadingScreen();
      voltmx.ui.Alert(
        {
          alertType: constants.ALERT_TYPE_ERROR,
          message: e.message
        },
        {
          iconPosition: constants.ALERT_ICON_POSITION_LEFT
        }
      );
    }
    var params = {
      DESIGNNAME: rowdata.x_0040form,
      SCOPE: intServScope[1]
    };

    integrationSvc.invokeOperation(
      'getDesignFormByName',
      {},
      params,
      function (response) {
        voltmx.application.dismissLoadingScreen();
        if (response && response.httpStatusCode === 200) {
          try {
            var form = formatObjectModelName(response['@name']);
            var formName = "frm" + form + "Details";
            var isFormExist = voltmx.mvc.registry.getControllerName(formName);

            // use x_0040form as form name for renamed domino form in DRAPI
            var formx0040 = formatObjectModelName(rowdata.x_0040form);
            var formNamex0040 = "frm" + formx0040 + "Details";
            var isFormExistx0040 = voltmx.mvc.registry.getControllerName(formNamex0040);
            
            if (isFormExist) {
              var ntf = new voltmx.mvc.Navigation(formName);
              var myObj = { dominoviewunid: rowdata.x_0040unid };
              ntf.navigate(myObj);
            } else if (isFormExistx0040) {
              var ntf = new voltmx.mvc.Navigation(formNamex0040);
              var myObj = { dominoviewunid: rowdata.x_0040unid };
              ntf.navigate(myObj);
            } else {
              voltmx.ui.Alert(
                {
                  alertType: constants.ALERT_TYPE_ERROR,
                  message: "Form Mismatch Error:  No form with friendly name " + formName + " is found in registry"
                },
                {
                  iconPosition: constants.ALERT_ICON_POSITION_LEFT
                }
              );
            }
          } catch(e) {
            console.log(e);
            alert(e);
          }
        } else if (response.message || response.errmsg) {
          console.log(response);
          let errorMsg = response.message ? response.message : response.errmsg;
          alert(errorMsg);
        } else {
          console.log(response);
          try {
            alert(JSON.stringify(response));
          } catch (e) {
            alert("Something went wrong. Please try again later.");
          }
        }
      },
      function (error) {
        voltmx.application.dismissLoadingScreen();
        console.log(error);
        voltmx.ui.Alert(
          {
            alertType: constants.ALERT_TYPE_ERROR,
            message: "Failed to extract form name: " + error.errmsg
          },
          {
            iconPosition: constants.ALERT_ICON_POSITION_LEFT
          }
        );
      }
    );
  }

}

function deleteRowDominoView(rowdata, objService, formGrid) {
  var intServScope = objService ? objService.split("_") : [];

  var unidlbl = rowdata.x_0040unid;
  var formlbl = rowdata.x_0040form;
  var formDataObject;

  // Object name must contain only alpha-numeric characters or '_', must begin with a letter and must be between 1 and 50 characters long.

  if ((intServScope && intServScope.length != 2) || !formlbl || !unidlbl) {
    voltmx.ui.Alert(
      {
        alertType: constants.ALERT_TYPE_ERROR,
        message: "Missing parameters: object name, form name or unid"
      },
      {
        iconPosition: constants.ALERT_ICON_POSITION_LEFT
      }
    );
    return;
  }

  voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
  var integrationSvc;

  try {
    integrationSvc = voltmx.sdk.getCurrentInstance().getIntegrationService(intServScope[0]);
  } catch (e) {
    voltmx.application.dismissLoadingScreen();
    console.log(e);
    voltmx.ui.Alert(
      {
        alertType: constants.ALERT_TYPE_ERROR,
        message: e.message
      },
      {
        iconPosition: constants.ALERT_ICON_POSITION_LEFT
      }
    );
    return;
  }

  var params = {
    DESIGNNAME: rowdata.x_0040form,
    SCOPE: intServScope[1]
  };

  integrationSvc.invokeOperation(
    'getDesignFormByName',
    {},
    params,
    function (response) {
      voltmx.application.dismissLoadingScreen();
      if (response && response.httpStatusCode === 200) {
        try {
          if (response && response['@name']) {
            formDataObject = formatObjectModelNameDelete(response['@name']);
            processDeletion();
          } else {
            voltmx.application.dismissLoadingScreen();
            voltmx.ui.Alert(
              {
                alertType: constants.ALERT_TYPE_ERROR,
                message: "Missing response @name from get design api"
              },
              {
                iconPosition: constants.ALERT_ICON_POSITION_LEFT
              }
            );
          }
        } catch(e) {
          console.log(e);
          alert(e);
        }
      } else if (response.message || response.errmsg) {
        console.log(response);
        let errorMsg = response.message ? response.message : response.errmsg;
        alert(errorMsg);
      } else {
        console.log(response);
        try {
          alert(JSON.stringify(response));
        } catch (e) {
          alert("Something went wrong. Please try again later.");
        }
      }
  

    },
    function (error) {
      voltmx.application.dismissLoadingScreen();
      voltmx.ui.Alert(
        {
          alertType: constants.ALERT_TYPE_ERROR,
          message: "Failed to extract form name: " + error.errmsg
        },
        {
          iconPosition: constants.ALERT_ICON_POSITION_LEFT
        }
      );
    }
  );

  function deletAlertHandlerTrue() {
    voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var objSvc = voltmx.sdk.getCurrentInstance().getObjectService(`${objService}`);

    if (!formDataObject) {
      voltmx.application.dismissLoadingScreen();
      voltmx.ui.Alert({
        "alertType": constants.ALERT_TYPE_ERROR,
        "message": "Missing object service: " + formDataObject,
      }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
      });
    }

    var dataObject = new kony.sdk.dto.DataObject(formDataObject);

    dataObject.addField("x_0040unid", rowdata.x_0040unid);
    var options = {
      "dataObject": dataObject
    };

    objSvc.deleteRecord(options, (res) => {
      voltmx.application.dismissLoadingScreen();
      voltmx.print("Record deleted!");
      voltmx.ui.Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "message": "Record deleted!",
      }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
      });

      var ntf = new voltmx.mvc.Navigation(`${formGrid}`);
      ntf.navigate();
    }, (err) => {
      voltmx.print("Error in record delete!" + err.errmsg);
      voltmx.application.dismissLoadingScreen();
      voltmx.ui.Alert({
        "alertType": constants.ALERT_TYPE_ERROR,
        "message": "Error in record delete! " + err.errmsg,
      }, {
        "iconPosition": constants.ALERT_ICON_POSITION_LEFT
      });
    });
  }

  function deletAlertHandler(callback) {
    if (callback) {
      deletAlertHandlerTrue();
    }
  }

  function processDeletion() {
    voltmx.ui.Alert({
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "message": "Are you sure you want to delete item?",
      "yesLabel": "Yes",
      "noLabel": "No",
      "alertHandler": deletAlertHandler
    }, {
      "iconPosition": constants.ALERT_ICON_POSITION_LEFT
    });
  }


}