// ==UserScript==
// @name        ParrotUpdater
// @namespace   ParrotUpdater
// @description Grabs latest versions of the scripts automatically.
// @include     https://www.reddit.com/robin*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @author      ptrakk, apostolique
// ==/UserScript==
var ParrotUpdaterVersion = 1.0;

function getLatestCommit() {
	window.jQuery.ajax({
		url: "https://api.github.com/repos/5a1t/parrot/git/refs/heads/master",
		cache: false,
		dataType: "jsonp"
	}).done(function(data) {
		console.dir(data["data"])
		console.log("hmm: " + data["data"]["object"]["sha"]);
		sha = data["data"]["object"]["sha"];;
		window.jQuery.get('https://raw.githubusercontent.com/5a1t/parrot/master/robin.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
			var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
			latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));
			latestVersion = parseFloat(latestVersion + 0.0000);
			var script1 = "https://cdn.rawgit.com/5a1t/parrot/master/robin.user.js";
			console.log("Script: " + script1);
			window.jQuery("body").append('<script type="text/javascript" src="' + script1 + '"></script>');
		});


		function update(prefix, name, url) {
			window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
			window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
			window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
			window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
			window.jQuery('#' + prefix + 'Link').on('click', function() {
				window.jQuery("#" + prefix + "Dialog").hide();
				window.jQuery("#" + prefix + "Dialog").remove();
			});
			window.jQuery("#" + prefix + "Dialog").show();
		}


		window.jQuery.get('https://raw.githubusercontent.com/ptrakk/Robin-Parrot-Updater/master/parrot-updater.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
			var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
			latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));
			latestVersion = parseFloat(latestVersion + 0.0000);
			var myVersion = parseFloat(ParrotUpdaterVersion + 0.0000);
			if (latestVersion > myVersion) {
				update("ParrotUpdater", "parrot-updater.js", "https://github.com/ptrakk/Robin-Parrot-Updater/master/parrot-updater.js");
			}
			console.log('Current parrot-updater.js Version: ' + myVersion + " on Github: " + latestVersion);
		});
		*/


	}).fail(function() {});
}
setInterval(function () {
getLatestCommit();
}, 60000);
