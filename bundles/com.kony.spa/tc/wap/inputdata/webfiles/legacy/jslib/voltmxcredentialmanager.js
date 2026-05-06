voltmx.credentialmanager = (function(){
        
    var abortController = null, isAutofillRequestPending = false;
    var module = {
        INVALID_INPUT_PARAMETERS: 100,
        REQUEST_FAILED: 2003,
        NOCREDENTIAL_ERROR: 2009,
        UNKNOWN_ERROR: 2000,
        USER_CANCELLED: 2001,
        AUTOFILL_NOT_SUPPORTED: 2011,
        base64url: {
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
        },

        
        isConditionalMediationAvailable: function() {
            const pubKeyCred = window.PublicKeyCredential;
            return (
                typeof pubKeyCred.isConditionalMediationAvailable === "function" &&
                pubKeyCred.isConditionalMediationAvailable()
            );
        },

        
        decodeBase64Fields: function(response) {
            response.challenge = module.base64url.decode(response.challenge);
            response.user.id = module.base64url.decode(response.user.id);
            if (response.excludeCredentials) {
                response.excludeCredentials = response.excludeCredentials.map(cred => ({
                    ...cred,
                    id: module.base64url.decode(cred.id)
                }));
            }
            return response;
        },
        
        
        encodeCredentialFields: function(credential) {
            credential.rawId = module.base64url.encode(credential.rawId);
            credential.response.attestationObject = module.base64url.encode(credential.response.attestationObject);
            credential.response.clientDataJSON = module.base64url.encode(credential.response.clientDataJSON);
        },

        
        decodeChallenge: function(challenge) {
            return module.base64url.decode(challenge);
        },
        
        
        mapCredentials: function(credentials) {
            return credentials.map(cred => ({
                type: 'public-key',
                id: new Uint8Array(module.base64url.decode(cred.id))
            }));
        },

        
        prepareCredentialResponse: async function(cred) {
            return {
                id: cred.id,
                rawId: module.base64url.encode(cred.rawId),
                type: cred.type,
                response: {
                    authenticatorData: module.base64url.encode(cred.response.authenticatorData),
                    clientDataJSON: module.base64url.encode(cred.response.clientDataJSON),
                    signature: module.base64url.encode(cred.response.signature),
                    userHandle: cred.response.userHandle ? module.base64url.encode(cred.response.userHandle) : undefined
                }
            };
        },

        
        handleError: function(errCode, extraDetail = '') {
            
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
        },

        validateCreatePasskeyRegistrationSignin: function(options, successCallback, failureCallback) {
            const errors = [];
            
            if (!options && typeof options !== 'object') {
                errors.push('Options is missing.');
            } 
        
            
            if (!successCallback && typeof successCallback !== 'function') {
                errors.push('successCallback is required and must be a function.');
            }
            if (!failureCallback && typeof failureCallback !== 'function') {
                errors.push('failureCallback is required and must be a function.');
            }
        
            
            if (errors.length > 0) {
                return {
                    valid: false,
                    errors: errors
                };
            } else {
                return { valid: true };
            }
        },

        createPasskeyRegistrationRequest: async function(attestationOptionsResponse, successCallback, failureCallback) { 
            if(isAutofillRequestPending) {
                module.handleAbort();
            } 
            try {
                const validationResult = module.validateCreatePasskeyRegistrationSignin(attestationOptionsResponse, successCallback, failureCallback);
            if (!validationResult.valid) {
                voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                failureCallback(module.handleError(3001));
                return;
            } else {
                
                attestationOptionsResponse = typeof(attestationOptionsResponse) === 'string' ? JSON.parse(attestationOptionsResponse) : attestationOptionsResponse;

                
                const { rp, challenge, user } = attestationOptionsResponse;
                if (!(rp && rp.id && challenge && user && user.id && user.name)) {
                    voltmx.print('Missing required fields: rpId, challenge, userId, or name.');
                    failureCallback(module.handleError(3001));
                }

                attestationOptionsResponse = module.decodeBase64Fields(attestationOptionsResponse);

                const credential = await navigator.credentials.create({
                    publicKey: attestationOptionsResponse
                });

                
                
                
                

                isAutofillRequestPending = false;
                module.encodeCredentialFields(credential);
                successCallback(credential);                
            }                
            } catch (error) {
                
                if(error.name === "NotAllowedError"){
                    failureCallback(module.handleError(module.USER_CANCELLED,error.message));
                    return;
                } else if(error.name === "InvalidStateError") {
                    failureCallback(module.handleError(module.NOCREDENTIAL_ERROR,error.message));
                    return;
                } else {
                    failureCallback(module.handleError(module.UNKNOWN_ERROR, error.message));
                    return;
                }
            }      
        },

        createPasskeySigninRequest: async function(assertionOptionsResponse, successCallback, failureCallback, isAutofill) {
            try {
                const validationResult = module.validateCreatePasskeyRegistrationSignin(assertionOptionsResponse, successCallback, failureCallback);
                if (!validationResult.valid) {
                    voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                    failureCallback(module.handleError(3002));
                    return;
                } else {
                    
                    if(isAutofill) {
                        let browserAutoFill  = await module.isConditionalMediationAvailable()
                        if(!browserAutoFill) {
                            voltmx.print("Autofill Passkey Service is not supported in the browser.");
                            failureCallback(module.handleError(module.AUTOFILL_NOT_SUPPORTED));
                            return;
                        }
                    }
                    
                    assertionOptionsResponse = typeof(assertionOptionsResponse) === 'string' ? JSON.parse(assertionOptionsResponse) : assertionOptionsResponse;
                    const rpId = assertionOptionsResponse.rpId; 
                    const challenge = module.decodeChallenge(assertionOptionsResponse.challenge); 

                    if (!rpId || !challenge) {
                        voltmx.print("Invalid RP ID or challenge.");
                        failureCallback(module.handleError(3002));
                        return;
                    }
    
                    assertionOptionsResponse.challenge = challenge;
                    if (assertionOptionsResponse.allowCredentials) {
                        assertionOptionsResponse.allowCredentials = module.mapCredentials(assertionOptionsResponse.allowCredentials);
                    }
    
                    
                    if (isAutofillRequestPending) {
                        module.handleAbort();
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
    
                    
                    
                    
                    
                    
    
                    const response = await module.prepareCredentialResponse(cred);
                    successCallback(response);
                    
                }                
            } catch (error) {
                abortController = null;
                isAutofillRequestPending = false;
                voltmx.print(`Error in createPasskeySigninRequest: ${error}`);
                if(error.name !== "AbortError") {
                    if(error.name === "NotAllowedError") {
                        failureCallback(module.handleError(module.USER_CANCELLED,error.message));
                        return;
                    } else if (error.name === "InvalidStateError") {
                        failureCallback(module.handleError(module.NOCREDENTIAL_ERROR, error.message));
                        return;
                    } else {
                        failureCallback(module.handleError(module.REQUEST_FAILED,error.message));
                        return;
                    }
                } else {
                    voltmx.print(`${error.message}`);
                    return;
                }
            }            
        },

        validatePasskeyObject: function (passkeyObject, type) {
            let errors = [];
        
            
            function validateField(obj, fieldName, expectedType, parentPath) {
                const fullPath = parentPath ? `${parentPath}.${fieldName}` : fieldName;
                if (!obj.hasOwnProperty(fieldName)) {
                    errors.push(`${fullPath} is required.`);
                } else if (typeof obj[fieldName] !== expectedType) {
                    errors.push(`${fullPath} must be a ${expectedType}.`);
                }
            }
        
            
            function validateOptions(options, optionType) {
                if (typeof options !== "object" || options === null || Array.isArray(options)) {
                    errors.push(`${type}.${optionType} must be a non-null object.`);
                    return;
                }
                validateField(options, "url", "string", `${type}.${optionType}`);
                validateField(options, "headers", "object", `${type}.${optionType}`);
                validateField(options, "body", "object", `${type}.${optionType}`);
                if (options.body && typeof options.body.userName !== "undefined" && typeof options.body.userName !== "string") {
                    errors.push(`${type}.${optionType}.body.userName must be a string.`);
                }
            }
        
            
            function validateResults(results, resultType) {
                if (typeof results !== "object" || results === null || Array.isArray(results)) {
                    errors.push(`${type}.${resultType} must be a non-null object.`);
                    return;
                }
                validateField(results, "url", "string", `${type}.${resultType}`);
                validateField(results, "headers", "object", `${type}.${resultType}`);
            }
        
            
            if (passkeyObject.attestationOptions) {
                validateOptions(passkeyObject.attestationOptions, "attestationOptions");
            } else if (passkeyObject.assertionOptions) {
                validateOptions(passkeyObject.assertionOptions, "assertionOptions");
            } else {
                errors.push(`${type} must include either attestationOptions or assertionOptions.`);
            }
        
            
            if (passkeyObject.attestationResults) {
                validateResults(passkeyObject.attestationResults, "attestationResults");
            } else if (passkeyObject.assertionResults) {
                validateResults(passkeyObject.assertionResults, "assertionResults");
            } else {
                errors.push(`${type} must include either attestationResults or assertionResults.`);
            }
        
            
            validateField(passkeyObject, "onSuccess", "function", type);
            validateField(passkeyObject, "onFailure", "function", type);
        
            

            
            
            
            
            
            
        
            
            if (errors.length > 0) {
                return {
                    valid: false,
                    errors: errors,
                };
            } else {
                return { valid: true };
            }
        },        

        
        registerPasskey: async function (passkeyRegistrationObject) {
            if(isAutofillRequestPending) {
                module.handleAbort();
            }
            try {
                const validationResult = module.validatePasskeyObject(passkeyRegistrationObject, "passkeyRegistrationObject");
                if (!validationResult.valid) {
                    voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                    passkeyRegistrationObject.onFailure(module.handleError(module.INVALID_INPUT_PARAMETERS, validationResult.errors))
                    return;
                } else {
                    
                    let type = 'registerPasskey'
                    const attestationOptionsResponse = await module.fetchOptions(
                        passkeyRegistrationObject.attestationOptions,
                        passkeyRegistrationObject.onFailure,
                        type
                    );

                    attestationOptionsResponse = module.decodeBase64Fields(attestationOptionsResponse);

                    

                    const cred = await navigator.credentials.create({
                        publicKey: attestationOptionsResponse  
                    });

                    isAutofillRequestPending = false;

                    voltmx.print(`cred.id =>>  : ${cred.id}`);

                    module.encodeCredentialFields(cred);

                    
                    const attestationResultsResponse = await module.sendResults(
                        cred, 
                        passkeyRegistrationObject.attestationResults,
                        passkeyRegistrationObject.onFailure, type
                    );

                    voltmx.print(`attestationResultsResponse ->>>>> : ${JSON.stringify(attestationResultsResponse)}`);

                    
                    passkeyRegistrationObject.onSuccess(attestationResultsResponse);
                }                

            } catch (error) {
                
                if(error.name === "NotAllowedError"){
                    passkeyRegistrationObject.onFailure(module.handleError(module.USER_CANCELLED,error.message));
                    return;
                } else if(error.name === "InvalidStateError") {
                    passkeyRegistrationObject.onFailure(module.handleError(module.NOCREDENTIAL_ERROR, error.message));
                    return;
                } else {
                    passkeyRegistrationObject.onFailure(module.handleError(module.UNKNOWN_ERROR, error.message));
                    return;
                }
            }
        },

        
        signinWithPasskey: async function (passkeySigninObject) {
            try {  
                const validationResult = module.validatePasskeyObject(passkeySigninObject, "passkeySigninObject");
                if (!validationResult.valid) {
                    voltmx.print(`Validation failed with the following errors: ${validationResult.errors}`);
                    passkeySigninObject.onFailure(module.handleError(module.INVALID_INPUT_PARAMETERS, validationResult.errors));
                    return;
                } 
                const { autofill, onSuccess, onFailure, assertionOptions, assertionResults } = passkeySigninObject; 
                
                if(autofill) {
                    let browserAutoFill  = await module.isConditionalMediationAvailable()
                    if(!browserAutoFill) {
                        voltmx.print("Autofill Passkey Service is not supported in the browser.");
                        passkeySigninObject.onFailure(module.handleError(module.AUTOFILL_NOT_SUPPORTED));
                        return;
                    }
                }
                const type = "signinPasskey";
                const assertionOptionsResponse = await module.fetchOptions(assertionOptions, onFailure, type);                
                assertionOptionsResponse.challenge = module.decodeChallenge(assertionOptionsResponse.challenge);
                if (assertionOptionsResponse.allowCredentials) {
                    assertionOptionsResponse.allowCredentials = module.mapCredentials(assertionOptionsResponse.allowCredentials);
                }

                
                if (isAutofillRequestPending) {
                    module.handleAbort();
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

                
                
                
                
                

                const response = await module.prepareCredentialResponse(cred);
                const result = await module.sendResults(response, assertionResults, onFailure, type);
                onSuccess(result);                
        
            } catch (error) {
                abortController = null;
                isAutofillRequestPending = false;
                voltmx.print(`Error during signinWithPasskey: ${error}`);
                if(error.name !== "AbortError") {
                    if(error.name === "NotAllowedError"){
                        passkeySigninObject.onFailure(module.handleError(module.USER_CANCELLED,error.message));
                        return;
                    } else if(error.name === "InvalidStateError") {
                        passkeySigninObject.onFailure(module.handleError(module.NOCREDENTIAL_ERROR, error.message));
                        return;
                    } else {
                        passkeySigninObject.onFailure(module.handleError(module.REQUEST_FAILED, error.message));
                        return;
                    }
                } else {
                    voltmx.print(`${error.message}`);
                    return;
                }
            }
        },

        
        
        fetchOptions: async function (options, onFailure, type) {
            const response = await fetch(options.url, {
                method: 'POST',
                headers: options.headers,
                body: JSON.stringify(options.body)
            });

            if (!response.ok) {
                voltmx.print(`Failed to fetch assertion options: ${response.statusText}`);
                if(type == 'registerPasskey') {
                    onFailure(module.handleError(3001, error.message));
                    return;
                } else {
                    onFailure(module.handleError(3002, error.message));
                    return;
                }
            }

            return response.json();
        },

        
        
        sendResults: async function (optionsResponse, results, onFailure, type) {
            const response = await fetch(results.url, {
                method: 'POST',
                headers: results.headers,
                body: JSON.stringify(optionsResponse) 
            });

            if (!response.ok) {
                voltmx.print(`Failed to send assertion results: ${response.statusText}`);
                if(type == 'registerPasskey') {
                    onFailure(module.handleError(3001, error.message));
                    return;
                } else {
                    onFailure(module.handleError(3002, error.message));
                    return;
                }
            }

            return response.json();
        },
        handleAbort: function () {
            if (abortController) {
                abortController.abort();
                abortController = null;
                isAutofillRequestPending = false;
                voltmx.print("Autofill mediation request aborted.");
            }
        }

    };
    return module;
}());