// config.js
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/osfile.jsm");

if (!Services.appinfo.inSafeMode) {

Services.scriptloader.loadSubScript(
	OS.Path.toFileURI(OS.Path.join(OS.Constants.Path.profileDir,
	"./chrome/userChrome.js")), this, "UTF-8");

};

