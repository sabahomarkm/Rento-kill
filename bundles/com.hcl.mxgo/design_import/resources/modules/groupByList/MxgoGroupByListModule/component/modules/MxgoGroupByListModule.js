
const MXGO_GROUPBYLIST_MODULE = {

  integrationname: "",
  scope: "",
  channel: "",

  getIntegrationService() {
    let integrationSvc;

    if (this.integrationname === "" || this.integrationname === undefined) {
      voltmx.application.dismissLoadingScreen();
      voltmx.ui.Alert(
        {
          alertType: constants.ALERT_TYPE_ERROR,
          message: "Integration service name is not provided."
        },
        {
          iconPosition: constants.ALERT_ICON_POSITION_LEFT
        }
      );
      return;
    }

    try {
      integrationSvc = voltmx.sdk.getCurrentInstance().getIntegrationService(this.integrationname);
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

    return integrationSvc;
  },

  goToDetailsForm(formName, unid, integrationSvc) {

    function formatObjectModelName(objectname) {
      if (!objectname.length) {
        return false;
      }
      let newObjName = objectname.replace(/[^a-zA-Z0-9]/g, '');
      return newObjName;
    };

    if (!formName || !unid || !this.scope) {
      voltmx.ui.Alert(
        {
          alertType: constants.ALERT_TYPE_ERROR,
          message: "Form name or UNID is not provided."
        },
        {
          iconPosition: constants.ALERT_ICON_POSITION_LEFT
        }
      );
      return;
    }

    voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

    let params = {
      DESIGNNAME: formName,
      SCOPE: this.scope
    };

    integrationSvc.invokeOperation(
      'getDesignFormByName',
      {},
      params,
      function (response) {
        voltmx.application.dismissLoadingScreen();
        if (response && response.httpStatusCode === 200) {
          try {
            let form = formatObjectModelName(response['@name']);
            let formName = "frm" + form + "Details";
            let isFormExist = voltmx.mvc.registry.getControllerName(formName);

            // use x_0040form as form name for renamed domino form in DRAPI
            let formx0040 = formatObjectModelName(formName);
            let formNamex0040 = "frm" + formx0040 + "Details";
            let isFormExistx0040 = voltmx.mvc.registry.getControllerName(formNamex0040);

            if (isFormExist) {
              let ntf = new voltmx.mvc.Navigation(formName);
              let myObj = { dominoviewunid: unid };
              ntf.navigate(myObj);
            } else if (isFormExistx0040) {
              let ntf = new voltmx.mvc.Navigation(formNamex0040);
              let myObj = { dominoviewunid: unid };
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
          } catch (e) {
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
