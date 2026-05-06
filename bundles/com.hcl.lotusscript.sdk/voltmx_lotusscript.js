/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 593:
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else // removed by dead control flow
{}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 627:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_517__) => {

"use strict";
__nested_webpack_require_517__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_517__.d(__nested_webpack_exports__, {
/* harmony export */   categories: () => (/* binding */ categories)
/* harmony export */ });
/***************************************************
 * Licensed Materials - Property of HCL
 * (c)Copyright HCL America, Inc. 2023
 ***************************************************/

const categories = [
  { 'Database': __nested_webpack_require_517__(279) },
  { 'LSCStr': __nested_webpack_require_517__(459) },
  { 'NotesDocument': __nested_webpack_require_517__(564) },
  { 'NotesItem': __nested_webpack_require_517__(146) },
  { 'NotesSession': __nested_webpack_require_517__(249) },
  { 'NotesUIDatabase': __nested_webpack_require_517__(362) },
  { 'UIDocument': __nested_webpack_require_517__(385) },
  { 'UIWorkspace': __nested_webpack_require_517__(191) },
  { 'util': __nested_webpack_require_517__(26) },
  { 'Variant': __nested_webpack_require_517__(257) },
  { 'NotesUIView': __nested_webpack_require_517__(134) },
  { 'NotesView': __nested_webpack_require_517__(408) },
  { 'NotesViewEntry': __nested_webpack_require_517__(502) },
  { 'NotesContext': __nested_webpack_require_517__(734) },
  { 'NotesAgent': __nested_webpack_require_517__(772) },
  { 'NotesDocumentCollection': __nested_webpack_require_517__(628) },
];

// exports = categories;

/***/ }),

/***/ 547:
/***/ ((module, __unused_webpack_exports, __nested_webpack_require_1812__) => {

/***************************************************
*Licensed Materials - Property of HCL.
*(c)Copyright HCL America, Inc. 2023
****************************************************/

const { categories } = __nested_webpack_require_1812__(627);

// iterate through the srcObj props
// if type of prop is an object, create new layer in exports object with prop key and call self recursively; else
// else, set exports object to the value of the src object property (eg. the exported function)
const exportObj = (srcObj, exportsObj) => {
  for (const [key, value] of Object.entries(srcObj)) {
    if (typeof srcObj[key] === "object") {
	  if (srcObj[key][key]) {
		  exportsObj[key] = srcObj[key][key];
	  } else {
		  exportsObj[key] = exportsObj[key] || {};
		  exportObj(srcObj[key], exportsObj[key]);
	  }
    } else {
      exportsObj[key] = value;
    }
  }
}

// given a category list of API objects, return a flat index array made up of all the objects in each category
// const getFlattenedAPIlist = cats => {
//   var list = [];
//   cats.forEach(cat => { for (const [key, value] of Object.entries(cat)) list.push(cat[key]); });
//   return list;
// }

class Lotusscript {
  constructor() {
    this.ACTIONCD = 16;
    this.ASSISTANTINFO = 17;
    this.ATTACHMENT = 1084;
    this.AUTHORS = 1076;
    this.COLLATION = 2;
    this.DATETIMES = 1024;
    this.EMBEDDEDOBJECT = 1090;
    this.ERRORITEM = 256;
    this.FORMULA = 1536;
    this.HTML = 21;
    this.ICON = 6;
    this.LSOBJECT = 20;
    this.MIME_PART = 25;
    this.NAMES = 1074;
    this.NOTELINKS = 7;
    this.NOTEREFS = 4;
    this.NUMBERS = 768;
    this.OTHEROBJECT = 1085;
    this.QUERYCD = 15;
    this.READERS = 1075;
    this.RFC822Text = 1282;
    
    this.RICHTEXT = 1;
    this.SIGNATURE = 8;
    this.TEXT = 1280;
    this.UNAVAILABLE = 512;
    this.UNKNOWN = 0;
    this.USERDATA = 14;
    this.USERID = 1792;
    this.VIEWMAPDATA = 18;
    this.VIEWMAPLAYOUT = 19;
    categories.forEach(cat => exportObj(cat, this));
    // getFlattenedAPIlist(categories).forEach(cat => exportObj(cat, this));

    // this.build = this.API.build;
    // this.version = this.API.version;

  }
}

module.exports = new Lotusscript();


/***/ }),

