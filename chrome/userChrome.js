// userChrome.js

Cu.import("resource://gre/modules/FileUtils.jsm")
Cu.import("resource://gre/modules/osfile.jsm");

(function() {

	const getURLSpecFromFile = Components.classes["@mozilla.org/network/io-service;1"]
																	.getService(Components.interfaces.nsIIOService)
																	.getProtocolHandler("file")
																	.QueryInterface(Components.interfaces.nsIFileProtocolHandler)
																	.getURLSpecFromFile

	Services.obs.addObserver(this, "final-ui-startup", false)
	Services.obs.addObserver(this, "domwindowopened", false)

	this.observe = function(aSubject, aTopic, aData) {
		switch (aTopic) {
			case "final-ui-startup":
				this.fileURI = OS.Path.join(OS.Constants.Path.profileDir, "chrome", "live-reload-extension.js")
				Services.obs.removeObserver(this, "final-ui-startup")
				break

			case "domwindowopened":
				aSubject.addEventListener("load", this, {capture: true, once: true})
				Services.obs.removeObserver(this, "domwindowopened")
				break
		}
	},

	this.handleEvent = function(aEvent) {
		var document = aEvent.originalTarget
		var window = document.defaultView
		if (document.location && document.location.protocol == "chrome:") {
			Services.scriptloader.loadSubScriptWithOptions(getURLSpecFromFile(new FileUtils.File(this.fileURI)),
																					{target: window,
																					 charset: "UTF-8",
																					 ignoreCache: true})
		}
	}

}).call({})
