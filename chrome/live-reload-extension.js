var { AddonManager } = Cu.import(
	"resource://gre/modules/AddonManager.jsm"
);
var { Services } = Cu.import("resource://gre/modules/Services.jsm");

var FileUtils = Cu.import("resource://gre/modules/FileUtils.jsm").FileUtils

const ADDONS = [
	{
		path: "", // The path of the extension
		watch: [], // Additional location to watch
		id: "" // id of the add-on (mandatory) see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings
	}
]

const socket = new WebSocket("ws://127.0.0.1:7879");
socket.addEventListener("open", async function (event) {
	socket.send(JSON.stringify({ query: "addons load", data: ADDONS }))
})

socket.addEventListener("message", async function (event) {

	const body = JSON.parse(event.data);

	console.log(body)

	if(body.query === "reload") {
		console.log("reloading " + body.data)
		const addon_ = await AddonManager.getAddonByID(body.data)
		addon_.reload()
	} else if(body.query === "addons load") {
		socket.send(JSON.stringify({ query: "addons load", data: ADDONS }))
	}
	console.log(event)

})

for(const addon of ADDONS) {
	AddonManager.installTemporaryAddon(new FileUtils.File(addon.path))
}