/***/ 279:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_4110__) => {

"use strict";
__nested_webpack_require_4110__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_4110__.d(__nested_webpack_exports__, {
/* harmony export */   Database: () => (/* binding */ Database)
/* harmony export */ });
/* harmony import */ var _NotesDocument__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_4110__(564);
/* harmony import */ var _NotesAgent__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_4110__(772);
/* harmony import */ var _NotesItem__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_4110__(146);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_4110__(26);

/***************************************************
*Licensed Materials - Property of HCL.
*(c)Copyright HCL America, Inc. 2023
****************************************************/





const Database = function() {
    // Properties
    //   AllDocuments
    //   Parent
    //   Title
    // Methods
    //   CreateDocument
    //   GetDocumentByID
    //   GetDocumentByUNID
    //   Open
    //   Remove

    this.agents = null;
//     this.GetDocumentByID = function (notesID) {
//         if (!notesID) {
//             return null;
//         }
//         this.currentForm = voltmx.application.getCurrentForm();
//         var dataDocument = new NotesDocument();
//         dataDocument.replaceItemValue("Form", this.currentForm.id);
//         this.currentDocument = new UIDocument(this.currentForm, dataDocument);
//         this.currentForm.currentDocument = this.currentDocument;

//         var Document_inputparam = {};
//         //Document_inputparam["serviceID"] = "TestObj$Document$create";
//         Document_inputparam["options"] = {
//             "access": "online",
//             "CRUD_TYPE": "get"
//         };
//         Document_inputparam["options"]["odataurl"] = `$filter=x_0040unid eq '${notesID}'`;//`$notesid=${notesID}`;965CC17829E4EE3448258965000F5B56
//         var Document_httpheaders = {};
//         Document_inputparam["httpheaders"] = Document_httpheaders;
//         var Document_httpconfigs = {};
//         Document_inputparam["httpconfig"] = Document_httpconfigs;
//         mfobjectsecureinvokerasync(Document_inputparam, VOLTMX_SCRIPT_OBJ_SERVICE_NAME, "NewCustomer");//this.currentForm.id.slice(3,-6));
//     };

    function processIntegrationReq(serviceName, apiName, reqParams) {
        return new Promise((resolve, reject) => {
            const inteService = VMXFoundry.getIntegrationService(serviceName);
            inteService.invokeOperation(
                apiName,
                {},
                reqParams,
                resp => resolve(resp),
                error => reject(error)
            );
        });
    }
    
    function processObjectReq(serviceName, apiName, reqParams) {
        return new Promise((resolve) => {
            mfobjectsecureinvokerasync(reqParams, serviceName, apiName, 
              resp => resolve(resp));
        });
    }

    async function fetchDocumentByID(unid, dataDocument) {
        const reqParams = {
          UNID: unid,
          SCOPE: _util__WEBPACK_IMPORTED_MODULE_1__.util.getScopeName()
        };
        const resp = await processIntegrationReq(_util__WEBPACK_IMPORTED_MODULE_1__.util.getIntegrationServiceName(), "getSingleDocument", reqParams);
        if(resp.httpStatusCode === 200 && resp.opstatus === 0) {
            dataDocument.rawData = resp.responseList;
            const attributes = Object.keys(resp.responseList)
              .filter((key) => !key.includes("@"))
              .reduce((obj, key) => {
                  return Object.assign(obj, {
                    [key]: resp.responseList[key]
                  });
              }, {});
            console.log(attributes);
            for (const key in attributes) {
              if (attributes.hasOwnProperty(key)) {
                const value = attributes[key];
                const item = new _NotesItem__WEBPACK_IMPORTED_MODULE_2__.NotesItem(dataDocument, key, value);
                dataDocument.data[key] = item;
              }
            }
        }
    }

    //TODO change lower-case start character name
    this.getDocumentByID = async function(unid) {
        if (!unid) {
            return null;
        }

        let dataDocument = new _NotesDocument__WEBPACK_IMPORTED_MODULE_3__.NotesDocument();
        await fetchDocumentByID(unid, dataDocument);
        return dataDocument;
    };
    
    this.getAgents = function() {
      if (this.agents === null) {
        this.agents = [];
        let agentNames = Object.keys(_util__WEBPACK_IMPORTED_MODULE_1__.util.getAgentsObject());
        for( const agentName of agentNames ) {
          this.agents.push(new _NotesAgent__WEBPACK_IMPORTED_MODULE_0__.NotesAgent(agentName));
        }
      }
      return this.agents;
    };
    
    this.getAgent = function(name) {
      for (const agent of this.getAgents()) {
        if(name === agent.getName()) {
          return agent;
        }
      }
      return null;
    };
};

/***/ }),

/***/ 459:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_9192__) => {

"use strict";
__nested_webpack_require_9192__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_9192__.d(__nested_webpack_exports__, {
/* harmony export */   LSCStr: () => (/* binding */ LSCStr)
/* harmony export */ });
const LSCStr = function(value) {
    return String(value);
};

/***/ }),

