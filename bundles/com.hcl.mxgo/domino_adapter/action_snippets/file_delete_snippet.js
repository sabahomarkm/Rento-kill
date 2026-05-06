const adapterConstants=require("../constants/domino_adapter_constants");const utils=require("../utils/domino_adapter_utils");let ns={};ns.generateDeleteFilesSnippet=function(){return class t{getId(t){let e=[];e.push(t);e.push(utils.getKGBValue(adapterConstants.KGB_KEYS.FILE_DELETE));return e.join(adapterConstants.SNIPPET_ACTION.JOIN)}constructor(){this.setDefault()}setDefault(){this.addSnippetAction={id:this.getId(adapterConstants.SNIPPET_ACTION.ADD_SNIPPET),codeSnippet:adapterConstants.SNIPPET_ACTION.EMPTY,type:adapterConstants.SNIPPET_ACTION.ADD_SNIPPET}}setAddSnippetCode(){let t=`const target = event.target.closest("#filesContainer div span");
				var filesContainer = document.querySelector("#filesContainer");
				if (target) {
					if (confirm("You are about to remove this file. Are you sure?") === true) {
						deleteFile(target.parentElement.id, filesContainer, self.view);
					} else {
						return false;
					}
				}`;this.addSnippetAction.codeSnippet=t}toActions(){return[this.addSnippetAction]}}};module.exports=ns;