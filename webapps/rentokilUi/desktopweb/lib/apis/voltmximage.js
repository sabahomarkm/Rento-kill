Object.defineProperty(voltmx, 'image', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;

    /*
    Method Name: _createImageFromSnapShot
    Description: This method creates an image representation of a widget by capturing its visual appearance. It includes handling for specific widget types (e.g., `Image2`) and customizes the canvas size and rendering context to align with the widget's properties. The method ensures proper rendering of the widget's styles, background, and text content. If a signature canvas is available, it is incorporated into the final image. The generated image is returned as an `Image` object.
    Parameters: widget(Object): The widget element for which the snapshot image is to be created.
    Return: (Image): The generated image element based on the widget's visual representation.
    */
    var _createImageFromSnapShot = function voltmx_createImageFromSnapShot(widget) {
        var $K = voltmx.$kwebfw$, $KW = $K.widget, el = $KW.el(widget);
    
        if (!el || !el.node) {
            console.error('Invalid widget element.');
            return null;
        }
    
        let widgetElement = el.node;
        if ($KW.name(widget) === 'Image2') {
            widgetElement = el.image;
        }
        let canvas = document.createElement('canvas');
        let client = widgetElement.getBoundingClientRect();
        if (el.canvas) {
            canvas.width = widgetElement.offsetWidth;
            canvas.height = widgetElement.offsetHeight;
        } else {
            canvas.width = client.width * 2;
            canvas.height = client.height * 2;
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(widgetElement).backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        if (widgetElement.tagName === 'IMG') {
            ctx.drawImage(widgetElement, 0, 0, canvas.width, canvas.height);
        }
    
        ctx.fillStyle = getComputedStyle(widgetElement).color;
        ctx.font = `${getComputedStyle(widgetElement).fontSize} ${getComputedStyle(widgetElement).fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let txt = widgetElement.innerText || widgetElement.textContent || widgetElement.value || '';
        ctx.fillText(txt, canvas.width / 2, canvas.height / 2);
    
        const signatureCanvas = el.canvas;
        if (signatureCanvas) {
            ctx.drawImage(signatureCanvas, 0, 0);
        }
    
        const image = new Image();
        image.src = canvas.toDataURL("image/png");
    
        return image;
    };

    /*
    Method Name: getImageAsRawBytes
    Description: This method converts the source data of an image element into a raw byte representation and returns it as a Blob URL. It decodes the image's data URL, creates a Uint8Array buffer to store the byte values, and generates a Blob object of type 'image/png'. The Blob is then converted into a URL for further usage.
    Parameters: None
    Return: (String): The Blob URL representing the raw byte data of the image.
    */
    Image.prototype.getImageAsRawBytes = function () {
        if (!this) {
            return;
        }
        const dataURL = this.src;
        const byteString = atob(dataURL.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        return url;
    };

    $K.defVoltmxProp(_ns, [
        {keey:'createImageFromSnapShot', value:_createImageFromSnapShot}
    ]);

    return _ns;
}())});