/***/ 772:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_9567__) => {

"use strict";
__nested_webpack_require_9567__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_9567__.d(__nested_webpack_exports__, {
/* harmony export */   NotesAgent: () => (/* binding */ NotesAgent)
/* harmony export */ });
/* harmony import */ var _NotesContext__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_9567__(734);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_9567__(26);



const NotesAgent = function(name) {
    // Properties
    //   Name
    //   Owner
    //   ParameterDocID
    //   Parent
    // Methods
    //   Run
    //   Remove
    //   Save
    this.name = name;

    this.run = function(notesId) {
        _NotesContext__WEBPACK_IMPORTED_MODULE_0__.NotesContext.currentAgent = this;
        this.parameterDocID = notesId;
        var agentFun = _util__WEBPACK_IMPORTED_MODULE_1__.util.getAgentFunction(this.name);
        return agentFun();
    };
    
    this.getParameterDocID = function() {
      return this.parameterDocID;
    };
    
    this.getName = function() {
      return this.name;
    };
    
    this.getParent = function () {
      return _NotesContext__WEBPACK_IMPORTED_MODULE_0__.NotesContext.getCurrentDatabase();
    };

    const runAgentOnServer = async () => {
        const reqParams = {
          SCOPE: _util__WEBPACK_IMPORTED_MODULE_1__.util.getScopeName(),
          agentName: this.name
        };
        const resp = await _util__WEBPACK_IMPORTED_MODULE_1__.util.processIntegrationReq(_util__WEBPACK_IMPORTED_MODULE_1__.util.getIntegrationServiceName(), "runServerAgent", reqParams);
        return resp.opstatus;
        
    };

    this.runOnServer = async function () {
        _NotesContext__WEBPACK_IMPORTED_MODULE_0__.NotesContext.currentAgent = this;
        return await runAgentOnServer();
    };

};


/***/ }),

/***/ 734:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_11460__) => {

"use strict";
__nested_webpack_require_11460__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_11460__.d(__nested_webpack_exports__, {
/* harmony export */   NotesContext: () => (/* binding */ NotesContext)
/* harmony export */ });
/* harmony import */ var _Database__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_11460__(279);


var NotesContext = {
  currentAgent: null,
  currentDatabase: null,
  getCurrentDatabase: null
};

NotesContext.getCurrentDatabase = function () {
  if (!NotesContext.currentDatabase) {
    NotesContext.currentDatabase = new _Database__WEBPACK_IMPORTED_MODULE_0__.Database();
  }
  return NotesContext.currentDatabase;
};

/***/ }),

/***/ 564:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_12214__) => {

"use strict";
__nested_webpack_require_12214__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_12214__.d(__nested_webpack_exports__, {
/* harmony export */   NotesDocument: () => (/* binding */ NotesDocument)
/* harmony export */ });
/* harmony import */ var _NotesItem__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_12214__(146);


const NotesDocument = function() {
    this.Items = [];
    // Properties
    //   Authors
    //   Items
    //   IsDeleted
    //   IsNewNote
    //   IsResponse
    //   NoteID
    //   ParentDatabase
    //   ParentDocumentUNID
    //   UniversalID
    // Methods
    //   AppendItemValue
    //   CopyItem
    //   GetFirstItem
    //   GetItemValue
    //   GetRead method
    //   HasItem
    //   MarkRead
    //   MarkUnread
    //   Remove
    //   RemoveItem
    //   RemovePermanently
    //   Save
    this.data = {};
    // this.addDynamicaProperties = function(obj) {
    //     if (obj.data) {
    //         for (const dataKey in obj.data) {
    //             if (!obj.data.hasOwnProperty(dataKey)) {
    //                 return ''
    //             }
    //             Object.defineProperty(obj, dataKey, {
    //                 get() {
    //                     return this.data[dataKey];
    //                 },

    //                 set(v) {
    //                     this.data[dataKey] = v;
    //                 }
    //             })
    //         }
    //     }

    // };

    this.hasItem = function(itemName) {
        let item = this.data[itemName];
        return item === null;
    };

    this.getFirstItem = function(name) {
        let item = this.data[name];
        if (item instanceof Array) {
            return item[0];
        } else {
            return item;
        }
    };

    this.getItemValue = function(itemName) {
        let item = this.getFirstItem(itemName);
        return item.values;
    };
    // this.GetItemValue = function(itemName) {
    //     if (typeof this.data[itemName] === "string") {
    //         return [this.data[itemName]];
    //     } else if (this.data[itemName] instanceof Array) {
    //         return this.data[itemName];
    //     }
    //     return [""];
    // };

    this.removeItem = function(itemName) {
        delete this.data[itemName];
    };

    this.replaceItemValue = function(itemName, itemValue) {
        const newItem = new _NotesItem__WEBPACK_IMPORTED_MODULE_0__.NotesItem(this, itemName, itemValue);
        this.data[itemName] = newItem;
        return newItem;
    };

    this.save = async function() {
         var Document_inputparam = {};
         //Document_inputparam["serviceID"] = "TestObj$Document$create";
         Document_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "create"
         };
        var reqData = {};
         Object.keys(this.data).forEach(dataKey => {
         reqData[dataKey] = this.data[dataKey].values[0];
         });
         Document_inputparam["options"]["data"] = reqData;
         var Document_httpheaders = {};
         Document_inputparam["httpheaders"] = Document_httpheaders;
         var Document_httpconfigs = {};
         Document_inputparam["httpconfig"] = Document_httpconfigs;
         await mfobjectsecureinvokerasync(Document_inputparam, VOLTMX_SCRIPT_OBJ_SERVICE_NAME, this.data["Form"].values);
    };

    this.send = async function(attachForm, recipients) {
        var Document_inputparam = {};
        //Document_inputparam["serviceID"] = "TestObj$Document$create";
        Document_inputparam["options"] = {
            "access": "online",
            "CRUD_TYPE": "create"
        };
        var reqData = {};
        Object.keys(this.data).forEach(dataKey => {
            reqData[dataKey] = this.data[dataKey].values[0];
        });
        Document_inputparam["options"]["data"] = reqData;
        var Document_httpheaders = {};
        Document_inputparam["httpheaders"] = Document_httpheaders;
        var Document_httpconfigs = {};
        Document_inputparam["httpconfig"] = Document_httpconfigs;
        await mfobjectsecureinvokerasync(Document_inputparam, VOLTMX_SCRIPT_OBJ_SERVICE_NAME, this.data["Form"].values[0].slice(3,-6));
    };
};

