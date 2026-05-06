
$KW.RichText = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("click", "RichText", this.eventHandler);
        },

        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element = $KU.getNodeByModel(widgetModel);
            let getContentAlignemnt = this.getSkinAlignment(widgetModel.contentalignment);

            $KW.Utils.updateMasterData({
                "widgetModel": widgetModel,
                'widgetNode': element,
                'propertyName': propertyName
            });

            if(!element)
                return;

            switch(propertyName) {
                case "text":
                    element.innerHTML = `<div class="richtext-container ${getContentAlignemnt}">${propertyValue}</div>`;
                    break;
                case "linkskin":
                    this.setLinkSkin(widgetModel, element);
                    break;
                case "linkfocusskin":
                    this.setLinkFocusSkin(widgetModel, element);
                    break;
            }
        },

        getSkinAlignment: function (align) {
            switch(parseInt(align)) {
                case 1:
                    return "topleftalign";

                case 2:
                    return "topcenteralign";

                case 3:
                    return "toprightalign";

                case 4:
                    return "middleleftalign";

                case 5:
                    return "middlecenteralign";

                case 6:
                    return "middlerightalign";

                case 7:
                    return "bottomleftalign";

                case 8:
                    return "bottomcenteralign";

                case 9:
                    return "bottomrightalign";
            }
            return "";
        },

        render: function(richTextModel, context) {
            this.setLinkSkin(richTextModel);
            this.setLinkFocusSkin(richTextModel);
            var computedSkin = $KW.skins.getWidgetSkinList(richTextModel, context);
            let getContentAlignemnt = this.getSkinAlignment(richTextModel.contentalignment);
            var htmlString = "<div" + $KW.Utils.getBaseHtml(richTextModel, context) + "class='" + computedSkin + "' style='white-space:pre-wrap;word-wrap:break-word;" + $KW.skins.getBaseStyle(richTextModel, context);
            if(context.ispercent === false)
                htmlString += "display:inline-block;" + (context.layoutDir ? ("float:" + context.layoutDir) : "");
            htmlString += ";text-align:" + $KW.skins.getContentAlignment(richTextModel) + "'>" + `<div class="richtext-container ${getContentAlignemnt}">` + richTextModel.text + "</div></div>";
            if($KW.Utils.isWidgetDisabled(richTextModel, context))
                htmlString = htmlString.replace(/href=["'].*?["']/g, "href='javascript:void(0)'");
            return htmlString;
        },

        eventHandler: function(eventObject, target, data) {
            var richWidgetModel = $KU.getModelByNode(target),
                containerId = target.getAttribute("kcontainerID");
            
            spaAPM && spaAPM.sendMsg(richWidgetModel, 'onclick');

            $KAR && $KAR.sendRecording(richWidgetModel, 'click', {'data': data, 'target': target, 'eventType': 'uiAction'});

            if(containerId) {
                $KW.Utils.updateContainerData(richWidgetModel, target, true);
            } else if(richWidgetModel.onclick) {
                var richtextref = $KU.returnEventReference(richWidgetModel.onclick);
                if(richtextref) {
                    if(data) {
                        
                        $KU.executeWidgetEventHandler(richWidgetModel, richtextref, data[0], {
                            href: data[1]
                        });
                    } else {
                        $KU.executeWidgetEventHandler(richWidgetModel, richtextref);
                    }
                    $KU.onEventHandler(richWidgetModel);
                }
            } else if(data && data[1]) { 
                if(data[1].charAt(0) == "#") { 
                    
                    voltmx.events.stopPropagation(eventObject);
                    voltmx.events.preventDefault(eventObject);
                }
                var aLink = data[1].substring(1, data[1].length);
                var element = document.querySelector('a[name="' + aLink + '"]');
                var scrollerInstance = $KG[$KG["__currentForm"].id + '_scroller'];
                if(scrollerInstance && element) {
                    scrollerInstance.scrollToElement(element, 200);
                }
            }
        },

        setLinkSkin: function(richTextModel, node) {
            var linkSkin = richTextModel.linkskin;
            if(!linkSkin)
                return;

            if(node) {
                
                var selector = "#" + node.id + " > a"
                $KW.skins.applyStyle(linkSkin, selector);
            }

        },

        setLinkFocusSkin: function(richTextModel, node) {
            var linkFocusSkin = richTextModel.linkfocusskin;
            if(!linkFocusSkin)
                return;

            if(node) {
                
                var selector = "#" + node.id + " > a:active"
                $KW.skins.applyStyle(linkFocusSkin, selector);
            }
        }
    };


    return module;
}());
