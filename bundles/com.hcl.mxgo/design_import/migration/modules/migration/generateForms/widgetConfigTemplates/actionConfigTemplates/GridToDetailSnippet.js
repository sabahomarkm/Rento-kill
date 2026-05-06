const designImportMigration=require("../../../../../design_import_migration");const foundryConstants=require("../../../foundry/constants");const _kgb_=designImportMigration.getMxgoUtils().utilFunctions._kgb_;const dpUtils=designImportMigration.getMxgoUtils().dataPanelFunctions.dpUtils;class GridToDetailSnippet{getId(e){let t=[];t.push(e);t.push(_kgb_.modules.utils.getKUID().toString());return t.join("_")}constructor(){this.setDefault()}setDefault(){this.addSnippetAction={id:this.getId("ADD_SNIPPET"),codeSnippet:"alert('test')",type:"ADD_SNIPPET"}}setAddSnippetCode(e,t,o,n){var i=`
		const objService = '${e}';
		const intServScope = objService ? objService.split("_") : [];
		function formatObjectModelName(objectname) {
			if(!objectname) {
				return false;
			}

			var newObjName = objectname.replace(/[^a-zA-Z0-9]/g, '');
			return newObjName;
		 };


		if ((intServScope && intServScope.length != 2) || !self.view.${n}.text) {
			voltmx.ui.Alert(
				{
					alertType: constants.ALERT_TYPE_ERROR,
					message: "Missing parameters: object name or form name"
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
		} catch(e) {
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
			DESIGNNAME: self.view.${n}.text,
			SCOPE: intServScope[1]
		};

		integrationSvc.invokeOperation(
			'${foundryConstants.INT_SERVICE_KEEPAPI_OP.GET_DESIGN_FORM_BY_NAME}',
			{},
			params,
			function (response) {
				voltmx.application.dismissLoadingScreen();
				if (response && response.httpStatusCode === 200) {
					try {
						var form = formatObjectModelName(response['@name']);
						var formName = "frm" + form + "Details";
						var isFormExist = voltmx.mvc.registry.getControllerName(formName);
						if (isFormExist) {
							var ntf = new voltmx.mvc.Navigation(formName);
							var myObj = {${foundryConstants.DOMINO_NAVCONTEXT_VIEWUNID}: self.view.${o}.text};
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
				} else {
					console.log(response);
					alert(JSON.stringify(response));
				}
				
			},
			function (error) {
				voltmx.application.dismissLoadingScreen();
				console.log(error);
				voltmx.ui.Alert(
					{
						alertType: constants.ALERT_TYPE_ERROR,
						message: "Failed to extract form name: "  + error.errmsg
					},
					{
						iconPosition: constants.ALERT_ICON_POSITION_LEFT
					}
				);
			}
		);

		`;this.addSnippetAction.codeSnippet=i}toActions(){return[this.addSnippetAction]}}module.exports={GridToDetailSnippet:GridToDetailSnippet};