/***/ }),

/***/ 628:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_16502__) => {

"use strict";
__nested_webpack_require_16502__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_16502__.d(__nested_webpack_exports__, {
/* harmony export */   NotesDocumentCollection: () => (/* binding */ NotesDocumentCollection)
/* harmony export */ });
/* harmony import */ var _Database__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_16502__(279);


const NotesDocumentCollection = function() {
    this.DOC_ID = 'x_0040unid';
    this.unids = [];
    this.curIndex = 0;
    this.idDocMap = {};

    this._getPosition = function(doc) {
        var docId = doc[this.DOC_ID];
        for (var i = 0; i < this.unids.length; i++) {
            if (this.unids[i] === docId) {
                return i;
            }
        }
    }
    this.getFirstDocument = async function() {
        var docId = this.unids[0];
        var fullDoc = this.idDocMap(docId);
        if (fullDoc) {
            return fullDoc;
        } else {
            var db = new _Database__WEBPACK_IMPORTED_MODULE_0__.Database();
            fullDoc = db.GetDocumentByID(docId);
            this.idDocMap[docId] = fullDoc;
            return fullDoc;
        }
    };

    this.getNextDocument = async function(doc) {
        var curIdx = this._getPosition(doc);
        var docId = this.unids[curIdx+1];
        var fullDoc = this.idDocMap(docId);
        if (fullDoc) {
            return fullDoc;
        } else {
            var db = new _Database__WEBPACK_IMPORTED_MODULE_0__.Database();
            fullDoc = db.GetDocumentByID(docId);
            this.idDocMap[docId] = fullDoc;
            return fullDoc;
        }
    };

    this.addDocument = function(doc) {
        if (doc) {
            let docId = doc[this.DOC_ID];
            let index = this.unids.findIndex((item) => {
                return item === docId;
            });
            if (index > -1) {
                this.unids.push(docId);
                this.idDocMap[docId] = doc;
            } else {
                this.idDocMap[docId] = doc;
            }
        } else {
            throw new Error("doc param is not specified.");
        }
    };

    this.deleteDocument = function(doc) {
        // The specified document must have originated in this collection(TODO how to check this?). 
        // If the document does not exist in the collection, 
        // or if it was removed from the database by a RemoveAll operation (TODO how to check this?), an error will be raised.
        if (doc) {
            let docId = doc[this.DOC_ID];
            let index = this.unids.findIndex((item) => {
                return item === docId;
            });
            if (index > -1) {
                delete this.unids[index]; // or this.unids.splice(index, 1)
                this.idDocMap[docId] = null;
            } else {
                throw new Error("doc is not originated in this collection.");
            }
        } else {
            throw new Error("doc param is not specified.");
        }
    }
}

/***/ }),

