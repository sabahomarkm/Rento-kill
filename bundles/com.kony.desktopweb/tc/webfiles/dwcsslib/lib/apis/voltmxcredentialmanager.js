Object.defineProperty(voltmx, 'credentialmanager', {configurable:false, enumerable:false, writable:false, value: (function() {
    /*
        abortController: This is used for abort the controller if user hit the autofill but at the same time try to go with manual signin or register passkey; it throws an error
        isAutofillRequestPending: This checks that is any request is in pending or not before calling other request     
    */
    var _ns = {}, _map = {}, $K = voltmx.$kwebfw$, abortController, isAutofillRequestPending = false;

    var base64url = {
        encode: function(buffer) {
            const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
            return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
        },
        decode: function(base64url) {
            const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
            const binStr = window.atob(base64);
            const bin = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) {
            bin[i] = binStr.charCodeAt(i);
            }
            return bin.buffer;
        }
    };

    // Check if conditional mediation is available
    var isConditionalMediationAvailable = function() {
        const pubKeyCred = window.PublicKeyCredential;
        return (
            typeof pubKeyCred.isConditionalMediationAvailable === "function" &&
            pubKeyCred.isConditionalMediationAvailable()
        );
    };

    //decodeBase64Fields -> It decode the response into the base64Url which is used to create the passkey key in credential manager
    const decodeBase64Fields = (response) => {
        response.challenge = base64url.decode(response.challenge);
        response.user.id = base64url.decode(response.user.id);
        if (response.excludeCredentials) {
            response.excludeCredentials = response.excludeCredentials.map(cred => ({
                ...cred,
                id: base64url.decode(cred.id)
            }));
        }
        return response;
    };
    
    //encodeCredentialFields -> It encode credential which is generated through creating passkey and send to the successcall back 
    const encodeCredentialFields = (credential) => {
        credential.rawId = base64url.encode(credential.rawId);
        credential.response.attestationObject = base64url.encode(credential.response.attestationObject);
        credential.response.clientDataJSON = base64url.encode(credential.response.clientDataJSON);
    };

    //decodeChallenge -> It is used to decode the challenge while doing singin passkey
    function decodeChallenge(challenge) {
        return base64url.decode(challenge);
    }
    
     //mapCredentials -> It is used to map the allowCredentials while doing singin passkey
    function mapCredentials(credentials) {
        return credentials.map(cred => ({
            type: 'public-key',
            id: new Uint8Array(base64url.decode(cred.id))
        }));
    }

    //prepareCredentialResponse -> It is user for preparing the credential response after authenticating the passkey while doing singin 
    async function prepareCredentialResponse(cred) {
        return {
            id: cred.id,
            rawId: base64url.encode(cred.rawId),
            type: cred.type,
            response: {
                authenticatorData: base64url.encode(cred.response.authenticatorData),
                clientDataJSON: base64url.encode(cred.response.clientDataJSON),
                signature: base64url.encode(cred.response.signature),
                userHandle: cred.response.userHandle ? base64url.encode(cred.response.userHandle) : undefined
            }
        };
    }
    
    /**
    * Returns error details based on the error code and passes it to the failure callback.
    * @param {number} errCode - The error code to process.
    * @param {number} extraDetail - The error message which we can pass in the failurecallback.
    */
    var handleError = function(errCode, extraDetail = '') {

        const errorMessages = {
            3001: 'AttestationOptions network URL response is either null or invalid JSON',
            3002: 'AssertionOptions network URL response is either null or invalid JSON',
            2011: 'passkey autofill is not supported'
        };
        let baseMsg = errorMessages[errCode];

        const errorResponse = {
            errorCode: errCode,
            errorMessage: baseMsg
                ? (extraDetail ? `${baseMsg} - ${extraDetail}` : baseMsg)
                : `${errCode}: ${extraDetail || 'Unhandled error'}`
        };

        return errorResponse;
    };

    var validateCreatePasskeyRegistrationSignin = function(options, successCallback, failureCallback) {
        const errors = [];
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
    
        // Validate attestationOptions
        if (!options && !$KU.is(options, 'object')) {
            errors.push('Options is missing.');
        } 
    
        // Validate onSuccess and onFailure callbacks
        if (!$KU.is(successCallback, 'function')) {
            errors.push('successCallback is required and must be a function.');
        }
        if (!$KU.is(failureCallback, 'function')) {
            errors.push('failureCallback is required and must be a function.');
        }
    
        // Return the errors if there are any, otherwise return true
        if (errors.length > 0) {
            return {
                valid: false,
                errors: errors
            };
        } else {
            return { valid: true };
        }
    };


    var _createPasskeyRegistrationRequest = async function(attestationOptionsResponse, successCallback, failureCallback) {    
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        if(isAutofillRequestPending) {
            handleAbort();
        }
        try {
            const validationResult = validateCreatePasskeyRegistrationSignin(attestationOptionsResponse, successCallback, failureCallback);
            if (!validationResult.valid) {
                voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                failureCallback(handleError(3001));
                return;
            } else {
                // Extract required parameters from attestationOptionsResponse
                attestationOptionsResponse = typeof(attestationOptionsResponse) === 'string' ? JSON.parse(attestationOptionsResponse) : attestationOptionsResponse;
        
                // Ensure required parameters are present
                const { rp, challenge, user } = attestationOptionsResponse;
                if (!(rp && rp.id && challenge && user && user.id && user.name)) {
                    voltmx.print('Missing required fields: rpId, challenge, userId, or name.');
                    failureCallback(handleError(3001));
                    return;
                }

                attestationOptionsResponse = decodeBase64Fields(attestationOptionsResponse);

                const credential = await navigator.credentials.create({
                    publicKey: attestationOptionsResponse
                });

                if (!credential) {
                    $KU.log('error', 'Credential creation returned null.');
                    return voltmx.print('Credential creation returned null.');
                }

                isAutofillRequestPending = false;
                encodeCredentialFields(credential);
                successCallback(credential);
            }            
        } catch (error) {
            // Handle failure by invoking failure callback with error
            if(error.name === "NotAllowedError"){
                failureCallback(handleError(voltmx.credentialmanager.USER_CANCELLED, error.message));
                return;
            }  else if(error.name === "InvalidStateError") {
                failureCallback(handleError(voltmx.credentialmanager.NOCREDENTIAL_ERROR,error.message));
                return;
            } else {
                failureCallback(handleError(voltmx.credentialmanager.UNKNOWN_ERROR, error.message));
                return;
            }
        }    
    };

    var _createPasskeySigninRequest = async function(assertionOptionsResponse, successCallback, failureCallback, isAutofill) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        try {        
            const validationResult = validateCreatePasskeyRegistrationSignin(assertionOptionsResponse, successCallback, failureCallback);
            if (!validationResult.valid) {
                voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                failureCallback(handleError(3002));
                return;
            } else {
                //check is isAutofill: true then check browser supported autofill or not 
                if(isAutofill) {
                    let browserAutoFill  = await isConditionalMediationAvailable()
                    if(!browserAutoFill) {
                        voltmx.print("Autofill Passkey Service is not supported in the browser.");
                        failureCallback(handleError(voltmx.credentialmanager.AUTOFILL_NOT_SUPPORTED));
                        return;
                    }
                }
                // Extract required parameters from assertionOptionsResponse
                assertionOptionsResponse = typeof(assertionOptionsResponse) === 'string' ? JSON.parse(assertionOptionsResponse) : assertionOptionsResponse;
                const rpId = assertionOptionsResponse.rpId; // Relying Party Identifier
                const challenge = decodeChallenge(assertionOptionsResponse.challenge); // Convert base64 to Uint8Array

                if (!rpId || !challenge) {
                    voltmx.print("Invalid RP ID or challenge.");
                    failureCallback(handleError(3002));
                    return;
                }

                assertionOptionsResponse.challenge = challenge;
                if (assertionOptionsResponse.allowCredentials) {
                    assertionOptionsResponse.allowCredentials = mapCredentials(assertionOptionsResponse.allowCredentials);
                }

                // Cancel previous autofill request if still pending
                if (isAutofillRequestPending) {
                    handleAbort();
                }

                const mediation = isAutofill ? "conditional" : "required";
                
                if (isAutofill) {
                    abortController = new AbortController();
                    isAutofillRequestPending = true;
                }


                const cred = await navigator.credentials.get({
                    publicKey: assertionOptionsResponse,
                    mediation,
                    signal: abortController ? abortController.signal : undefined
                });

                abortController = null;
                isAutofillRequestPending = false;

                // if (!cred) {
                //     voltmx.print("Credential assertion returned null.");
                //     handleError(voltmx.credentialmanager.NOCREDENTIAL_ERROR, failureCallback);
                //     return;
                // }

                const response = await prepareCredentialResponse(cred);
                successCallback(response);
                
            }            
        } catch (error) {
            abortController = null;
            isAutofillRequestPending = false;
            voltmx.print(`Error in createPasskeySigninRequest: ${error}`);
            if(error.name !== "AbortError") {
                if(error.name === "NotAllowedError"){
                    failureCallback(handleError(voltmx.credentialmanager.USER_CANCELLED, error.message));
                    return;
                } else if (error.name === "InvalidStateError") {
                    failureCallback(handleError(voltmx.credentialmanager.NOCREDENTIAL_ERROR, error.message));
                    return;
                } else {
                    failureCallback(handleError(voltmx.credentialmanager.REQUEST_FAILED, error.message));
                    return;
                }
            } else {
                voltmx.print(`${error.message}`);
                return;
            }
        }
    };

    var validatePasskeyObject = function (passkeyObject, type) {
        let errors = [];
        var $K = voltmx.$kwebfw$, $KU = $K.utils;
        // Helper function to validate the presence and type of required fields
        function validateField(obj, fieldName, expectedType, parentPath) {
            const fullPath = parentPath ? `${parentPath}.${fieldName}` : fieldName;
            if (!obj.hasOwnProperty(fieldName)) {
                errors.push(`${fullPath} is required.`);
            } else if (!isValidType(obj[fieldName], expectedType)) {
                errors.push(`${fullPath} must be a ${expectedType}.`);
            }
        }
    
        // Helper function to validate object types
        function isValidType(value, expectedType) {
            switch (expectedType) {
                case "string":
                    return $KU.is(value, "string");
                case "object":
                    return $KU.is(value, "object") || value === null || Array.isArray(value);
                case "function":
                    return $KU.is(value, "function");
                default:
                    return false;
            }
        }
    
        // Helper function to validate an options object (attestationOptions/assertionOptions)
        function validateOptions(options, optionType) {
            if (!isValidType(options, "object")) {
                errors.push(`${type}.${optionType} must be a non-null object.`);
                return;
            }
            validateField(options, "url", "string", `${type}.${optionType}`);
            validateField(options, "headers", "object", `${type}.${optionType}`);
            validateField(options, "body", "object", `${type}.${optionType}`);
    
            if (
                options.body &&
                options.body.hasOwnProperty("userName") &&
                !isValidType(options.body.userName, "string")
            ) {
                errors.push(`${type}.${optionType}.body.userName must be a string.`);
            }
        }
    
        // Helper function to validate a results object (attestationResults/assertionResults)
        function validateResults(results, resultType) {
            if (!isValidType(results, "object")) {
                errors.push(`${type}.${resultType} must be a non-null object.`);
                return;
            }
            validateField(results, "url", "string", `${type}.${resultType}`);
            validateField(results, "headers", "object", `${type}.${resultType}`);
        }
    
        // Validate attestationOptions or assertionOptions
        if (passkeyObject.attestationOptions) {
            validateOptions(passkeyObject.attestationOptions, "attestationOptions");
        } else if (passkeyObject.assertionOptions) {
            validateOptions(passkeyObject.assertionOptions, "assertionOptions");
        } else {
            errors.push(`${type} must include either attestationOptions or assertionOptions.`);
        }
    
        // Validate attestationResults or assertionResults
        if (passkeyObject.attestationResults) {
            validateResults(passkeyObject.attestationResults, "attestationResults");
        } else if (passkeyObject.assertionResults) {
            validateResults(passkeyObject.assertionResults, "assertionResults");
        } else {
            errors.push(`${type} must include either attestationResults or assertionResults.`);
        }
    
        // Validate onSuccess and onFailure callbacks
        validateField(passkeyObject, "onSuccess", "function", type);
        validateField(passkeyObject, "onFailure", "function", type);
    
        // Validate username if autofill is false or not present

        // if (passkeyObject.autofill !== true) {
        //     const options = passkeyObject.attestationOptions || passkeyObject.assertionOptions;
        //     if (options && (!options.body || !isValidType(options.body.userName, "string")) || options.body.userName === "") {
        //         errors.push(`${type}.body.userName is required and must be a string when autofill is false.`);
        //     }
        // }
    
        // Return validation results
        if (errors.length > 0) {
            return {
                valid: false,
                errors: errors,
            };
        } else {
            return { valid: true };
        }
    };

    /**
    * Register a passkey using WebAuthn API.
    * @param {Object} passkeyRegistrationObject
    */
    var _registerPasskey = async function (passkeyRegistrationObject) {
        if(isAutofillRequestPending) {
            handleAbort();
        }
        try {
            const validationResult = validatePasskeyObject(passkeyRegistrationObject, "passkeyRegistrationObject");
            if (!validationResult.valid) {
                voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                passkeyRegistrationObject.onFailure(handleError(voltmx.credentialmanager.INVALID_INPUT_PARAMETERS, validationResult.errors))
                return;
            } else {
                // Step 1: Fetch Attestation Options from the server
                let type = 'registerPasskey'
                let attestationOptionsResponse = await fetchOptions(
                    passkeyRegistrationObject.attestationOptions,
                    passkeyRegistrationObject.onFailure,
                    type
                );

                attestationOptionsResponse = decodeBase64Fields(attestationOptionsResponse);

                // Step 2: Use WebAuthn to create a new credential (generating clientDataJSON and attestationObject)
                
                const cred = await navigator.credentials.create({
                    publicKey: attestationOptionsResponse  // Pass the server's attestation options here
                });

                isAutofillRequestPending = false;

                voltmx.print(`cred.id =>>  : ${cred.id}`);
                
                encodeCredentialFields(cred);
        
                // Step 3: If successful, send attestation results back to the server
                const attestationResultsResponse = await sendResults(
                    cred, 
                    passkeyRegistrationObject.attestationResults,
                    passkeyRegistrationObject.onFailure, type
                );

                voltmx.print(`attestationResultsResponse ->>>>> : ${JSON.stringify(attestationResultsResponse)}`);
        
                // Step 4: Call success callback if registration is successful
                passkeyRegistrationObject.onSuccess(attestationResultsResponse);
            }            
    
        } catch (error) {
            if(error.name === "NotAllowedError"){
                passkeyRegistrationObject.onFailure(handleError(voltmx.credentialmanager.USER_CANCELLED, error.message));
                return;
            } else if(error.name === "InvalidStateError") {
                passkeyRegistrationObject.onFailure(handleError(voltmx.credentialmanager.NOCREDENTIAL_ERROR, error.message));
                return;
            } else {
                passkeyRegistrationObject.onFailure(handleError(voltmx.credentialmanager.UNKNOWN_ERROR, error.message));
                return;
            }          
        }
    };

    /**
    * Sign in with a passkey using WebAuthn API.
    * @param {Object} passkeySigninObject
    */
    var _signinWithPasskey = async function (passkeySigninObject) {
        try {
            const validationResult = validatePasskeyObject(passkeySigninObject, "passkeySigninObject");
            if (!validationResult.valid) {
                voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                passkeySigninObject.onFailure(handleError(voltmx.credentialmanager.INVALID_INPUT_PARAMETERS, validationResult.errors));
                return;
            }
            const { autofill, onSuccess, onFailure, assertionOptions, assertionResults } = passkeySigninObject; 
            //check is autofill: true then check browser supported autofill or not 
            if(autofill) {
                let browserAutoFill  = await isConditionalMediationAvailable()
                if(!browserAutoFill) {
                    voltmx.print("Autofill Passkey Service is not supported in the browser.");
                    passkeySigninObject.onFailure(handleError(voltmx.credentialmanager.AUTOFILL_NOT_SUPPORTED));
                    return;
                }
            }
            const type = "signinPasskey";
            const assertionOptionsResponse = await fetchOptions(assertionOptions, onFailure, type);                
            assertionOptionsResponse.challenge = decodeChallenge(assertionOptionsResponse.challenge);
            if (assertionOptionsResponse.allowCredentials) {
                assertionOptionsResponse.allowCredentials = mapCredentials(assertionOptionsResponse.allowCredentials);
            }

            // Cancel previous autofill request if still pending
            if (isAutofillRequestPending) {
                handleAbort();
            }

            const mediation = autofill ? "conditional" : "required";
            if (autofill) {
                abortController = new AbortController();
                isAutofillRequestPending = true;
            }

            const cred = await navigator.credentials.get({
                publicKey: assertionOptionsResponse,
                mediation,
                signal: abortController ? abortController.signal : undefined
            });

            abortController = null;
            isAutofillRequestPending = false;

            // if (!cred) {
            //     voltmx.print("No credential returned.");
            //     handleError(voltmx.credentialmanager.NOCREDENTIAL_ERROR, onFailure);
            //     return;
            // }

            const response = await prepareCredentialResponse(cred);
            const result = await sendResults(response, assertionResults, onFailure, type);
            onSuccess(result);            
            
        } catch (error) {
            abortController = null;
            isAutofillRequestPending = false;
            voltmx.print(`Error during signinWithPasskey: ${error}`);
            if(error.name !== "AbortError") {
                if (error.name === "NotAllowedError") {
                    passkeySigninObject.onFailure(handleError(voltmx.credentialmanager.USER_CANCELLED, error.message));
                    return;
                } else if (error.name === "InvalidStateError") {
                    passkeySigninObject.onFailure(handleError(voltmx.credentialmanager.NOCREDENTIAL_ERROR, error.message));
                    return;
                } else {
                    passkeySigninObject.onFailure(handleError(voltmx.credentialmanager.REQUEST_FAILED, error.message));
                    return;
                }
            } else {
                voltmx.print(`${error.message}`);
                return;
            }
        }            
    }
    
    // Helper function to fetch Assertion Options from the server
    /**
     * Fetch attestation options from the server.
     * @param {Object} options
     * @returns {Promise<Object>}
    */
    var fetchOptions = async function (options, onFailure, type) {
        const response = await fetch(options.url, {
            method: 'POST',
            headers: options.headers,
            body: JSON.stringify(options.body)
        });
    
        if (!response.ok) {
            voltmx.print(`Failed to fetch assertion options: ${response.statusText}`);
            if(type == 'registerPasskey') {
                onFailure(handleError(3001, error.message));
                return;
            } else {
                onFailure(handleError(3002, error.message));
                return;
            }
        }
    
        return response.json();
    }
    
    // Helper function to send Assertion Results to the server
    /**
    * Send attestation results to the server.
    * @param {Object} optionsResponse
    * @param {Object} results
    * @returns {Promise<Object>}
    */
    var sendResults = async function (optionsResponse, results, onFailure, type) {
        const response = await fetch(results.url, {
            method: 'POST',
            headers: results.headers,
            body: JSON.stringify(optionsResponse)
        });
    
        if (!response.ok) {
            voltmx.print(`Failed to send assertion results: ${response.statusText}`);
            if(type == 'registerPasskey') {
                onFailure(handleError(3001, error.message));
                return;
            } else {
                onFailure(handleError(3002, error.message));
                return;
            }
        }
    
        return response.json();
    }

    var handleAbort = function () {
        if (abortController) {
            abortController.abort();
            abortController = null;
            isAutofillRequestPending = false;
            voltmx.print("Autofill mediation request aborted.");
        }
    }

    $K.defVoltmxProp(_ns, [
        {keey:'createPasskeyRegistrationRequest', value:_createPasskeyRegistrationRequest},
        {keey:'createPasskeySigninRequest', value:_createPasskeySigninRequest},
        {keey:'registerPasskey', value:_registerPasskey},
        {keey:'signinWithPasskey', value:_signinWithPasskey},
        {keey: 'INVALID_INPUT_PARAMETERS', value: 100,},
        {keey: 'REQUEST_FAILED', value: 2003},
        {keey: 'NOCREDENTIAL_ERROR', value: 2009},
        {keey: 'UNKNOWN_ERROR', value: 2000},
        {keey: 'USER_CANCELLED', value: 2001},
        {keey: 'AUTOFILL_NOT_SUPPORTED', value: 2011},        
    ]);

    return _ns;

}())});