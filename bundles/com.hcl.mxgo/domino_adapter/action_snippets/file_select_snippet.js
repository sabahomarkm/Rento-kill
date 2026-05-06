const adapterConstants=require("../constants/domino_adapter_constants");const utils=require("../utils/domino_adapter_utils");let ns={};ns.generateSelectFilesSnippet=function(){return class t{getId(t){let e=[];e.push(t);e.push(utils.getKGBValue(adapterConstants.KGB_KEYS.SELECT_FILE));return e.join(adapterConstants.SNIPPET_ACTION.JOIN)}constructor(){this.setDefault()}setDefault(){this.addSnippetAction={id:this.getId(adapterConstants.SNIPPET_ACTION.ADD_SNIPPET),codeSnippet:adapterConstants.SNIPPET_ACTION.EMPTY,type:adapterConstants.SNIPPET_ACTION.ADD_SNIPPET}}setAddSnippetCode(){let t=`var fileInput = document.querySelector("#fileUpload");
			var filesContainer = document.querySelector("#filesContainer");
			fileInput.click();
			
			fileInput.addEventListener("change", function (e) {
				e.stopImmediatePropagation();
				if (fileInput.files) {
					for (var file of fileInput.files) {
						manageRowFile(filesContainer, file);
					}
				}
			});`;this.addSnippetAction.codeSnippet=t}toActions(){return[this.addSnippetAction]}}};module.exports=ns;