/***/ 146:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_19556__) => {

"use strict";
__nested_webpack_require_19556__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_19556__.d(__nested_webpack_exports__, {
/* harmony export */   NotesItem: () => (/* binding */ NotesItem)
/* harmony export */ });
const NotesItem = function(notesDocument, name, value, specialType) {
    // Properties
    //   IsAuthors
    //   IsNames
    //   Name
    //   Parent
    //   Text
    //   Type
    //   Values
    // Methods
    //   Abstract
    //   AppendToTextList
    //   Contains
    //   Remove
    // NotesItem(doc, "Authors", vResults, AUTHORS) 构造函数
    this.name = name;
    this.notesDocument = notesDocument;

    if (value instanceof Array) {
        this.values = value;
    } else {
        this.values = value === null ? [] : [value];
    }

    this._checkType = function(values) {
        if (values instanceof Array) {
            return this._checkTypeHelper(values[0]);
        } else {
            return this._checkTypeHelper(values);
        }
    }

    this._checkTypeHelper = function(value) {
        if (typeof value === "string") {
            return this.TEXT;
        } else if (typeof value === "number") {
            return this.NUMBERS;
        } else {
            return this.TEXT;
        }
    }

    //type
    this.type = specialType ? specialType : this._checkType(this.values);
    // NAMES, READERS, or AUTHORS
    if (specialType) {
        this.IsSummary = false;
    }
    this.contains = function(value) {
        //TODO If value is a distinguished name and if the item contains Notes® user names, the distinguished name matches the common version of the hierarchical name
        for ( i in this.values) {
            if (this.values[i] === value) {
                return true;
            }
        }
        return false;
    };

};

/***/ }),

/***/ 249:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_21450__) => {

"use strict";
__nested_webpack_require_21450__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_21450__.d(__nested_webpack_exports__, {
/* harmony export */   NotesSession: () => (/* binding */ NotesSession)
/* harmony export */ });
/* harmony import */ var _NotesContext__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_21450__(734);


const NotesSession = function() {
    // Properties
    //       CommonUserName
    //       CurrentDatabase
    //       CurrentAgent
    //       EffectiveUserName
    //       ServerName
    //       UserName
    //     Methods
    //       GetDatabase
    //       GetEnvironmentString
    //       GetEnvironmentValue
    //       SetEnvironmentVar
    this.getCurrentAgent = function () {
      return _NotesContext__WEBPACK_IMPORTED_MODULE_0__.NotesContext.currentAgent;
    }
    
    this.getCurrentDatabase = function() {
      return _NotesContext__WEBPACK_IMPORTED_MODULE_0__.NotesContext.getCurrentDatabase();
    }
};

/***/ }),

/***/ 362:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_22505__) => {

"use strict";
__nested_webpack_require_22505__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_22505__.d(__nested_webpack_exports__, {
/* harmony export */   NotesUIDatabase: () => (/* binding */ NotesUIDatabase)
/* harmony export */ });
const NotesUIDatabase = function() {
    

    // NotesUIDatabase
    // Properties
    //   Database
    //   Documents
    // Methods
    //   Close
};

/***/ }),

/***/ 134:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_22990__) => {

"use strict";
__nested_webpack_require_22990__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_22990__.d(__nested_webpack_exports__, {
/* harmony export */   NotesUIView: () => (/* binding */ NotesUIView)
/* harmony export */ });
/* harmony import */ var _NotesDocumentCollection__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22990__(628);
/* harmony import */ var _NotesView__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_22990__(408);



const NotesUIView = function(view, segment, viewName, viewAlias) {
    this.DOC_ID = 'x_0040unid';
    this.viewName = viewName;
    this.viewAlias = viewAlias;
    this.segment = segment;
    this.view = view;
    this.unids = [];
    this.notesView = new _NotesView__WEBPACK_IMPORTED_MODULE_1__.NotesView(segment.data);
    // for ( let i = 0; i < this.segment.data.length; i++) {
    //     this.unids.push(this.segment.data[i][this.DOC_ID]);
    // }

    //selected documents
    this.documents = new _NotesDocumentCollection__WEBPACK_IMPORTED_MODULE_0__.NotesDocumentCollection();

    this.close = function() {
      var ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      ntf.navigate({isBack: true});
    };

    this.deselectAll = function() {
        this.segment.selectedRowIndex = null;
        this.documents = new _NotesDocumentCollection__WEBPACK_IMPORTED_MODULE_0__.NotesDocumentCollection();
    };

    /*
     * selectDocument: change focus, not change selected document
     * */
    this.selectDocument = function(doc) {
        this.caretNoteID = doc[this.DOC_ID];
        // for ( let i = 0; i < this.segment.data.length; i++) {
        //     if (this.segment.data[i][this.DOC_ID] ==  doc[this.DOC_ID]) {
        //         this.segment.selectedRowIndex = [i];
        //         //todo check multi add; single remove then add;
        //         this.documents.addDocument(doc);
        //         break;
        //     }
        // }
    };


}

/***/ }),

/***/ 408:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_25012__) => {

"use strict";
__nested_webpack_require_25012__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_25012__.d(__nested_webpack_exports__, {
/* harmony export */   NotesView: () => (/* binding */ NotesView)
/* harmony export */ });
/* harmony import */ var _NotesViewEntry__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_25012__(502);


const NotesView = function(allEntries) {
	this.rawData = allEntries;
    this.allEntries = null;
    const mapAllEntries = (newEntries) => {
        const viewEntries = newEntries || allEntries;
        if (!viewEntries || viewEntries.length === 0) {
	        return;
        }
        this.allEntries = viewEntries.map((viewEntrie) => new _NotesViewEntry__WEBPACK_IMPORTED_MODULE_0__.NotesViewEntry(viewEntrie));
    };
    mapAllEntries();
}

/***/ }),

