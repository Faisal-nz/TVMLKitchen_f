/*
 application.js
 Copyright (C) 2015 toshi0383 All Rights Reserved.
*/

var resourceLoader;

var options;
function openTemplateFromJSFile(jsFileName) {
    __kitchenDebug("openTemplate:");
    options = App.options
    mainBundleUrl = options.MAIN_BUNDLE_URL
    __kitchenDebug(mainBundleUrl);
    var javascriptFiles = [
        `${options.BASEURL}/ResourceLoader.js`,
        `${options.BASEURL}/Presenter.js`
    ];
    evaluateScripts(javascriptFiles, function(success) {
        if (!success) {
            __kitchenDebug("Javascript load failed.");
            return;
        }
        __kitchenDebug("Javascript loaded successfully.");
        __kitchenDebug("mainBundleUrl:" + mainBundleUrl);
        __kitchenDebug("jsFileName:" + jsFileName);
        resourceLoader = new ResourceLoader(mainBundleUrl);
        var index = resourceLoader.loadResource(`${mainBundleUrl}${jsFileName}`,
            function(resource) {
                __kitchenDebug("Resource loaded successfully.");
                openTemplateFromRawXMLString(resource);
            }
        );
    });
}

function openTemplateFromXMLFile(xmlFileName) {
    throw "METHOD NOT IMPLEMENTED";
}

function openTemplateFromRawXMLString(xmlString) {
    __kitchenDebug("openTemplateFromRawXMLString");
    options = App.options
    var javascriptFiles = [
       `${options.BASEURL}/ResourceLoader.js`,
       `${options.BASEURL}/Presenter.js`
    ];
    evaluateScripts(javascriptFiles, function(success) {
        Presenter.showLoadingIndicator();
        __kitchenDebug("xmlString:" + xmlString);
        var doc = Presenter.makeDocument(xmlString);
        doc.addEventListener("select", Presenter.load.bind(Presenter));
        doc.addEventListener("highlight", Presenter.highlight.bind(Presenter));
        doc.addEventListener("holdselect", Presenter.holdselect.bind(Presenter));
        doc.addEventListener("play", Presenter.play.bind(Presenter));
        Presenter.defaultPresenter.call(Presenter, doc);
    });
}

App.onLaunch = function(options) {
    App.options = options
}

function launch(options) {
    var javascriptFiles = [
        `${options.BASEURL}/ResourceLoader.js`,
        `${options.BASEURL}/Presenter.js`
    ];

    /**
     * evaluateScripts is responsible for loading the JavaScript files neccessary
     * for you app to run. It can be used at any time in your apps lifecycle.
     *
     * @param - Array of JavaScript URLs
     * @param - Function called when the scripts have been evaluated. A boolean is
     * passed that indicates if the scripts were evaluated successfully.
     */
    evaluateScripts(javascriptFiles, function(success) {
        if (success) {
            resourceLoader = new ResourceLoader(options.BASEURL);

            var index = resourceLoader.loadResource(`${options.BASEURL}Index.xml.js`,
                function(resource) {
                    var doc = Presenter.makeDocument(resource);
                    doc.addEventListener("select", Presenter.load.bind(Presenter));
                    navigationDocument.pushDocument(doc);
                });
        } else {
            /*
            Be sure to handle error cases in your code. You should present a readable, and friendly
            error message to the user in an alert dialog.

            See alertDialog.xml.js template for details.
            */
            var alert = createAlert("Evaluate Scripts Error", "There was an error attempting to evaluate the external JavaScript files.\n\n Please check your network connection and try again later.");
            navigationDocument.presentModal(alert);

            throw ("Playback Example: unable to evaluate scripts.");
        }
    });
}

/**
 * This convenience funnction returns an alert template,
 * which can be used to present errors to the user.
 */
var createAlert = function(title, description) {

    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate>
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();

    var alertDoc = parser.parseFromString(alertString, "application/xml");

    return alertDoc
}
