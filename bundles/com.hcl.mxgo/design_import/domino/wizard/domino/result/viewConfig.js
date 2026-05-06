const designImportWizard=require("../../../design_import_domino_wizard");const pcConstants=require("../constants");const pcUtils=require("../utils");const tabConfig=require("./tabConfig");const resultConfig=require("./resultConfig");const migrationData=require("../../../../migration/modules/migration/migrationData");const flagUtils=require("../../../../flagUtils").flagUtils;const _kgb_=designImportWizard.getMxgoUtils().getKgbGlobal();const logger=designImportWizard.getMxgoUtils().utilFunctions.logr;const i18next=designImportWizard.getMxgoUtils().utilFunctions.i18next;const kprojectReloader=designImportWizard.getMxgoUtils().utilFunctions.kProjectReload;const config=designImportWizard.getMxgoUtils().coreFunctions.coreConfig;let{CSS_CLASS,DESIGN_OBJECTS}=pcConstants;let totalSteps=6;let currentStepNumber=6;let migrationUtils=new flagUtils(designImportWizard.darkLaunchFlags,designImportWizard.getMxgoUtils());migData=migrationData.getSessionMigrationData();async function get(){let i=this;let o=i.currentStepId;let t=i.data.selectedScope;logger.info(`${i18next.t("design_import.mxgo")} loaded '${o}'`);pcUtils.setupLoggingFromFile(o);let e="";if(migData.data.formsMade&&migData.data.formsMade.length){e+=`<div class="forms created">`;e+=`<div class="item-title"><p>${i18next.t("design_import.reports.formsCreated")}</p></div>`;for(const D of migData.data.formsMade){e+=`<div class="item-div">`;e+=`<b>${D.formName}</b>`;e+=`<div class="item-elements">`;if(D.fields&&D.fields.length){e+=`<p>Fields: </p>`;e+=`<ul class="two-columns">`;for(const A of D.fields){e+=`<li>${A.fieldName}</li>`}e+=`</ul>`}if(migrationUtils.DARKLAUNCH_FLAGS_ACTION_BAR_ALLOWED&&migData.data.actionsMade&&migData.data.actionsMade.length){const k=migData.data.actionsMade.filter(t=>{return t.irisFormName&&t.irisFormName===D.irisFormName});if(k&&k.length){e+=`<p>Actions: </p>`;e+=`<ul class="two-columns">`;for(const I of k){e+=`<li>${I.actionName}</li>`}e+=`</ul>`}}e+=`</div>`;e+=`</div>`}}else{e+=`<div class="forms created"><div class="item-title"><p class="none-selected">${i18next.t("design_import.reports.formsCreated")}</p></div><ul>
    <li><i>${i18next.t("design_import.reports.noFormsCreated")}</i></li></ul>`}e+=`</div>`;if(migData.data.viewsMade){e+=`<div class="views created">`;e+=`<div class="item-title"><p>${i18next.t("design_import.reports.viewsCreated")}</p></div>`;for(const L of migData.data.viewsMade){e+=`<div class="item-div">`;e+=`<b>${L.viewName}</b>`;e+=`<div class="item-elements">`;if(migrationUtils.DARKLAUNCH_FLAGS_ACTION_BAR_ALLOWED&&migData.data.actionsMade&&migData.data.actionsMade.length){const M=migData.data.actionsMade.filter(t=>{return t.irisFormName&&t.irisFormName===L.irisFormName});if(M&&M.length){e+=`<p>Actions: </p>`;e+=`<ul class="two-columns">`;for(const I of M){e+=`<li>${I.actionName}</li>`}e+=`</ul>`}}e+=`</div>`;e+=`</div>`}e+=`</div>`}else{e+=`<div class="views created"><p class="none-selected">${i18next.t("design_import.reports.viewsCreated")}</p><ul>
    <li><i>${i18next.t("design_import.reports.noViewsCreated")}</i></li></ul></div>`}if(migData.data.agentsMade){e+=`<div class="agents created">`;e+=`<div class="item-title"><p>${i18next.t("design_import.reports.agentsCreated")}</p></div>`;e+=`<ul>`;for(const H of migData.data.agentsMade){e+=`<li>${H.agentName}</li>`}e+=`</ul></div>`}let a=[];let s=[];let l=[];let r=true;let n=[];for(const T of i.data.formsArray){r=true;if(T.formFields.filter(t=>t.selected).length){let t=T.formUnid;let e=false;if(migData.data.formsMade){for(const D of migData.data.formsMade){if(D.formName==t){e=true}}}if(!e){r=false}for(const U of T.formFields){if(U.selected){let t=U.fieldUnid;let e=false;if(migData.data.fieldsMade){for(const V of migData.data.fieldsMade){if(V==t){e=true}}}if(!e){r=false}}}}n.push(r)}i.data.madeitFormIcons=n;let d=false;let c=[];for(const F of i.data.viewsArray){if(F.selected){let t=F.viewName;if(migData.data.viewsMade){for(const L of migData.data.viewsMade){if(L.viewName==t){d=true}}}}c.push(d)}i.data.madeitViewIcons=c;let g=[];for(let t of i.data.formsArray){if(t.existsInSchema){g.push(t)}}const m=resultConfig.getFormsResultConfig(o,g,n);i.data.formsArray=m.elementArray;a=m.output;let f=[];let p=[];if(m.failure.length>0){f.push(m.failure)}if(m.warning.length>0){p.push(m.warning)}let u="tabSuccessIcon";if(p.length>0){u="tabWarningIcon";e+=`<div class="warning">`;e+=`<div class="item-title"><p>${i18next.t("design_import.reports.warnings")}</p></div><ul>`;for(const P of p[0]){e+=`<li>${P}</li>`}e+=`</ul></div>`}if(f.length>0){u="tabFailIcon";e+=`<div class="failure">`;e+=`<div class="item-title"><p>${i18next.t("design_import.reports.failures")}</p></div>`;e+=`<ul>`;for(const J of f[0]){e+=`<li>${J}</li>`}e+=`</ul></div>`}let x=[];const h=resultConfig.getViewsResultConfig(o,i.data.viewsArray,c);i.data.viewsArray=h.elementArray;s=h.output;if(h.failure.length>0){x.push(h.failure)}let v="tabSuccessIcon";if(x.length>0){v="tabFailIcon"}let w="tabSuccessIcon";if(migData.data.agentsMade){let t=[];const N=resultConfig.getAgentsResultConfig(o,i.data.agentsArray);i.data.agentsArray=N.elementArray;l=N.output;if(N.failure.length>0){t.push(l.failure)}if(t.length>0){w="tabFailIcon"}}const E=tabConfig.getTabConfig(o,DESIGN_OBJECTS.FORMS,i,a);const R=tabConfig.getTabConfig(o,DESIGN_OBJECTS.VIEWS,i,s);let b;b=tabConfig.getTabConfig(o,DESIGN_OBJECTS.AGENTS,i,l);let y=new Date(Date.now());let S=require("fs");let z=require("path");let W="resultsReport-"+t+"-"+_kgb_.currentProject.projectName+"-"+y.getFullYear()+"-"+(y.getMonth()+1)+"-"+y.getDate()+"-"+y.getHours()+"-"+y.getMinutes()+".html";let C=config.logsDir+"/DesignImportResults/";let $=C+"Result/";const O=[C,$];O.forEach(t=>{if(!S.existsSync(t)){S.mkdirSync(t);logger.info(`${i18next.t("design_import.mxgo")} directory created successfully: ${t}`)}});let _=z.resolve($,W);try{S.truncateSync(_)}catch(t){}let q=`          
  body {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    padding: 15px 10px;
    word-break: break-word;
    color: #313131;
    background-color: #ebeef0;
    letter-spacing: 0.2px;
  }
  div {
    border: 2px solid #ced4d9;
    border-radius: 10px;
    margin-bottom: 18px;
  }
  .two-columns {
    columns: 2;
  }
  .item-div {
    padding-left: 14px;
    border: 0;
    border-bottom: 1px solid #ced4d9;
    border-radius: 0;
  }
  .item-elements {
    padding-left: 20px;
    border: none;
  }
  .created > .item-div:last-child {
    border-bottom: 0;
  }
  .item-title {
    font-weight: 600;
    background-color: #ced4d9;
    padding-left: 14px;
    margin-top: 0px;
    padding-right: 14px;
    border-radius: 0;
  }
  p.none-selected {
    color: #313131 !important;
  }
  div.created > p {
    color: #109d04;
  }
  div.warning > p {
    color: #d3a400;
  }
  div.failure > p {
    color: #e26464;
  }
  div.created > ul,
  div.warning > ul,
  div.failure > ul {
    margin-right: 14px;
  }
  div.forms > ul > ul {
    line-height: 1.6;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
    margin-bottom: 10px;
  }
  div.forms > ul > li {
    margin-bottom: 10px;
  }
  div.log-file {
    overflow: hidden;
    margin: 0;
  }
  #resultsLocation {
    margin: 14px;
  }
  div.log-file > hr {
    border: 1px solid #ced4d959;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 0px;
  }
  div.log-file > button {
    float: right;
    border-radius: 4px;
    text-align: center;
    word-break: break-word;
    white-space: pre-wrap;
    background: #273641;
    border: 1px solid #b4bdc1;
    color: #fff;
    cursor: pointer;
    margin: 14px;
    font-weight: 500;
    height: 30px;
    width: 90px;
    padding: 0;
    font-size: 12px;
  }
  div.log-file > button:hover {
    background-color:#01549b;
    transition: 0.7s;
  }`;let G=`
  let text = document.getElementById('resultsLocation').innerHTML;
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }`;let j=`
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${i18next.t("design_import.reports.resultsReport")} (Scope: ${t})</title>
      <link rel="stylesheet" href="style.css">
      <style>${q}</style>
    </head>
    <body>
      ${e}
      <div class="log-file">
        <div class="item-title">
        <p>${i18next.t("design_import.reports.resultsLoggedTo")}</p>
        </div>
        <p id="resultsLocation">${_}</p>
        <hr>
        <button type="button" onclick="copyContent()">Copy Path</button>
      </div>
      <script>${G}</script>
    </body>
  </html>`;S.appendFile(_,j,function(t){if(t)throw t;logger.info(`${i18next.t("design_import.mxgo")} Result Report Created! ${_}`)});let B=`
  <a href="file://${_}" target="_blank";">
    <span style="text-decoration: underline; font-style: italic; margin-right: 2px; line-height: 16.41px; font-size: 14px">${i18next.t("design_import.reports.clickHereToView")}</span>
    <img src="images/generic/icons/externalLink.svg">
  </a>`;logger.trace(`${i18next.t("design_import.mxgo")} wizard ${JSON.stringify(pcUtils.maskEntryInLog(i,["data.identityService.appSecret"]))}`);return{view:"layout",id:o,classList:[CSS_CLASS.STEP],rows:[{id:`${o}-header`,itemStyle:`display: contents; flex-direction: column; align-items: center; width: 100%;`,elements:[pcUtils.getCloseButtonConfig.call(i,{idPrefix:o,wizard:i}),pcUtils.getStepsConfig.call(i,{totalSteps:totalSteps,currentStepNumber:currentStepNumber})]},{id:`${o}-content`,itemStyle:`width: 100%; margin-bottom: auto; overflow-y: scroll; overflow-x: scroll; -ms-overflow-style: none; scrollbar-width: none;`,elements:[{view:"layout",id:`${o}-content1`,cssText:"margin: 0;",cellStyle:"width: 100%;",rows:[{itemStyle:`margin: 20px 0 0 0; width: 100%; display: flex; justify-content: space-between;`,elements:[{view:"label",id:`${o}-title`,text:`${i18next.t("design_import.buildAppDone")}`,classList:[CSS_CLASS.STEP_TITLE],cellStyle:"flex: 1",cssText:"font-size: 18px; margin: 0; font-weight: 600; width: auto; text-align: left; color: #313131"},{view:"html",id:`${o}-logs-created-html`,html:B,tooltip:`${i18next.t("design_import.openReports")}: ${i18next.t("design_import.reports.pleaseCheckResult").toLowerCase()}`,classList:[CSS_CLASS.STEP],cellStyle:"flex: 1",cssText:"margin: 0; padding: 0; width: auto; display: flex; justify-content: flex-end;"}]}]},{view:"layout",id:`${o}-content2`,cssText:"margin: 0;",cellStyle:"width: 100%;",rows:[{itemStyle:`width: 100%; height: 100%; align-items: flex-start; margin-top: 16px;`,elements:[{id:`${o}-tabview`,cssText:"margin: 0;",view:"tabview",tabs:[E,R,b],onActiveTabChange:function(){let t=this.tabs[this.activeTab].tabKey},activeTab:0,cellStyle:"width: 100%;"}]}]},{view:"layout",id:`${o}-content3`,cssText:"margin: 0;",cellStyle:"width: 100%;",rows:[{elements:[{view:"html",id:`${o}-html`,html:`<style> 
                      #result .step{
                        box-shadow: none ;
                      }
                      .step .view-layout-content{
                        align-items: flex-start !important;
                      }

                      #result-tabview .tabSuccessIcon {
                        background-image: url(images/generic/icons/successIcon.svg);
                        background-repeat: no-repeat;
                        background-position-y: center;
                        background-position-x: 70px;
                      }
                        
                      #result-tabview .tabWarningIcon {
                        background-image: url(images/generic/icons/Warning.svg);
                        background-repeat: no-repeat;
                        background-position-y: center;
                        background-position-x: 70px;
                      }

                      #result-tabview .tabFailIcon {
                        background-image: url(images/generic/icons/failureIcon.svg);
                        background-repeat: no-repeat;
                        background-position-y: center;
                        background-position-x: 80px;
                      }
                    </style>`}]}]}]},{id:`${o}-footer`,itemStyle:`display: flex; width: 100%;`,elements:[{view:"button",id:`${o}-back-button`,text:i18next.t("design_import.back"),cellStyle:"display: flex; width: 50%; justify-content: flex-start;",cssText:"font-size: 16px; margin: 0; width: 66px; height: 31px; display: none;",onClick:function(){}},{view:"button",id:`${o}-next-button`,text:`${i18next.t("design_import.done")}`,classList:[CSS_CLASS.HIGHLIGHTED_BUTTON],cellStyle:"display: flex; width: 50%; justify-content: flex-end;",cssText:"font-size: 16px; margin: 0; width: 70px; height: 31px;",onClick:async function(){logger.info(`${i18next.t("design_import.mxgo")} selected 'Done'!`);await kprojectReloader.reload({whats:["forms","controllers"]});i.complete({})}}]}],onAfterRender:function(){for(let[t,e]of i.data.formsArray.entries()){if(e.formFields.filter(t=>t.selected).length){let t=pcUtils.getView(`${o}-formUnid-${e.formUnid}-collapseArrow`);if(t){t?.view?.firstChild?.classList?.add("toggle");t?.view?.lastElementChild?.classList?.add("lbl-toggle")}}}for(let[t,e]of i.data.viewsArray.entries()){if(e?.viewActions?.filter(t=>t.selected).length){let t=pcUtils.getView(`${o}-viewUnid-${e.viewUnid}-collapseArrow`);if(t){t?.view?.firstChild?.classList?.add("toggle");t?.view?.lastElementChild?.classList?.add("lbl-toggle")}}}let t=pcUtils.getView(`${o}-tabview`);if(migData.data.formsMade){t.view.firstElementChild.firstElementChild.children[0].classList.add(`${u}`)}if(migData.data.viewsMade){t.view.firstElementChild.firstElementChild.children[1].classList.add(`${v}`)}if(migData.data.agentsMade){t.view.firstElementChild.firstElementChild.children[2].classList.add(`${w}`)}}}}module.exports={get:get};