/***/ 502:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_25875__) => {

"use strict";
__nested_webpack_require_25875__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_25875__.d(__nested_webpack_exports__, {
/* harmony export */   NotesViewEntry: () => (/* binding */ NotesViewEntry)
/* harmony export */ });
const NotesViewEntry = function(rawData) {

    this.childCount = 0;//Read-only. The number of immediate children belonging to the current view entry.
    this.columnIndentLevel = 0;//Read-only. The columns indent level of a view entry.
    this.columnValues = [];//Read-only. The value of each column in the view entry.
    this.descendantCount = 0;//Read-only. The number of descendants belonging to the current view entry.
    this.document = null;//{NotesDocument} Read-only. The document associated with the view entry.
    this.FTSearchScore = 0;//Read-only. The full-text search score of a view entry, if it was retrieved as part of a full-text search.
    this.indentLevel = 0;//Read-only. The indent level of a view entry. Postion String -> Indent Level : 1 -> 0, 1.1 -> 1
    this.isCategory = false;//Read-only. Indicates whether a view entry is a category.
    this.isConflict = false;//Read-only. Indicates whether a view entry contains a document on which a replication or save conflict occurred.
    this.isDocument = false;//Read-only. Indicates whether a view entry is a document.
    this.isTotal = false;//Read-only. Indicates whether a view entry is a total.
    this.isValid = false;//Read-only. Indicates whether a view entry is a valid entry.
    this.noteID = null;//Read-only. The prefix "NT" followed by the note ID of a view entry.
    this.parent = null;//{NotesView}Read-only. The parent view, view entry collection (COM only), or view navigator (COM only) of a view entry.
    this.siblingCount = 0;//Read-only. The number of siblings belonging to the current view entry.
    this.universalID = null;//Read-only. The universal ID of a document, associated with a view entry. The ID is a 32-character combination of hexadecimal digits (0-9, A-F) that uniquely identifies a document across all replicas of a database.

    this.getPosition = function(separator) {
        if (!separator) {
            separator = ',';
        }
        let posArray = [];
        return posArray.join(separator);
    };

    this.getRead = function(userName) {
        let isRead = false;
        const readerName = userName || currentUser;
        return isRead;
    };

    const mapRawData = (newData) => {
        const entryRawData = newData || rawData;
        if (entryRawData) {
            this.rawData = JSON.parse(JSON.stringify(entryRawData));
            this.universalID = this.rawData.UNID || this.rawData.rchUNID;
            const fieldNames = Object.keys(this.rawData);
            this.columnValues = fieldNames.map((fieldName) => {
                return this.rawData[fieldName];
            });
        }
    };

    mapRawData();
};

/***/ }),

