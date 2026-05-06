(function() {
$KI.net = $KI.net || {};

const httpStatusConstants = constants.HTTP_STATUS;


function _buildError(type, message, extraInfo) {
    let err;

    switch (type) {
        case constants.VALIDATION_ERRORS.ERROR_NAME:
            err = {
                errorName: constants.VALIDATION_ERRORS.ERROR_NAME,
                errorCode: constants.VALIDATION_ERRORS.ERROR_CODE,
                errorMessage: constants.VOLTMX_EVENT_SOURCE + message,
            };
            break;

        case constants.IO_EXCEPTION.ERROR_NAME:
            err = {
                errorName: constants.IO_EXCEPTION.ERROR_NAME,
                errorCode: constants.IO_EXCEPTION.ERROR_CODE,
                errorMessage: message,
            };
            break;

        case constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_NAME:
            err = {
                errorName: constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_NAME,
                errorCode: constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_CODE,
                errorMessage: message,
            };
            break;

        case constants.UNKNOWN_EXCEPTION.ERROR_NAME:
        default:
            err = {
                errorName: constants.UNKNOWN_EXCEPTION.ERROR_NAME,
                errorCode: constants.UNKNOWN_EXCEPTION.ERROR_CODE,
                errorMessage: message,
                errorInfo: extraInfo || ''
            };
    }

    return err;
};

function _buildHttpError(statusCode, index, extraInfo, statusText) {
    let err = {
        errorName: constants.HTTP_EXCEPTION.ERROR_NAME,
        errorCode: statusCode,
        errorMessage: 'HTTP ' + statusCode + (statusText ? ' ' + statusText : '')
    };

    return err;
}


function _mapHttpStatusToIndex(status) {
    if (status === httpStatusConstants.NO_CONTENT) {
        return 2; 
    } else if (status >= httpStatusConstants.BAD_REQUEST && status <= 599) {
        return 0; 
    }

    return 1; 
};

function _extractStatusFromError(err, msg) {
    var status = (err && typeof err.status === 'number') ? err.status
        : (err && err.response && typeof err.response.status === 'number') ? err.response.status
        : null;
    var statusMatch = null;

    if (typeof status === 'number' && !isNaN(status)) {
        return status;
    }

    statusMatch = msg.match(/Status:\s*(\d+)/);
    return statusMatch ? parseInt(statusMatch[1], 10) : null;
}

function _isKnownHttpStatus(status) {
    return typeof status === 'number' && !isNaN(status) && status >= 100 && status <= 599;
}

function _extractContentTypeFromError(err, msg) {
    var contentType = null;
    var contentTypeMatch = null;

    if (err && typeof err.contentType === 'string') {
        return err.contentType;
    }

    if (err && err.response && err.response.headers && typeof err.response.headers.get === 'function') {
        contentType = err.response.headers.get('content-type');
        if (contentType) {
            return contentType;
        }
    }

    contentTypeMatch = msg.match(/Content-Type:\s*([^|\n]+)/i);
    return contentTypeMatch ? contentTypeMatch[1].trim() : null;
}

function _toErrorMessage(err) {
    if (err && typeof err.message === 'string' && err.message) {
        return err.message;
    }

    if (typeof err === 'string') {
        return err;
    }

    try {
        var json = JSON.stringify(err);
        return (typeof json === 'string' && json) ? json : String(err || constants.UNKNOWN_ERROR);
    } catch (e) {
        return String(err || constants.UNKNOWN_ERROR);
    }
}

function _mapRuntimeError(err) {
    var msg = _toErrorMessage(err);
    var status = _extractStatusFromError(err, msg);
    var contentType = _extractContentTypeFromError(err, msg);
    var statusText = (err && err.response && typeof err.response.statusText === 'string')
        ? err.response.statusText
        : (err && typeof err.statusText === 'string') ? err.statusText : '';

    if (status !== null) {
        if (!_isKnownHttpStatus(status)) {
            return _buildError(constants.UNKNOWN_EXCEPTION.ERROR_NAME,
                constants.UNKNOWN_EXCEPTION.ERROR_MESSAGE.UNKNOWN_ERROR_MESSAGE,
                msg);
        }

        return _buildHttpError(status, _mapHttpStatusToIndex(status), msg, statusText);
    } else if (contentType) {
        return _buildError(constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_NAME,
            constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_MESSAGE.INVALID_SSE_RESPONSE_MESSAGE,
            contentType);
    } else if (/fetch|network error/i.test(msg)) {
        return _buildError(constants.IO_EXCEPTION.ERROR_NAME,
            constants.IO_EXCEPTION.ERROR_MESSAGE.CONNECTION_ERROR_MESSAGE,
            msg);
    }

    return _buildError(constants.UNKNOWN_EXCEPTION.ERROR_NAME,
        constants.UNKNOWN_EXCEPTION.ERROR_MESSAGE.UNKNOWN_ERROR_MESSAGE,
        msg);
}


function VoltmxEventSource(url, config) {

    
    if (typeof url !== 'string' || !url.trim()) {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.URL_MESSAGE);
    }

    if (config && typeof config !== 'object') {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.CONFIG_MESSAGE);
    }

    if (config && config.method && typeof config.method !== 'string') {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.METHOD_MESSAGE);
    }

    if (config && config.headers && (typeof config.headers !== 'object' || Array.isArray(config.headers))) {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.HEADERS_MESSAGE);
    }

    if (config && config.body && (typeof config.body !== 'string' && typeof config.body !== 'object' || Array.isArray(config.body))) {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.BODY_MESSAGE);
    }

    if (config && config.retry && (typeof config.retry !== 'object' || Array.isArray(config.retry))) {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.RETRY_MESSAGE);
    }

    if (config && config.retry && config.retry.enable && typeof config.retry.enable !== 'boolean') {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.RETRY_ENABLE_MESSAGE);
    }

    if (config && config.retry && config.retry.verifyNoContent && typeof config.retry.verifyNoContent !== 'boolean') {
        throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.RETRY_VERIFY_NO_CONTENT_MESSAGE);
    }

    this._url = url;
    let isValidConfig = (typeof config === 'undefined' || config === null);
    this._config = !isValidConfig ? config : {};
    this._isOpen = false;
    this._isClosed = false;
    this._abortController = null;
    this._fetchEventSource = null;
    this._fetchOptions = null;
    this._requestStatus = null;
    this._errorHandledInOnError = false;
    this._skipNextPromiseCatch = false;
    this._suppressOnCloseErrorCallback = false;
    this._retry = (!isValidConfig && config.retry && typeof config.retry.enable === 'boolean') ? config.retry.enable : true;
    this._verifyNoContent = (!isValidConfig && config.retry && this._retry && typeof config.retry.verifyNoContent === 'boolean') ? config.retry.verifyNoContent : false;

    this._callbacks = {
        open: null,
        message: null,
        error: null,
        close: null
    };

    
    Object.defineProperties(this, {
      onOpen: {
        configurable: true,
        get: function() { return this._callbacks.open; },
        set: function (fn) {
            if (typeof fn === 'function') {
                this._callbacks.open = fn;
            } else if (fn === null) {
                this._callbacks.open = null;
            } else {
                const type = typeof fn;
                throw new TypeError(`${constants.HANDLER_ERROR_MESSAGE} ${type}.`);
            }
        }
      },
      onMessage: {
        configurable: true,
        get: function() { return this._callbacks.message; },
        set: function (fn) {
            if (typeof fn === 'function') {
                this._callbacks.message = fn;
            } else if (fn === null) {
                this._callbacks.message = null;
            } else {
                const type = typeof fn;
                throw new TypeError(`${constants.HANDLER_ERROR_MESSAGE} ${type}.`);
            }
        }
      },
      onError: {
        configurable: true,
        get: function() { return this._callbacks.error; },
        set: function (fn) {
            if (typeof fn === 'function') {
                this._callbacks.error = fn;
            } else if (fn === null) {
                this._callbacks.error = null;
            } else {
                const type = typeof fn;
                throw new TypeError(`${constants.HANDLER_ERROR_MESSAGE} ${type}.`);
            }
        }
      },
      onClose: {
        configurable: true,
        get: function() { return this._callbacks.close; },
        set: function(fn) {
            if (typeof fn === 'function') {
                this._callbacks.close = fn;
            } else if (fn === null) {
                this._callbacks.close = null;
            } else {
                const type = typeof fn;
                throw new TypeError(`${constants.HANDLER_ERROR_MESSAGE} ${type}.`);
            }
        }
      }
    });
}

