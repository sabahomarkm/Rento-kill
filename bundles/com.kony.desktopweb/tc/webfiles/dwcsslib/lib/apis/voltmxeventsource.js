(function () {
    var _ns = voltmx.net,
        $K = voltmx.$kwebfw$,
        $KU = $K.utils;

    if (!_ns) return;

    const httpStatusConstants = constants.HTTP_STATUS;

    // Error Builder
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

    // Map HTTP status to constants index
    function _mapHttpStatusToIndex(status) {
        if (status === httpStatusConstants.NO_CONTENT) {
            return 2; // Stream terminated by server (HTTP 204 No Content)
        } else if (status >= httpStatusConstants.BAD_REQUEST && status <= 599) {
            return 0; // Non-success HTTP status (4xx/5xx)
        }

        return 1; // Invalid SSE response/content-type and other HTTP-like failures
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
    };

    function _isKnownHttpStatus(status) {
        return typeof status === 'number' && !isNaN(status) && status >= 100 && status <= 599;
    };

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
    };

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
    };

    var _getFetchEventSource = function () {
        if (typeof window !== 'undefined' &&
            window.FetchEventSourceLib &&
            window.FetchEventSourceLib.fetchEventSource) {
            return window.FetchEventSourceLib.fetchEventSource;
        }
        return null;
    };

    class _EventSource {
        constructor(url, config) {

            // VALIDATION
            if (!$KU.is(url, 'string') || !url.trim()) {
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

            if (config && config.retry && config.retry.enable  && typeof config.retry.enable !== 'boolean') {
                throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.RETRY_ENABLE_MESSAGE);
            }

            if (config && config.retry && config.retry.verifyNoContent  && typeof config.retry.verifyNoContent !== 'boolean') {
                throw _buildError(constants.VALIDATION_ERRORS.ERROR_NAME, constants.VALIDATION_ERRORS.ERROR_MESSAGE.RETRY_VERIFY_NO_CONTENT_MESSAGE);
            }

            // ORIGINAL INIT
            this._url = url;
            let isValidConfig = (typeof config === 'undefined' || config === null);
            config = !isValidConfig ? config : {};
            this._method = (!isValidConfig && typeof config.method === 'string' && config.method.trim())
                ? config.method.trim().toUpperCase()
                : 'GET';
            this._headers = (!isValidConfig && config.headers) ? config.headers : {};
            this._body = !isValidConfig && config.body ? config.body : null;
            this._retry = (!isValidConfig && config.retry && typeof config.retry.enable === 'boolean') ? config.retry.enable : true;
            this._verifyNoContent = (!isValidConfig && config.retry && this._retry && typeof config.retry.verifyNoContent === 'boolean') ? config.retry.verifyNoContent : false;
            this._abortController = null;
            this._isOpen = false;
            this._isClosed = false;
            this._fetchEventSource = null;
            this._requestStatus = null;
            this._errorHandledInOnError = false;
            this._skipNextPromiseCatch = false;
            this._suppressOnCloseErrorCallback = false;
            
            this._callbacks = {
                open: null,
                message: null,
                error: null,
                close: null
            };

            $KU.defineGetter(this, 'url', function () {
                return this._url;
            });

        }

        // ─── Property setters ───
        set onOpen(callback) {
            if (typeof callback === 'function') {
                this._callbacks.open = callback;
            } else if (callback === null) {
                this._callbacks.open = null;
            } else {
                const type = typeof callback;
                throw new TypeError(
                    `${constants.HANDLER_ERROR_MESSAGE} ${type}.`
                );
            }
            
        }

        set onMessage(callback) {
            if (typeof callback === 'function') {
                this._callbacks.message = callback;
            } else if (callback === null) {
                this._callbacks.message = null;
            } else {
                const type = typeof callback;
                throw new TypeError(
                    `${constants.HANDLER_ERROR_MESSAGE} ${type}.`
                );
            }
        }

        set onError(callback) {
            if (typeof callback === 'function') {
                this._callbacks.error = callback;
            } else if (callback === null) {
                this._callbacks.error = null;
            } else {
                const type = typeof callback;
                throw new TypeError(
                    `${constants.HANDLER_ERROR_MESSAGE} ${type}.`
                );
            }
        }

        set onClose(callback) {
            if (typeof callback === 'function') {
                this._callbacks.close = callback;
            } else if (callback === null) {
                this._callbacks.close = null;
            } else {
                const type = typeof callback;
                throw new TypeError(
                    `${constants.HANDLER_ERROR_MESSAGE} ${type}.`
                );
            }
        }

        // Optional: getters
        get onOpen()    { return this._callbacks.open;    }
        get onMessage() { return this._callbacks.message; }
        get onError()   { return this._callbacks.error;   }
        get onClose()   { return this._callbacks.close;   }

        _start() {
            if (this._isClosed) return;

            this._errorHandledInOnError = false;
            this._skipNextPromiseCatch = false;

            var fetchEventSource = _getFetchEventSource();
            if (!fetchEventSource) {
                this._isOpen = false;
                if (this._callbacks.error) {
                    this._callbacks.error(
                        _buildError(constants.UNKNOWN_EXCEPTION.ERROR_NAME,
                            constants.UNKNOWN_EXCEPTION.ERROR_MESSAGE.UNKNOWN_ERROR_MESSAGE,
                            constants.FETCH_EVENT_BUNDLE_SOURCE_JS)
                    );
                }
                return;
            }

            this._fetchEventSource = fetchEventSource;
            this._abortController = new AbortController();

            var self = this;
            var fetchOptions = {
                method: this._method,
                headers: this._headers,
                signal: this._abortController.signal,

                onopen: async (response) => {

                    if (response && typeof response.status === 'number') {
                        self._requestStatus = response.status;
                    }

                    // Handle 204 No Content as clean close if verifyNoContent is enabled
                    if (self._verifyNoContent && response && response.status === httpStatusConstants.NO_CONTENT) {
                        self._isClosed = true;
                        self._isOpen = false;

                        if (self._abortController) {
                            self._abortController.abort();
                        }

                        if (typeof self._callbacks.close === 'function') {
                            self._callbacks.close({
                                event: 'close'
                            });
                        }

                        return;
                    }

                    var contentType = response.headers.get(constants.CONTENT_TYPE);
                    var isEventStreamResponse = !!(contentType && contentType.startsWith(constants.TEXT_EVENT_STREAM));
                    var isAcceptedStatus = response
                        && response.status >= httpStatusConstants.INFORMATIONAL_RESPONSES
                        && response.status <= httpStatusConstants.REDIRECTION_MESSAGES;

                    // Treat 100..399 with a valid SSE content-type as a successful stream open.
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
                        return; // Success - don't fall through to error checks
                    }

                    // Invalid SSE content-type: fire INVALID_SSE_RESPONSE_EXCEPTION and do not retry.
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

                    // Do not retry 4xx responses except 429.
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

                        // Set flag BEFORE calling callback so onerror knows it was already handled
                        self._errorHandledInOnError = true;
                        if (typeof self._callbacks.error === 'function') {
                            self._callbacks.error(error);
                        }
                        throw new Error(`${constants.HTTP_ERROR}: ${response.status}`);
                    }

                    // All other statuses should flow through the library retry path.
                    if (response && !isAcceptedStatus) {
                        throw new Error(`${constants.RETRIABLE_HTTP_ERROR} ${constants.STATUS}: ${response.status}`);
                    }
                },

                onmessage: (response) => {
                    if (self._isClosed) return;

                    if (typeof self._callbacks.message === 'function') {
                        self._callbacks.message({
                            data: response.data,
                            id: response.id,
                            event: response.event || 'message'
                        });
                    }
                },

                onerror: (err) => {
                    self._isOpen = false;

                    let shouldReconnect = self._retry;
                    // Flag to avoid duplicate error callback when connection is closed as part of internal retry flow
                    // (e.g., when verifyNoContent is enabled and server returns 204 No Content, we suppress the error
                    // to prevent the consumer from seeing an error for an expected/intentional closure)
                    var suppressErrorCallback = self._suppressOnCloseErrorCallback;
                    self._suppressOnCloseErrorCallback = false;

                    // If error was already reported to consumer (e.g. from onopen 4xx handling),
                    // skip the callback here to prevent a duplicate and reset the flag.
                    if (self._errorHandledInOnError) {
                        if (self._isClosed || shouldReconnect === false) {
                            // Keep the flag true so the outer promise catch can skip duplicate callback.
                            self._skipNextPromiseCatch = true;
                            throw err;
                        }

                        self._errorHandledInOnError = false;
                    }

                    // Only invoke error callback if not suppressed by internal close flow
                    // Set flag to indicate error was handled here to prevent duplicate callback in the promise catch block
                    if (!suppressErrorCallback &&  typeof self._callbacks.error === 'function') {
                        self._errorHandledInOnError = true;
                        self._skipNextPromiseCatch = true;
                        let mappedError = _mapRuntimeError(err);

                        self._callbacks.error(mappedError);
                    } else if (suppressErrorCallback) {
                        // Skip user error callback for internal close-triggered retry flow.
                        self._skipNextPromiseCatch = true;
                    }

                    if (shouldReconnect === false) {
                        throw err;
                    }
                },

                onclose: () => {
                    self._isOpen = false;

                    if (self._verifyNoContent && self._requestStatus !== httpStatusConstants.NO_CONTENT) {
                        // Web-specific library behavior: We need to throw an error here to initiate retry from the 
                        // fetch-event-source library natively. By suppressing the error callback first, the consumer
                        // won't see this error - it's purely for triggering the internal library's retry mechanism.
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
                }
            };

            if (this._body && !['GET', 'DELETE', 'HEAD', 'OPTIONS'].includes(this._method)) {
                fetchOptions.body =
                    typeof this._body === 'string'
                        ? this._body
                        : JSON.stringify(this._body);
            }

            try {
                this._fetchEventSource(this._url, fetchOptions).catch((err) => {
                    if (self._skipNextPromiseCatch) {
                        self._skipNextPromiseCatch = false;
                        self._errorHandledInOnError = false;
                        return;
                    }

                    if (self._errorHandledInOnError) {
                        // Error was already handled and reported to consumer in the onerror handler.
                        // Reset the flag and return early to avoid duplicate error callbacks.
                        self._errorHandledInOnError = false;
                        return;
                    }

                    let mappedError = _mapRuntimeError(err);

                    if (typeof self._callbacks.error === 'function') {
                        self._callbacks.error(mappedError);
                    }
                });
            } catch (err) {
                // Synchronous error during setup - this is a legitimate error to report
                this._isOpen = false;
                if (this._callbacks.error) {
                    this._callbacks.error(
                        _buildError(constants.UNKNOWN_EXCEPTION.ERROR_NAME,
                            constants.UNKNOWN_EXCEPTION.ERROR_MESSAGE.UNKNOWN_ERROR_MESSAGE,
                            _toErrorMessage(err))
                    );
                }
            }
        }

        open() {
            if (this._isClosed || this._isOpen) return;

            try {
                this._isOpen = true;
                this._start();
            } catch (err) {
                this._isOpen = false;
                if (typeof this._callbacks.error === 'function') {
                    this._callbacks.error(_buildError(constants.UNKNOWN_EXCEPTION.ERROR_NAME,
                        constants.UNKNOWN_EXCEPTION.ERROR_MESSAGE.UNKNOWN_ERROR_MESSAGE,
                        _toErrorMessage(err)));
                }
            }
        }

        close() {
            if (this._isClosed) return;

            this._isClosed = true;
            this._isOpen = false;
            
            if (this._abortController) {
                this._abortController.abort();
            }

            if (typeof this._callbacks.close === 'function') {
                this._callbacks.close({ event: 'close' });
            }
        }
    }

    $K.defVoltmxProp(_ns, [
        { keey: 'EventSource', value: _EventSource }
    ]);
}());