/***/ 385:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_28871__) => {

"use strict";
__nested_webpack_require_28871__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_28871__.d(__nested_webpack_exports__, {
/* harmony export */   UIDocument: () => (/* binding */ UIDocument)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_28871__(26);
/* harmony import */ var _Variant__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_28871__(257);



const UIDocument = function(voltmxForm, dataDocument) {
    // Properties:
    // CurrentField
    // Document
    // EditMode
    // WindowTitle


    // Method:
        //  Clear v
        //   Close v
        //   DeleteDocument 1/2
        //   FieldClear
        //   FieldContains
        //   FieldGetText
        //   FieldSetText
        //   GotoBottom
        //   GotoField
        //   GotoNextField
        //   GotoPrevField
        //   GotoTop
        //   InsertText
        //   Refresh
        //   Reload
        //   Save
    voltmx.sdk.logsdk.perf("Executing UIDocument");

    this.dataDocument = dataDocument;
    this.voltmxForm = voltmxForm;
    if (voltmxForm.id.slice(-6) === "Create") {
        this.editMode = true;
    } else {
        this.editMode = false;
    }

    this.save = async function() {
  		var Continue = new _Variant__WEBPACK_IMPORTED_MODULE_1__.Variant(true);
  		try{
          if(this.Querysave) this.Querysave(this, Continue);
      }catch(e){
          console.log("Querysave error!")
      }
      if (Continue.getValue()) {
  			if(this.OnSubmit) this.OnSubmit(this, Continue);
  			if (Continue.getValue()) {
		        var txtFieldList = _util__WEBPACK_IMPORTED_MODULE_0__.util.getTxtFields(this.voltmxForm);
		        var dataDocument = this.dataDocument;
		        txtFieldList.forEach(function(field){
		            dataDocument.replaceItemValue(field.id.slice(3), field.text);
		        });
		        await dataDocument.save();
		        if(this.Postsave) this.Postsave(this);
		    } else {
          throw new Error("Document OnSubmit abort!");
        }
		  } else {
        throw new Error("Document QuerySave abort!");
      }
    };

    this.close = function() {
	    var Continue = new _Variant__WEBPACK_IMPORTED_MODULE_1__.Variant(true);
	    try{
        if(this.Queryclose) this.Queryclose(this, Continue);
      }catch(e){
        console.log("Queryclose error!");
      }
      if (Continue.getValue()) {
  			if(this.OnUnload) this.OnUnload(this, Continue);
  			if (Continue.getValue()) {
		        var nav = new voltmx.mvc.Navigation(voltmx.application.getPreviousForm().id);
		        nav.navigate();
		    } else {
          throw new Error("Document OnUnload abort!");
        }
	    } else {
        throw new Error("Document QueryClose abort!");
      }
    };

    this.getDocument = function() {
        var txtFieldList = _util__WEBPACK_IMPORTED_MODULE_0__.util.getTxtFields(this.voltmxForm);
        var dataDocument = this.dataDocument;
        txtFieldList.forEach(function(field){
            dataDocument.replaceItemValue(field.id.replace('voltmx',''), field.text);
        });
        return dataDocument;
    };
    this.fieldSetText = function(fieldName, value){
        var oItem = this.voltmxForm["tbx"+fieldName];
        oItem.text = value;
    };

    this.fieldGetText = function(fieldName) {
        var oItem = this.voltmxForm["tbx"+fieldName];
        return oItem ? (oItem.value || oItem.text) : null;
    };

    this.clear = function() {
        this.currentField.text = "";
    };

    // Marks the current document for deletion and closes it.
    // The NotesUIDocument object is no longer available once you call this method.
    //     The document is not actually deleted from the database until the user refreshes the view or closes the database, and chooses to delete the marked document.

    // If the current document is already marked for deletion, this method closes the document, leaving the deletion mark in place.

    this.deleteDocument = async function(UNID) {
        const reqParams = {
          SCOPE: _util__WEBPACK_IMPORTED_MODULE_0__.util.getScopeName(),
          UNID: UNID
        };
        return await _util__WEBPACK_IMPORTED_MODULE_0__.util.processIntegrationReq(_util__WEBPACK_IMPORTED_MODULE_0__.util.getIntegrationServiceName(), "deleteDocument", reqParams);
        
    };

    this.refresh = function() {
        //TODO Check Edit mode
    };

    this.reload = function() {
        this.updateTxtFields(voltmx.application.getCurrentForm(), this.dataDocument.rawData);
    };

    this.updateTxtFields = function(attachForm, data) {
      var txtFieldList = _util__WEBPACK_IMPORTED_MODULE_0__.util.getLabelFields(attachForm);
      Object.keys(data).forEach((dataKey) => {
        var oItem = this.voltmxForm["tbx"+dataKey];
        if(oItem !== null){
          oItem.text = data[dataKey];
        }
      });
    };

    this.send = async function(attachForm, recipients) {
      if(this.Querysend) this.Querysend(this);
      var txtFieldList = _util__WEBPACK_IMPORTED_MODULE_0__.util.getTxtFields(this.voltmxForm);
      var dataDocument = this.dataDocument;
      txtFieldList.forEach(function(field){
          dataDocument.replaceItemValue(field.id.slice(3), field.text);
      });
      dataDocument.send(attachForm, recipients);
      if(this.Postsend) this.Postsend();
    };
    
    this.gotoField = function(fieldName) {
  		// Todo: set focus to target field
  		var oItem = this.voltmxForm["tbx"+fieldName];
  		oItem.setFocus();
  	};

    this.Queryopen = null;
    this.Postopen = null;
    this.Querysave = null;
    this.Queryclose = null;
    this.OnUnload = null;
    this.Postsave = null;
};

/***/ }),

/***/ 191:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_34630__) => {

"use strict";
__nested_webpack_require_34630__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_34630__.d(__nested_webpack_exports__, {
/* harmony export */   UIWorkspace: () => (/* binding */ UIWorkspace)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_34630__(26);
/* harmony import */ var _NotesContext__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_34630__(734);



const UIWorkspace = function() {
    // Properties
    //   CurrentDatabase
    //   CurrentDocument
    //   CurrentView
    // Methods
    //   ComposeDocument v
    //   DialogBox
    //   EditDocument
    //   GetCurrentDatabase
    //   Prompt
    //   ReloadWindow
	
    voltmx.sdk.logsdk.perf("Executing UIWorkspace");
    this.currentForm = _util__WEBPACK_IMPORTED_MODULE_0__.util.getCurrentForm();
    this.currentDocument = this.currentForm.currentDocument;
    this.currentView = this.currentForm.currentView;
    this.getCurrentDocument = function() {
        return this.currentDocument;
    };

    this.getCurrentView = function() {
        return this.currentView;
    };
    this.composeDocument = function(server, fileName, formName) {
        //var nav = new voltmx.mvc.Navigation(formName);
        var nav = new voltmx.mvc.Navigation("frmNewCustomerCreate");
        nav.navigate();
    };
    this.getCurrentDatabase = function() {
        return _NotesContext__WEBPACK_IMPORTED_MODULE_1__.NotesContext.getCurrentDatabase();
    };
};

/***/ }),

/***/ 257:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_36196__) => {

"use strict";
__nested_webpack_require_36196__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_36196__.d(__nested_webpack_exports__, {
/* harmony export */   Variant: () => (/* binding */ Variant)
/* harmony export */ });
const Variant = function(value) {
    this.value = value;
    this.type = typeof(value);

    this.getValue = function() {
        return this.value;
    };
    this.getType = function() {
        return this.type;
    };
    this.setValue = function(value) {
        this.value = value;
        this.type = typeof(value);
    };
    this.getValueByIndex = function(index) {
		return this.value[index];
	};
};

/***/ }),

