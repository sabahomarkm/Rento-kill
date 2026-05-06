const designImportWizard=require("../../design_import_domino_wizard");const pcConstants=require("./constants");const migrationData=require("../../../migration/modules/migration/migrationData");let addonAPI=designImportWizard.getMxgoUtils().moduleFunctions.addOnApi;let commonMod=designImportWizard.getMxgoUtils().moduleFunctions.commonMod;let popGenericDialog=designImportWizard.getMxgoUtils().moduleFunctions.popGenericDialog;let migData=migrationData.getSessionMigrationData();let logger=designImportWizard.getMxgoUtils().utilFunctions.logr;let i18next=designImportWizard.getMxgoUtils().utilFunctions.i18next;let viz=designImportWizard.getMxgoUtils().getVizGlobal();const jquery=designImportWizard.getMxgoUtils().utilFunctions.jquery;let showCallout=commonMod.showCallout;let hideCallout=commonMod.hideCallout;let positionCalloutDiv=commonMod.positionCalloutDiv;let{CSS_CLASS,ERROR_MESSAGES,KEYCODES,STATUS,DESIGN_IMPORT_TYPES}=pcConstants;function hasHikesAddon(){return addonAPI.hasAddon("hikeengine")}function checkInternetConnection(){return new Promise(e=>{if(navigator.onLine){e(true)}else{popGenericDialog.alert({title:"Volt MX Go Iris",content:ERROR_MESSAGES.NO_INTERNET_CONNECTION,doNotShowCloseButton:true});e(false)}})}function focus(e){let t=getView(e);if(t!==undefined&&t.view!==undefined){focusNode(t.view);return}}function focusNode(e){let t,i;try{const o=jquery;t=o(e);i=t.find(":focusable")}catch(e){logger.info("jNode invalid");logger.error(e)}if(i?.length===0){i=t}if(i){i.first().focus()}}function getInfoIconConfig(e){let t=e.tooltip;delete e.tooltip;return _.defaults(e,{view:"image",visible:true,src:"./images/generic/info-dark.svg",cssText:"margin: 0; width: 14px; height: 14px",cellStyle:"font-size: 0px",onAfterRender:function(){if(t){viz.ui.helpers.bindRichTooltip({node:this.view,content:t})}}})}function getView(e){return viz.ui.helpers.getView(e)}function getKeyDownHandler(e,i){return function(t){if(!t.repeat&&(!e||e.some(e=>e===t.keyCode))){hideCallout();i&&i(t)}}}function getCloseButtonConfig(e){let t=e.idPrefix;let i=e.wizard;delete e.wizard;delete e.idPrefix;return{view:"image",id:`${t}-close`,src:"images/projectCreationWizard/common/closeLarge.svg",cellStyle:"align-self: flex-end;",classList:[CSS_CLASS.CLOSE_BUTTON],onClick:()=>{if(i.data.selectedScope){migData.setScope(i.data.selectedScope,i)}hideCallout();this.complete({status:STATUS.ABORT})},onAfterRender:function(){this.view.setAttribute("tabIndex",0);this.view.onkeydown=getKeyDownHandler([KEYCODES.ENTER,KEYCODES.SPACE],e=>{this.eventCallbacks.onClick.call(this,e)})}}}function getFooterConfig(e){function t(e,i){return _.extend(i,{view:"html",cssText:"display: flex; margin: 0;",cellStyle:`flex: 1 1 auto; display: flex; ${i.cellStyle}`,visible:`${i.visible}`,onAfterRender:function(){_.each(e,e=>{let t=e.onClick;viz.ui(_.extend(e,{container:this.view,view:"button",id:`${i.id}-${e.text.replace(/ /g,"").toLowerCase()}`,onClick:function(){hideCallout();if(t){t.call(this)}}}))})}})}return{elements:[t(e.leftItems,{id:`${e.idPrefix}-footerLeftItems`,cellStyle:e.leftCellStyle?e.leftCellStyle:"justify-content: flex-start;",visible:e.visible!=="undefined"?e.visible:true}),t(e.centerItems,{id:`${e.idPrefix}-footerCenterItems`,cellStyle:e.centerCellStyle?e.centerCellStyle:"justify-content: center;",visible:e.visible!=="undefined"?e.visible:true}),t(e.rightItems,{id:`${e.idPrefix}-footerRightItems`,cellStyle:e.rightCellStyle?e.rightCellStyle:"justify-content: flex-end;",visible:e.visible!=="undefined"?e.visible:true})],itemStyle:`width: 788px; position: absolute; left: 30px; bottom: 30px; ${e.itemStyle||""}`}}function getSelectViewConfig(e){let{id:r,isSelectable:n,items:t,onItemClick:l,onItemSelect:s,info:a}=e;function c(e){let{classList:t,id:o,info:i,onAfterRender:n,subItems:r}=e;delete e.subItems;_.extend(e,{view:"html",classList:(t||[]).concat(CSS_CLASS.ITEM),onAfterRender:function(){if(i.type==="separator"){this.addClassName(CSS_CLASS.ITEM_SEPARATOR);this.setHTML(i.text)}else{this.view.setAttribute("tabIndex",0);_.each(r,e=>{let t=e.info.type;let i=_.defaults(e,{container:this.view,id:`${o}-${t}`,info:{}});switch(t){case"icon":_.extend(i,{view:"image",src:i.src||i.info.src.inactive,classList:[CSS_CLASS.ITEM_ICON]});break;case"title":_.extend(i,{view:"label",classList:[CSS_CLASS.ITEM_TITLE]});break;case"description":_.extend(i,{view:"label",classList:[CSS_CLASS.ITEM_DESCRIPTION]});break}viz.ui(i)})}if(n){n.call(this)}}});return e}function i(){if(!n){return[]}function e(e,t){if(!e){return}let i=`${r}-${e.replace(/ /g,"").toLowerCase()}`;let o=getView(i);let n=getView(`${i}-icon`);if(t){o.addClassName(CSS_CLASS.ITEM_SELECTED);if(n.info.src){n.setSrc(n.info.src.active)}}else{o.removeClassName(CSS_CLASS.ITEM_SELECTED);if(n.info.src){n.setSrc(n.info.src.inactive)}}}return[{view:"listbox",visible:false,id:`${r}-listbox-hidden`,cellStyle:"display: none;",info:a,data:_.reduce(t,(e,t)=>{let{identifier:i,type:o}=t.info;if(i&&o!=="separator"){e.push({key:i,value:i})}return e},[]),bindings:[{defaultValue:a.defaultValue,key:a.property,object:a.object,property:"selectedKey",transforms:{modelToView:function(t){if(this.info.transforms&&this.info.transforms.modelToView){t=this.info.transforms.modelToView(t)}e(this.getSelectedKey(),false);if(!this.data.some(e=>e.key===t)){t=this.data[0].key}e(t,true);return t},viewToModel:function(e){if(this.info.transforms&&this.info.transforms.viewToModel){e=this.info.transforms.viewToModel(e)}return e}}}]}]}return{elements:[..._.map(t,(e,t)=>{let i=e.info.identifier;let o=e.onAfterRender;return c(_.extend(e,{id:`${r}-${i.replace(/ /g,"").toLowerCase()}`,info:{...e.info,index:t},onClick:function(){if(n){a.object[a.property]=i;if(s){s.call(this,i)}}else if(l){l.call(this,i)}},onAfterRender:function(){this.view.onkeydown=getKeyDownHandler([KEYCODES.ENTER,KEYCODES.SPACE],e=>{this.eventCallbacks.onClick.call(this,e)});if(o){o.call(this)}}}))}),...i()],itemStyle:`margin: 8px; ${e.itemStyle||""}`}}let logFromFile;function setupLoggingFromFile(e){logFromFile=e}function log(e){if(DESIGN_IMPORT_TYPES.IS_DEV){console.log(`DEBUG ${logFromFile}:  ${e}`)}}function getStepsConfig(n){let e=n.idPrefix;let r="";let l=["Getting<br/>Started","Associate<br/>Foundry App","Identity<br/>Service","Scope<br/>and Forms","Summary","Result"];let s=0;let a="";for(var c=1;c<=n.totalSteps;c+=1){let e=c==n.currentStepNumber?"true":"false";let t=c==n.currentStepNumber?"bold":"";let i=c==5?"summary":c==6?"result":"";let o=c<n.currentStepNumber?"true":"false";switch(n.currentStepNumber){case 1:s=0;a="#BCC8F5";break;case 2:s=20;a="#BCC8F5";break;case 3:s=40;a="linear-gradient(to right, rgba(41, 53, 84, 1) 50%, rgba(188, 200, 245, 1) 50%)";break;case 4:s=60;a="linear-gradient(to right, rgba(41, 53, 84, 1) 67%, rgba(188, 200, 245, 1) 33%)";break;case 5:s=80;a="linear-gradient(to right, rgba(41, 53, 84, 1) 75%, rgba(188, 200, 245, 1) 25%)";break;case 6:s=100;a="linear-gradient(to right, rgba(41, 53, 84, 1) 80%, rgba(188, 200, 245, 1) 20%)";break;default:s=0;a="#d9d9d9";break}r+='<div class="step-item">'+'<button class="step-button '+i+' text-center" type="button" pass-step='+o+" aria-expanded="+e+">"+c+"</button>"+'<div class="step-button-title '+i+" "+t+'">'+l[c-1]+"</div></div>"}return{view:"html",id:`${e}-html`,cellStyle:"width: 100%; text-align: center;",html:`<style>
        .steps {
          width: 660px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        progress {
          -webkit-appearance: none;
          position: absolute;
          width: 90%;
          z-index: 5;
          height: 2px;
          margin-left: 40px;
          margin-bottom: 44px;
        }
        progress::-webkit-progress-bar {
          background: #d9d9d9;
        }
        
        progress::-webkit-progress-value {
          background:`+a+`
        }
        progress::-moz-progress-bar {
          background:`+a+`
        }
        
        .step-item {
          z-index: 10;
          text-align: center;
          font-size: 20px;
        }
        .step-button[aria-expanded="true"] {
          background-color: #BCC8F5;
          color: #000000;
        }
        .step-button[pass-step="true"] {
          background-color: #293554;
          color: #fff;
        }
        .step-button {
          width: 31px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background-color: #d9d9d9;
          transition: .4s;
          font-size: 16px !important;
        }
        .step-button.result {
          position: absolute;
          top: 0px;
          right: 10px;
        }
        .step-button.summary {
          position: absolute;
          top: 0px;
          right: 125px;
        }
        .step-button-title{
          font-size: 16px !important;
          margin-top: 8px;
          line-height: 18.75px;
          color: #646464;
        }
        .step-button-title.bold{
          font-weight: bold !important;
          color: #000000;
        }
        .step-button-title.summary{
          margin-top: 20px;
        }
        .step-button-title.result{
          margin-top: 20px;
        }
        </style>
        <div class="steps">
        <progress id="progress" value="`+s+`" max="100"></progress>
        `+r+`
        </div>`}}function enableDisableNextButton(e,t){let i=getView(`${e}-next-button`);if(i){i.setDisabled(t)}}function showHideNextButton(e,t){let i=getView(`${e}-next-button`);if(i){i.setVisible(t)}}function enableDisableElement(e,t,i){let o=getView(`${e}-${t}`);if(o){o.setDisabled(i)}}function maskEntryInLog(e,o){let n=JSON.parse(JSON.stringify(e));logger.info(`${i18next.t("design_import.maskingEntriesMsg")}: ${o}`);for(let t=0;t<o.length;t++){let e=o[t];let i=e.split(".");try{let t=n;for(let e=0;e<i.length-1;e++){t=t[i[e]]}let e=t[i[i.length-1]];t[i[i.length-1]]=e.slice(0,-4)+"XXXX"}catch(e){}}return n}function addSortConfigToServiceObj(e,t,i){let o;let n;let r=i.views;if(!r){return}for(o of r){if(o.viewRawInfo.columns.length>0){for(n of o.viewRawInfo.columns){if(n.itemName!==""){if(n.sortConfiguration.resortAscending||n.sortConfiguration.resortDescending||n.sortConfiguration.sorted){o.sortable=true}else{o.sortable=false;break}}}}}let l;var s=Object.keys(t);var a;for(l of s){if(l.includes(e)){a=t[l]}}if(a){a.operations.sortable=false;for(o of r){if(o.sortable){a.operations.sortable=true}}}}module.exports={hasHikesAddon:hasHikesAddon,checkInternetConnection:checkInternetConnection,focus:focus,focusNode:focusNode,getInfoIconConfig:getInfoIconConfig,getView:getView,getKeyDownHandler:getKeyDownHandler,getCloseButtonConfig:getCloseButtonConfig,getFooterConfig:getFooterConfig,getSelectViewConfig:getSelectViewConfig,setupLoggingFromFile:setupLoggingFromFile,getStepsConfig:getStepsConfig,enableDisableNextButton:enableDisableNextButton,showHideNextButton:showHideNextButton,enableDisableElement:enableDisableElement,maskEntryInLog:maskEntryInLog,addSortConfigToServiceObj:addSortConfigToServiceObj};