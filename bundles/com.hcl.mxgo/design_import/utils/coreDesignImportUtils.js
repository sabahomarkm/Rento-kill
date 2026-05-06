let ns={};ns.getAddSnippetCodeForGroupByList=function(r,t,o,a,n,i,c,s){try{let e="";if(!r?.serviceconfig?.objectname||!n||!a){return""}if(c){e=`
      self.view.${n}.records = ${r.serviceconfig.objectname}.records;
      MXGO_GROUPBYLIST_MODULE.integrationname = "${a}";
      MXGO_GROUPBYLIST_MODULE.scope = "${i}";
      MXGO_GROUPBYLIST_MODULE.channel = "${s}";
      `}else{e=ns.getAddSnippetCodeForTabulator(r,t,o,n)}return e}catch(e){throw new Error("Error generating code snippet for Group By List: "+e.message)}};ns.getAddSnippetCodeForTabulator=function(r,t,o,a){try{let e="";if(!r?.serviceconfig?.objectname||!t||!a){return""}e=`
        var objSvc = voltmx.sdk.getCurrentInstance().getObjectService("${r.serviceconfig.servicename}", {
            "access": "online"
        });

        objSvc.getMetadataOfAllObjects({},
        function(response) {
            var objectColumns = response["${r.serviceconfig.objectname}"].columns;

            var finalCol = this.getColumns(objectColumns);
            var groupByCol = this.getGroupByColumnByMetadata(objectColumns);
            
            var tabulatorArray = this.formatIndexIntoTabulatorArray(${r.serviceconfig.objectname}.records);
            
            var objService = "${r.serviceconfig.servicename}";

            var fieldsWithArray = this.extractKeyValueWithArray(${r.serviceconfig.objectname}.records);
            var viewGrid = "${t}";
            var showDataTree = ${o};
            var intServScope = objService ? objService.split("_") : [];
            var rowdatatemp = JSON.stringify(tabulatorArray);
            var finalColStr = JSON.stringify(finalCol);
            self.view.${a}.evaluateJavaScript(\`this.initTabulator(\` + rowdatatemp + \`, \` + finalColStr + \`, \'\${objService}\', \'\${viewGrid}\', \` + showDataTree + \`, \'\${groupByCol}\', \'\${fieldsWithArray}\')\`);
        },
        function(error) {
            voltmx.print("Error in metadata: " + JSON.stringify(error));
            return null;
        });
        
    `;return e}catch(e){throw new Error("Error generating code snippet for Tabulator: "+e.message)}};module.exports=ns;