/***/ 26:
/***/ ((__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_36920__) => {

"use strict";
__nested_webpack_require_36920__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_36920__.d(__nested_webpack_exports__, {
/* harmony export */   util: () => (/* binding */ util)
/* harmony export */ });
const util = {};

util.updateTxtFields = function (container, values) {
    var txtFields = [];
    if (container && container.widgets) {
        var children = container.widgets();
        children.forEach(function(aWidget) {
            if (aWidget instanceof voltmx.ui.TextBox2) {
                aWidget.text = values[aWidget.id.slice(3)]; //TODO double confirm whether remove 'tbx' prefix
            } else if (aWidget.widgets) {
                util.updateTxtFields(aWidget, values)
            }
        });
    }
    return txtFields;
};

util.getTxtFields = function (container) {
    var txtFields = [];
    if (container && container.widgets) {
        var children = container.widgets();
        children.forEach(function(aWidget) {
            if (aWidget instanceof voltmx.ui.TextBox2) {
                txtFields.push(aWidget);
            } else if (aWidget.widgets) {
                txtFields = txtFields.concat(util.getTxtFields(aWidget));
            }
        });
    }
    return txtFields;
};

util.getLabelFields = function (container) {
    var fields = [];
    if (container && container.widgets) {
        var children = container.widgets();
        children.forEach(function(aWidget) {
            if (aWidget instanceof voltmx.ui.Label) {
                fields.push(aWidget);
            } else if (aWidget.widgets) {
                fields = fields.concat(util.getLabelFields(aWidget));
            }
        });
    }
    return fields;
};

util.inputBoxString = async function (promptValue, title, defaultValue) {
    const result = await voltmx.rosettajs.Document.prompt("OkCancelEdit", title ? title : "", promptValue ? promptValue : "", defaultValue ? defaultValue : "");
    return result;
};
util.lsMsgBox = function (message , buttons , boxTitle ) {
    var alertBasic = {
        message: message,
        alertTitle : boxTitle,
        alertIcon: "icon.png"
    };

    var alertPSP = {};

    var alert = kony.ui.Alert(alertBasic, alertPSP);
};

util.lsTrim = function (stringExp) {
    if (stringExp !== null && stringExp instanceof String) {
        return stringExp.trim();
    }
    return stringExp;
};

util.getCurrentForm = function () {
    return voltmx.application.getCurrentForm();
};

util.getAgentFunction = function (agentName) {
  return VOLTMX_SCRIPT_AGENTS[agentName];
};

util.getAgentsObject = function () {
  return VOLTMX_SCRIPT_AGENTS;
};

util.getIntegrationServiceName = function () {
  return VOLTMX_SCRIPT_INTEGRATION_SERVICE_NAME;
};

util.getScopeName = function () {
  return VOLTMX_SCRIPT_SCOPE_NAME;
};

util.processIntegrationReq = async function (serviceName, apiName, reqParams) {
    return new Promise((resolve, reject) => {
        const inteService = VMXFoundry.getIntegrationService(serviceName);
        inteService.invokeOperation(
            apiName,
            {},
            reqParams,
            resp => resolve(resp),
            error => reject(error)
        );
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_40351__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_40351__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_40351__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_40351__.o(definition, key) && !__nested_webpack_require_40351__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_40351__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_40351__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __nested_webpack_exports__ = __nested_webpack_require_40351__(547);
/******/ 	
/******/ 	return __nested_webpack_exports__;
/******/ })()
;
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var lotusscriptjs = __webpack_require__(593);
if(voltmx) {
	voltmx.lotusscript = lotusscriptjs;
}
/******/ })()
;