VoltmxEventSource.prototype._ensureInitialized = function() {
    var method = null;
    var headers = null;
    var body = null;

    if (this._fetchOptions && typeof this._fetchOptions === 'object' &&
        this._fetchEventSource && typeof this._fetchEventSource === 'function' &&
        this._abortController && typeof this._abortController.abort === 'function') {
        return true;
    }

    if (typeof window !== 'undefined' && window.FetchEventSourceLib && window.FetchEventSourceLib.fetchEventSource) {
        this._fetchEventSource = window.FetchEventSourceLib.fetchEventSource;
    }

    if (!this._fetchEventSource) {
        if (this._callbacks.error) {
            this._callbacks.error(
                _buildError(constants.UNKNOWN_EXCEPTION.ERROR_NAME,
                    constants.UNKNOWN_EXCEPTION.ERROR_MESSAGE.UNKNOWN_ERROR_MESSAGE,
                    constants.FETCH_EVENT_BUNDLE_SOURCE_JS)
            );
        }
        return false;
    }
    
    method = (typeof this._config.method === 'string' && this._config.method.trim())
        ? this._config.method.trim().toUpperCase()
        : 'GET';
    headers = this._config.headers || {};
    body = this._config.body || null;

    this._abortController = new AbortController();

    this._fetchOptions = {
        method: method,
        headers: headers,
        signal: this._abortController.signal
    };

    if (body && !['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(method)) {
        this._fetchOptions.body =
            typeof body === 'string' ? body : JSON.stringify(body);
    }

    return true;
};

VoltmxEventSource.prototype.open = function() {
    var self = this;

    if (this._isClosed || this._isOpen) return;

    if (!this._ensureInitialized()) return;

    this._errorHandledInOnError = false;
    this._skipNextPromiseCatch = false;
    this._isOpen = true;

    this._fetchOptions.onopen = function (response) {

        if (response && typeof response.status === 'number') {
            self._requestStatus = response.status;
        }

        
        if (self._verifyNoContent && response && response.status === httpStatusConstants.NO_CONTENT) {
            self._isClosed = true;
            self._isOpen = false;

            if (self._abortController) {
                self._abortController.abort();
            }

            if (typeof self._callbacks.close === 'function') {
                self._callbacks.close({
                    event: 'close',
                });
            }

            return;
        }

        var contentType = response.headers.get(constants.CONTENT_TYPE);
        var isEventStreamResponse = !!(contentType && contentType.startsWith(constants.TEXT_EVENT_STREAM));
        var isAcceptedStatus = response
            && response.status >= httpStatusConstants.INFORMATIONAL_RESPONSES
            && response.status <= httpStatusConstants.REDIRECTION_MESSAGES;
        
        
        if (response && isAcceptedStatus && isEventStreamResponse) {
            self._isOpen = true;
            if (self._isClosed) {
                throw new Error(constants.CONNECTION_CLOSED);
            }

            if (typeof self._callbacks.open === 'function') {
                self._callbacks.open({
                    event: 'open',
                    response
                });
            }
            return;
        }
        
        
        if (response && isAcceptedStatus && !isEventStreamResponse) {
            self._isClosed = true;
            self._isOpen = false;

            if (self._abortController) {
                self._abortController.abort();
            }

            let error = _buildError(constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_NAME,
                constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_MESSAGE.INVALID_SSE_RESPONSE_MESSAGE,
                contentType || undefined);
            self._errorHandledInOnError = true;
            if (typeof self._callbacks.error === 'function') {
                self._callbacks.error(error);
            }
            throw new Error(constants.INVALID_SSE_RESPONSE_EXCEPTION.ERROR_NAME);
        }

        
        if (response && (response.status >= httpStatusConstants.BAD_REQUEST
            && response.status < httpStatusConstants.INTERNAL_SERVER_ERROR
            && response.status !== httpStatusConstants.TOO_MANY_REQUESTS)) {
            self._isClosed = true;
            self._isOpen = false;

            if (self._abortController) {
                self._abortController.abort();
            }

            let index = _mapHttpStatusToIndex(response.status);
            let error = _buildHttpError(response.status, index, `${constants.STATUS}: ${response.status}`, response.statusText);

            
            self._errorHandledInOnError = true;
            if (typeof self._callbacks.error === 'function') {
                self._callbacks.error(error);
            }
            throw new Error(`${constants.HTTP_ERROR}: ${response.status}`);
        }

        
        if (response && !isAcceptedStatus) {
            throw new Error(`${constants.RETRIABLE_HTTP_ERROR} ${constants.STATUS}: ${response.status}`);
        }
    };

    this._fetchOptions.onmessage = function(response) {
        if (self._isClosed) return;

        if (typeof self._callbacks.message === 'function') {
            self._callbacks.message({
                data: response.data,
                id: response.id,
                event: response.event || 'message'
            });
        }
    };

    this._fetchOptions.onerror = function(err) {

        self._isOpen = false;

        var shouldReconnect = self._retry;

        
        
        
        var suppressErrorCallback = self._suppressOnCloseErrorCallback;
        self._suppressOnCloseErrorCallback = false;

        
        
        if (self._errorHandledInOnError) {
            if (self._isClosed || shouldReconnect === false) {
                
                self._skipNextPromiseCatch = true;
                throw err;
            }

            self._errorHandledInOnError = false;
        }

        
        
        if (!suppressErrorCallback && typeof self._callbacks.error === 'function') {
            self._errorHandledInOnError = true;
            self._skipNextPromiseCatch = true;
            let mappedError = _mapRuntimeError(err);

            self._callbacks.error(mappedError);
        } else if (suppressErrorCallback) {
            
            self._skipNextPromiseCatch = true;
        }

        if (shouldReconnect === false) {
            throw err;
        }
    };

    this._fetchOptions.onclose = function() {
        if (self._isClosed) return;

        self._isOpen = false;

        if (self._verifyNoContent && self._requestStatus !== httpStatusConstants.NO_CONTENT) {
            
            
            
            self._suppressOnCloseErrorCallback = true;
            throw new Error(constants.SERVER_CLOSED_CONNECTION);
        }
        
        if (!self._isClosed) {
            if (typeof self._callbacks.close === 'function') {
                self._callbacks.close({
                    event: 'close'
                });
            }
        }
        
        self._isClosed = true;
    };

    this._fetchEventSource(this._url, this._fetchOptions).catch(function (err) {
        if (self._skipNextPromiseCatch) {
            self._skipNextPromiseCatch = false;
            self._errorHandledInOnError = false;
            return;
        }

        if (self._errorHandledInOnError) {
            
            
            self._errorHandledInOnError = false;
            return;
        }

        let mappedError = _mapRuntimeError(err);

        if (typeof self._callbacks.error === 'function') {
            self._callbacks.error(mappedError);
        }
    });
};

VoltmxEventSource.prototype.close = function() {
    if (this._isClosed) return;

    this._isClosed = true;
    this._isOpen = false;

    if (this._abortController) {
        this._abortController.abort();
    }

    if (typeof this._callbacks.close === 'function') {
        this._callbacks.close({ event: 'close' });
    }
};

var VoltmxEventSourceConstructor = function(url, config) {
    return new VoltmxEventSource(url, config);
};
VoltmxEventSourceConstructor.prototype = VoltmxEventSource.prototype;

$KI.net.EventSourceImpl = VoltmxEventSource;

if(typeof $KI.net.EventSource !== 'function') {
    $KI.net.EventSource = VoltmxEventSourceConstructor;
}

if (typeof voltmx !== 'undefined' && voltmx.net) {
    if(typeof voltmx.net.EventSource !== 'function') {
        voltmx.net.EventSource = VoltmxEventSourceConstructor;
    }
}
}());