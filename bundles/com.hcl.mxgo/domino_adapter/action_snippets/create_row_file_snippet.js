const adapterConstants=require("../constants/domino_adapter_constants");const utils=require("../utils/domino_adapter_utils");let ns={};ns.generateCreateRowFileSnippet=function(){return class e{getId(e){let t=[];t.push(e);t.push(utils.getKGBValue(adapterConstants.KGB_KEYS.CREATE_ROW_FILE));return t.join(adapterConstants.SNIPPET_ACTION.JOIN)}constructor(){this.setDefault()}setDefault(){this.addSnippetAction={id:this.getId(adapterConstants.SNIPPET_ACTION.ADD_SNIPPET),codeSnippet:adapterConstants.SNIPPET_ACTION.EMPTY,type:adapterConstants.SNIPPET_ACTION.ADD_SNIPPET}}setAddSnippetCode(){let e=`//To have conditions on only to create row file if not yet existing
            manageRowFile = (filesContainer, file, fieldName = "") => {

                //To get the base64 value of a file
                const convertFileToBase64 = (file, cb) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            let base64result = reader.result;
                            if (base64result) {
                                let base64string = base64result.substr(base64result.indexOf(',') + 1);
                                cb(base64string);
                                resolve();
                            }
                        };
                        reader.onerror = () => {
                            voltmx.application.dismissLoadingScreen();
                            voltmx.print("Failed: " + JSON.stringify(e));
                            voltmx.ui.Alert({
                                "alertType": constants.ALERT_TYPE_ERROR,
                                "message": "Failed to post attachments!",
                            }, {
                                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                            });
                            cb();
                            reject();
                        };
                    });
                };
                let fileId = btoa(file.name);
                let toAdd = false;
                let toUpdate = false;
                if (files.length !== 0) {
                    const fileIds = Array.from(files, ({ id }) => id);
                    if (!fileIds.includes(fileId)) {
                        toAdd = true;
                    } else {
                        if (confirm("A file is already existing. Would you like to overwrite?") === true) {
                            toAdd = true;
                            toUpdate = true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    toAdd = true;
                }
                if (toAdd) {
                    convertFileToBase64(file, (value) => {
                        if (value) {
                            if (toUpdate) {
                                files = files.filter(item => item.fileName !== file.name);
                                let divFile = filesContainer.querySelector('[id="' + fileId + '"]');
                                divFile.remove();
                            }
                            files.push({
                                id: fileId,
                                fileBase64: value,
                                fileName: file.name,
                                fieldName: fieldName
                            });
            
                            createRowFile(filesContainer, fileId, file.name, formatFileSize(file.size), fieldName);
                        }
                    });
                }
            };
            
            //To create a row to display the file details on the file list section
            createRowFile = (filesContainer, fileId, fileName, fileSize, fieldName) => {
                let item = '<div id="' + fileId + '" style="padding:1rem; display:flex; ' +
                    'align-items:center; border-bottom:0.1rem solid #e5e5e5;">' +
                    '<span style="float:left; margin-right: 2rem; font-size:1.5rem; cursor:pointer; color:#6d6d6d;">✕</span>' +
                    '<div style="color:#333333; min-height:3.25rem; display:flex; align-items:center; justify-content:center; flex-direction:column;">' +
                    '<div style="display:flex;"><p class="file-name" style="font-size:1rem;">' + fileName + '</p>' +
                    '<p class="file-size" style="font-size:14px; font-style:italic; color:#808080; margin-left: 1rem;">(' + fileSize + ')</p></div>' +
                    '<p class="file-field-name" style="font-size:1rem; font-style:italic; color:#808080; line-height:1.5; letter-spacing:.5px; width:100%;">' + (fieldName ? fieldName : "") + '</p></div></div>';
                filesContainer.insertAdjacentHTML('beforeend', item);
            };
            
            //To display the size of the file
            formatFileSize = (bytes) => {
                const suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];
                const i = Math.floor(Math.log(bytes) / Math.log(1024));
                let result = (bytes / Math.pow(1024, i)).toFixed(2) + " " + suffixes[i];
                return result;
            };
            
            //To delete the row file from the file list section
            deleteFile = (fileId, filesContainer, view) => {
                let row = document.getElementById(fileId);
                let fileName = row.getElementsByClassName("file-name")[0].textContent;
                let fieldName = row.getElementsByClassName("file-field-name")[0];
                if (typeof fieldName !== "undefined" && fieldName.textContent !== "") {
                    let property = "instance" + fieldName.textContent;
                    let field = view[property];
                    if (field) {
                        field.checkOrRemoveFile(fileName, true);
                    }
                }
                row.remove();
                files = files.filter(file => file.id != fileId);
                if (!files || files.length === 0) {
                    filesContainer.style.background = "none";
                }
            };`;this.addSnippetAction.codeSnippet=e}toActions(){return[this.addSnippetAction]}}};module.exports=ns;