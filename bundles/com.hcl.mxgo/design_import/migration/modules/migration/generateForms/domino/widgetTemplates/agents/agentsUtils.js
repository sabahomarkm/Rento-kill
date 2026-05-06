const designImportMigration=require("../../../../../../design_import_migration");const foundryConstants=require("../../../../foundry/constants");function codeSnippetSrcForIntService(e,n,t){return`
      this.view.flexAgentComponentDropdown.setVisibility(!this.view.flexAgentComponentDropdown.isVisible);
      var objService = '${e}';
      var intServScope = objService ? objService.split("_") : [];
      if (intServScope && intServScope.length != 2) {
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
      voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {}); var integrationSvc;
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
        SCOPE: intServScope[1],
        agentName: '${n}'
      };
      integrationSvc.invokeOperation(
        '${foundryConstants.INT_SERVICE_KEEPAPI_OP.RUN_SERVER_AGENT}',
        {},
        params,
        function (response) {
          if (response && response.httpStatusCode === 200) {
            alert("Done running agent!");
            var ntf = new voltmx.mvc.Navigation("${t}");
            ntf.navigate();
          } else if (response && response.httpStatusCode === 500 && response.message) {
            alert(response.message);
          } else {
            alert("Error running agent: " + JSON.stringify(response));
          }
        
          console.log(response);
          voltmx.application.dismissLoadingScreen();
        },
        function (error) {
          voltmx.application.dismissLoadingScreen();
          var errormsg = error.message ? error.message : error.errmsg;
          voltmx.ui.Alert(
            {
              alertType: constants.ALERT_TYPE_ERROR,
              message: errormsg
            },
            {
              iconPosition: constants.ALERT_ICON_POSITION_LEFT
            }
          );
        }
      );`}module.exports={codeSnippetSrcForIntService:codeSnippetSrcForIntService};